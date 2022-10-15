use anyhow::Result;
use async_trait::async_trait;
use tracing::Span;

use crate::domain::model::atcoder::{AtcoderContestHistory, AtcoderSolveCount};

#[async_trait]
pub trait AtcoderRepository {
    async fn list_contest_histories(&self) -> Result<Vec<AtcoderContestHistory>>;
    async fn list_problem_solve_histories(&self, span: Span) -> Result<Vec<AtcoderSolveCount>>;
    async fn get_latest_problem_solve_history(&self, span: Span) -> Result<AtcoderSolveCount>;
    async fn create_problem_solve_history(
        &self,
        entity: AtcoderSolveCount,
        span: Span,
    ) -> Result<AtcoderSolveCount>;
    async fn update_problem_solve_history(
        &self,
        entity: AtcoderSolveCount,
        span: Span,
    ) -> Result<AtcoderSolveCount>;
}
