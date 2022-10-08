use crate::domain::model::common::ID;
use anyhow::Result;
use async_trait::async_trait;

#[async_trait]
pub trait BaseRepository<T> {
    async fn get(&self, id: ID) -> Result<T>;
    async fn list(&self) -> Result<Vec<T>>;
    async fn create(&self, entity: T) -> Result<T>;
    async fn update(&self, entity: T) -> Result<T>;
    async fn delete(&self, entity: T) -> Result<()>;
}
