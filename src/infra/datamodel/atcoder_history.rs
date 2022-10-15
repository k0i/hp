use chrono::{DateTime, Utc};

use crate::domain;

#[derive(sqlx::FromRow)]
pub struct AtcoderSolveCountHistory {
    pub id: i32,
    pub ac_count: i32,
    pub ac_rank: i32,
    pub created_at: DateTime<Utc>,
}
impl AtcoderSolveCountHistory {
    pub fn new(id: i32, ac_count: i32, ac_rank: i32, created_at: DateTime<Utc>) -> Self {
        Self {
            id,
            ac_count,
            ac_rank,
            created_at,
        }
    }
}
impl From<domain::model::atcoder::AtcoderSolveCount> for AtcoderSolveCountHistory {
    fn from(solve_count: domain::model::atcoder::AtcoderSolveCount) -> Self {
        Self {
            id: solve_count.id(),
            ac_count: solve_count.ac_count(),
            ac_rank: solve_count.ac_rank(),
            created_at: solve_count.created_at(),
        }
    }
}
