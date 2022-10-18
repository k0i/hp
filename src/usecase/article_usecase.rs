use crate::{
    domain::{
        model::article::{Article, Tag},
        repository::{article_repository::ArticleRepository, common::BaseRepository},
    },
    dto::article::{CreateArticleDTO, DeleteArticleDTO, UpdateArticleDTO},
};
use anyhow::{bail, Context, Result};
use sqlx::Acquire;
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

impl<T> ArticleUsecase<T>
where
    T: ArticleRepository + BaseRepository<Article>,
{
    pub async fn get(&self, id: crate::domain::model::common::ID, span: Span) -> Result<Article> {
        self.repository.get(&id, span).await
    }
    pub async fn list(&self, span: Span) -> Result<Vec<Article>> {
        self.repository.list(span).await
    }
    pub async fn create(&self, dto: CreateArticleDTO, span: Span) -> Result<Article> {
        let tags = dto
            .tags
            .into_iter()
            .map(|t| Tag::retrieve(t.id, t.name))
            .collect::<Vec<Tag>>();
        let article = Article::new(dto.title, dto.content);
        let transaction_span = Span::current();
        let mut transaction = self.repository.enter_transaction(transaction_span).await?;
        transaction.begin();
        let mut new_article = match self.repository.create(article, span).await {
            Err(e) => {
                transaction.rollback().await?;
                bail!(e)
            }
            Ok(article) => article,
        };
        if tags.is_empty() {
            transaction.commit().await?;
            return Ok(new_article);
        }
        new_article.set_tags(tags);
        let attach_span = Span::current();
        let tag_attached_article = match self.repository.attach_tags(new_article, attach_span).await
        {
            Err(e) => {
                transaction.rollback().await?;
                bail!(e)
            }
            Ok(article) => article,
        };
        transaction
            .commit()
            .await
            .with_context(|| "failed to commit transaction")?;
        Ok(tag_attached_article)
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
