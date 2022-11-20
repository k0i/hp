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
        let (contest_histories, solve_histories) = tokio::join!(
            self.repository.list_contest_histories(),
            self.repository.list_problem_solve_histories(span)
        );
        let contest_histories = contest_histories?
            .into_iter()
            .filter(|h| h.is_rated())
            .collect();
        let solve_histories = solve_histories?;
        Ok(AtcoderData::new(solve_histories, contest_histories))
    }
}
