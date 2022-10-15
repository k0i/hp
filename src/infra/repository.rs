use sqlx::MySqlPool;

use self::{
    article_repository_impl::ArticleRepositoryImpl, atcoder_repository_impl::AtcoderRepositoryImpl,
    wakatime_repository_impl::WakatimeRepositoryImpl,
};
pub mod article_repository_impl;
pub mod atcoder_repository_impl;
pub mod wakatime_repository_impl;

pub struct Repositories {
    pub article_repository: ArticleRepositoryImpl,
    pub wakatime_repository: WakatimeRepositoryImpl,
    pub atcoder_repository: AtcoderRepositoryImpl,
}
impl Repositories {
    pub fn new(
        connection: MySqlPool,
        wakatime_client: reqwest::Client,
        atcoder_client: reqwest::Client,
    ) -> Self {
        Self {
            article_repository: ArticleRepositoryImpl::new(connection.clone()),
            wakatime_repository: WakatimeRepositoryImpl::new(wakatime_client),
            atcoder_repository: AtcoderRepositoryImpl::new(atcoder_client, connection),
        }
    }
}
