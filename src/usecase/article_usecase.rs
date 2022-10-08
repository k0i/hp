use tracing::Span;

use crate::domain::{model::article::Article, repository::article_repository::ArticleRepository};
use anyhow::Result;

pub struct ArticleUsecase {
    repository: Box<dyn ArticleRepository>,
    span: Span,
}

impl ArticleUsecase {
    pub fn new(repository: Box<dyn ArticleRepository>, span: Span) -> Self {
        Self { repository, span }
    }
}

impl ArticleUsecase {
    async fn get(&self, id: crate::domain::model::common::ID) -> Result<Article> {
        self.repository.get(id).await
    }
    async fn list(&self) -> Result<Vec<Article>> {
        self.repository.list().await
    }
    async fn create(&self, entity: Article) -> Result<Article> {
        self.repository.create(entity).await
    }
    async fn update(&self, entity: Article) -> Result<Article> {
        self.repository.update(entity).await
    }
}
