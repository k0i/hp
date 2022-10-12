use crate::{
    domain::{
        model::atcoder::{AtcoderContestHistory, AtcoderSolveCount, AtcoderSolveCounts},
        repository::atcoder_repository::AtcoderRepository,
    },
    dto::atcoder::AtcoderSolveCountDTO,
};
use anyhow::{Context, Result};
use async_trait::async_trait;
use reqwest::Client;
use sqlx::MySqlPool;
use tracing::{Instrument, Span};

pub struct AtcoderRepositoryImpl {
    client: Client,
    connection: MySqlPool,
}
impl AtcoderRepositoryImpl {
    pub fn new(client: Client, connection: MySqlPool) -> Self {
        Self { client, connection }
    }
}

#[async_trait]
impl AtcoderRepository for AtcoderRepositoryImpl {
    async fn list_contest_histories(&self) -> Result<Vec<AtcoderContestHistory>> {
        let histories = self
            .client
            .get("https://atcoder.jp/users/k_xor_yama/history/json")
            .send()
            .await
            .expect("Failed to list contest histories from atcoder.")
            .json::<Vec<AtcoderContestHistory>>()
            .await
            .with_context(|| "Failed to parse atcoder contest histories.");
        if let Err(e) = histories {
            return Err(e);
        }
        Ok(histories.unwrap())
    }
    async fn list_problem_solve_histories(&self, span: Span) -> Result<AtcoderSolveCounts> {
        let history = self
            .client
            .get("https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=k_xor_yama")
            .send()
            .await
            .expect("Failed to get latest solve data from atcoder.")
            .json::<AtcoderSolveCountDTO>()
            .await
            .with_context(|| "Failed to parse atcoder solve data.");
        if let Err(e) = history {
            return Err(e);
        }
        let history = history.unwrap();
        let get_span = Span::current();
        let last_one = self.get_latest_problem_solve_history(get_span).await;
        let entity = AtcoderSolveCount::new(history.count(), history.rank());
        sqlx::query!(
            "INSERT INTO atcoder_histories (ac_count,ac_rank) VALUES (?, ?)",
            entity.ac_count(),
            entity.ac_rank()
        )
        .execute(&self.connection)
        .instrument(span)
        .await
        .with_context(|| "failed to create atcoder_histories in database session")?;
        match last_one {
            Ok(last_one) => {
                let solve_counts = AtcoderSolveCounts::new(entity, last_one);
                return Ok(solve_counts);
            }
            Err(e) => {
                tracing::warn!("There seems to be no solve data in database. {}", e);
                let solve_counts = AtcoderSolveCounts::new(
                    entity,
                    AtcoderSolveCount::new(history.count(), history.rank()),
                );
                return Ok(solve_counts);
            }
        }
    }
    async fn get_latest_problem_solve_history(&self, span: Span) -> Result<AtcoderSolveCount> {
        sqlx::query_as!(
            AtcoderSolveCount,
            "select ac_rank, ac_count from atcoder_histories order by id DESC limit 1",
        )
        .fetch_one(&self.connection)
        .instrument(span)
        .await
        .with_context(|| "failed to get latest problem solve history in database session")
    }
}
