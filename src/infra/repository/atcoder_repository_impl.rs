use crate::{
    domain::{
        model::atcoder::{AtcoderContestHistory, AtcoderSolveCount},
        repository::atcoder_repository::AtcoderRepository,
    },
    dto::atcoder::AtcoderSolveCountDTO,
    infra::datamodel::{self, atcoder_history::AtcoderSolveCountHistory},
};
use anyhow::{bail, Context, Result};
use async_trait::async_trait;
use chrono::Utc;
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
            .with_context(|| "Failed to parse atcoder contest histories.")?;
        Ok(histories)
    }
    async fn list_problem_solve_histories(&self, span: Span) -> Result<Vec<AtcoderSolveCount>> {
        let history = self
            .client
            .get("https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=k_xor_yama")
            .send()
            .await
            .expect("Failed to get latest solve data from atcoder.")
            .json::<AtcoderSolveCountDTO>()
            .await
            .with_context(|| "Failed to parse atcoder solve data.")?;
        let get_span = Span::current();
        let mut last_one = match self.get_latest_problem_solve_history(get_span).await {
            Ok(h) => h,
            Err(e) => {
                let h = AtcoderSolveCount::new(1, history.count(), history.rank(), Utc::now());
                for cause in e.chain() {
                    if let Some(sqlx::Error::RowNotFound) = cause.downcast_ref() {
                        continue;
                    }
                    bail!(e)
                }
                h
            }
        };
        if Utc::now().timestamp() - last_one.created_at().timestamp() >= 60 * 60 * 24 - 120
            || last_one.id() == 0
        {
            tracing::info!("Inserting new solve history. last one: {:?}", last_one);
            let data = AtcoderSolveCount::new(
                last_one.id() + 1,
                history.count(),
                history.rank(),
                Utc::now(),
            );
            self.create_problem_solve_history(data, span).await?;
        } else {
            tracing::warn!(
                "The last data is too new. This operation is supposed to be called once in a day"
            );
            last_one.set_ac_rank(history.rank());
            last_one.set_ac_count(history.count());
            self.update_problem_solve_history(last_one, span).await?;
        }
        let list_span = Span::current();
        let data = sqlx::query_as!(
            datamodel::atcoder_history::AtcoderSolveCountHistory,
            "select id, ac_count, ac_rank, created_at from atcoder_histories ORDER BY id ASC"
        )
        .fetch_all(&self.connection)
        .instrument(list_span)
        .await
        .with_context(|| "failed to list atcoder solve histories in database session")?;
        Ok(data.into_iter().map(|d| d.into()).collect())
    }

    async fn create_problem_solve_history(
        &self,
        entity: AtcoderSolveCount,
        span: Span,
    ) -> Result<AtcoderSolveCount> {
        let mut data: AtcoderSolveCountHistory = entity.into();
        let res = sqlx::query!(
            "INSERT INTO atcoder_histories (ac_count,ac_rank) VALUES (?, ?)",
            data.ac_count,
            data.ac_rank
        )
        .execute(&self.connection)
        .instrument(span)
        .await
        .with_context(|| "failed to create atcoder_histories in database session")?;
        data.id = res.last_insert_id() as i32;
        Ok(data.into())
    }
    async fn update_problem_solve_history(
        &self,
        entity: AtcoderSolveCount,
        span: Span,
    ) -> Result<AtcoderSolveCount> {
        let data: AtcoderSolveCountHistory = entity.into();
        sqlx::query!(
            "Update atcoder_histories set ac_count = ?, ac_rank = ? WHERE id = ?",
            data.ac_count,
            data.ac_rank,
            data.id
        )
        .execute(&self.connection)
        .instrument(span)
        .await
        .with_context(|| "failed to update atcoder_histories in database session")?;
        Ok(data.into())
    }

    async fn get_latest_problem_solve_history(&self, span: Span) -> Result<AtcoderSolveCount> {
        match sqlx::query_as!(
            AtcoderSolveCountHistory,
            "select id, ac_rank, ac_count, created_at from atcoder_histories order by id DESC limit 1",
        )
        .fetch_one(&self.connection)
        .instrument(span)
        .await {
Ok(history) => {
                return Ok(history.into());
            }
            Err(sqlx::Error::RowNotFound) => {
                tracing::warn!("There seems to be no solve data in database.");
                Ok(AtcoderSolveCount::new(0, 0,0,Utc::now()))
            }
            Err(e) => {
                bail!("failed to get latest solve data in database session: {:?}",e)
            }
        }
    }
}
