use crate::{
    domain::{
        model::article::Article,
        repository::{article_repository::ArticleRepository, common::BaseRepository},
    },
    infra::datamodel,
};
use anyhow::{Context, Result};
use async_trait::async_trait;
use sqlx::MySqlPool;
use tracing::{Instrument, Span};

pub struct ArticleRepositoryImpl {
    connection: MySqlPool,
}
impl ArticleRepositoryImpl {
    pub fn new(connection: MySqlPool) -> Self {
        Self { connection }
    }
}

#[async_trait]
impl BaseRepository<Article> for ArticleRepositoryImpl {
    async fn get(&self, id: &crate::domain::model::common::ID, span: Span) -> Result<Article> {
        let data = sqlx::query_as!(
            datamodel::article::Article,
            "select id as `id:_`,title,content,created_at,updated_at from articles where id = ?",
            id
        )
        .fetch_one(&self.connection)
        .instrument(span)
        .await
        .with_context(|| "failed to get article in database session")?;
        Ok(data.into())
    }
    async fn list(&self, span: Span) -> Result<Vec<Article>> {
        let data = sqlx::query_as!(
            datamodel::article::Article,
            "select id as `id:_`,title,content,created_at,updated_at from articles"
        )
        .fetch_all(&self.connection)
        .instrument(span)
        .await
        .with_context(|| "failed to list articles in database session")?;
        Ok(data.into_iter().map(|d| d.into()).collect())
    }
    async fn create(&self, entity: Article, span: Span) -> Result<Article> {
        sqlx::query!(
        "INSERT INTO articles (id, title, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        entity.id(),
        entity.title(),
        entity.content(),
        entity.created_at(),
        entity.updated_at()
    )
        .execute(&self.connection)
        .instrument(span)
        .await
        .with_context(|| "failed to create article in database session")?;
        let get_span = Span::current();
        self.get(entity.id(), get_span).await
    }
    async fn update(&self, entity: Article, span: Span) -> Result<Article> {
        sqlx::query!(
            "UPDATE articles SET title = ?, content = ?, updated_at = ? WHERE id = ?",
            entity.title(),
            entity.content(),
            entity.updated_at(),
            entity.id()
        )
        .execute(&self.connection)
        .instrument(span)
        .await
        .with_context(|| "failed to update article in database session")?;
        let get_span = Span::current();
        self.get(entity.id(), get_span).await
    }
    async fn delete(&self, entity: Article, span: Span) -> Result<()> {
        sqlx::query!("DELETE FROM articles WHERE id = ?", entity.id())
            .execute(&self.connection)
            .instrument(span)
            .await
            .with_context(|| "failed to delete article in database session")?;
        Ok(())
    }
}

impl ArticleRepository for ArticleRepositoryImpl {}
