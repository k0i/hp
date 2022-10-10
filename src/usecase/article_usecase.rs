use crate::{
    domain::{
        model::article::Article,
        repository::{article_repository::ArticleRepository, common::BaseRepository},
    },
    dto::article::{CreateArticleDTO, DeleteArticleDTO, UpdateArticleDTO},
    infra::repository::article_repository_impl::ArticleRepositoryImpl,
};
use anyhow::Result;
use tracing::Span;

pub struct ArticleUsecase<T>
where
    T: ArticleRepository + BaseRepository<Article>,
{
    repository: T,
}

impl<T> ArticleUsecase<T>
where
    T: ArticleRepository,
{
    pub fn new(repository: T) -> Self {
        Self { repository }
    }
}

impl ArticleUsecase<ArticleRepositoryImpl> {
    pub async fn get(&self, id: crate::domain::model::common::ID, span: Span) -> Result<Article> {
        self.repository.get(&id, span).await
    }
    pub async fn list(&self, span: Span) -> Result<Vec<Article>> {
        self.repository.list(span).await
    }
    pub async fn create(&self, dto: CreateArticleDTO, span: Span) -> Result<Article> {
        let article = Article::new(dto.title, dto.content);
        self.repository.create(article, span).await
    }
    pub async fn update(&self, dto: UpdateArticleDTO, span: Span) -> Result<Article> {
        let get_span = Span::current();
        let mut article = self.repository.get(&dto.id, get_span).await?;
        article.set_title(dto.title);
        article.set_content(dto.content);
        self.repository.update(article, span).await
    }
    pub async fn delete(&self, dto: DeleteArticleDTO, span: Span) -> Result<()> {
        let get_span = Span::current();
        let article = self.repository.get(&dto.id, get_span).await?;
        self.repository.delete(article, span).await
    }
}
