use self::article_usecase::ArticleUsecase;
use crate::infra::repository::{article_repository_impl::ArticleRepositoryImpl, Repositories};

pub mod article_usecase;
pub struct Usecases {
    pub article_usecase: ArticleUsecase<ArticleRepositoryImpl>,
}
impl Usecases {
    pub fn new(repositories: Repositories) -> Self {
        Self {
            article_usecase: ArticleUsecase::new(repositories.article_repository),
        }
    }
}
