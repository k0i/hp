use async_trait::async_trait;
use tracing::Span;

use super::common::BaseRepository;
use crate::domain::model::article::Article;
use anyhow::Result;

#[async_trait]
pub trait ArticleRepository: BaseRepository<Article> {
    async fn attach_tags(&self, article: Article, span: Span) -> Result<Article>;
}
