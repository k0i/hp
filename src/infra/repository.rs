use sqlx::MySqlPool;

use self::article_repository_impl::ArticleRepositoryImpl;
pub mod article_repository_impl;

pub struct Repositories {
    pub article_repository: ArticleRepositoryImpl,
}
impl Repositories {
    pub fn new(connection: MySqlPool) -> Self {
        Self {
            article_repository: ArticleRepositoryImpl::new(connection),
        }
    }
}
