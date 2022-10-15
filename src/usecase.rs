use self::{
    article_usecase::ArticleUsecase, atcoder_usecase::AtcoderUsecase,
    wakatime_usecase::WakatimeUsecase,
};
use crate::infra::repository::{
    article_repository_impl::ArticleRepositoryImpl, atcoder_repository_impl::AtcoderRepositoryImpl,
    wakatime_repository_impl::WakatimeRepositoryImpl, Repositories,
};

pub mod article_usecase;
pub mod atcoder_usecase;
pub mod wakatime_usecase;
pub struct Usecases {
    pub article_usecase: ArticleUsecase<ArticleRepositoryImpl>,
    pub wakatime_usecase: WakatimeUsecase<WakatimeRepositoryImpl>,
    pub atcoder_usecase: AtcoderUsecase<AtcoderRepositoryImpl>,
}
impl Usecases {
    pub fn new(repositories: Repositories) -> Self {
        Self {
            article_usecase: ArticleUsecase::new(repositories.article_repository),
            wakatime_usecase: WakatimeUsecase::new(repositories.wakatime_repository),
            atcoder_usecase: AtcoderUsecase::new(repositories.atcoder_repository),
        }
    }
}
