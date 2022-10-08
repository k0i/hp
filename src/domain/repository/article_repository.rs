use super::common::BaseRepository;
use crate::domain::model::article::Article;

pub trait ArticleRepository: BaseRepository<Article> {}
