use anyhow::Result;
use async_trait::async_trait;
use tracing::Span;

use crate::domain::model::atcoder::{AtcoderContestHistory, AtcoderSolveCount, AtcoderSolveCounts};

#[async_trait]
pub trait AtcoderRepository {
    async fn list_contest_histories(&self) -> Result<Vec<AtcoderContestHistory>>;
    async fn list_problem_solve_histories(&self, span: Span) -> Result<AtcoderSolveCounts>;
    async fn get_latest_problem_solve_history(&self, span: Span) -> Result<AtcoderSolveCount>;
}
