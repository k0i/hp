use anyhow::Result;
use tracing::Span;

use crate::{
    domain::{model::atcoder::AtcoderData, repository::atcoder_repository::AtcoderRepository},
    infra::repository::atcoder_repository_impl::AtcoderRepositoryImpl,
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

impl AtcoderUsecase<AtcoderRepositoryImpl> {
    pub async fn get(&self, span: Span) -> Result<AtcoderData> {
        let contest_histories = self.repository.list_contest_histories().await?;
        let solve_histories = self.repository.list_problem_solve_histories(span).await?;

        let contest_participation_count = contest_histories.len() as u16;
        let latest_contest = contest_histories
            .into_iter()
            .last()
            .expect("Failed to reference latest atcoder contest.");
        let atcoder_data = AtcoderData::new(
            latest_contest,
            solve_histories.latest.ac_count(),
            contest_participation_count,
            solve_histories.latest,
            solve_histories.previous,
        );
        Ok(atcoder_data)
    }
}
