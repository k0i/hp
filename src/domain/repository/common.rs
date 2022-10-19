use crate::domain::model::common::ID;
use anyhow::Result;
use async_trait::async_trait;
use sqlx::{MySql, Transaction};
use tracing::Span;

#[async_trait]
pub trait BaseRepository<T> {
    async fn get(&self, id: &ID, span: Span) -> Result<T>;
    async fn list(&self, span: Span) -> Result<Vec<T>>;
    async fn create(&self, entity: T, span: Span) -> Result<T>;
    async fn update(&self, entity: T, span: Span) -> Result<T>;
    async fn delete(&self, entity: T, span: Span) -> Result<()>;
    async fn enter_transaction(&self, span: Span) -> Result<Transaction<MySql>>;
}
