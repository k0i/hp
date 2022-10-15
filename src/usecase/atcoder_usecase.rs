use anyhow::Result;
use tracing::Span;

use crate::domain::{
    model::atcoder::AtcoderData, repository::atcoder_repository::AtcoderRepository,
};

pub struct AtcoderUsecase<T>
where
    T: AtcoderRepository,
{
    repository: T,
}

impl<T> AtcoderUsecase<T>
where
    T: AtcoderRepository,
{
    pub fn new(repository: T) -> Self {
        Self { repository }
    }
}

impl<T> AtcoderUsecase<T>
where
    T: AtcoderRepository,
{
    pub async fn get(&self, span: Span) -> Result<AtcoderData> {
        let contest_histories = self.repository.list_contest_histories().await?;
        let solve_histories = self.repository.list_problem_solve_histories(span).await?;
        Ok(AtcoderData::new(solve_histories, contest_histories))
    }
}
