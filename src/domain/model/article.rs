use super::common::{Domain, ID};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(sqlx::FromRow, Serialize, Deserialize)]
pub struct Article {
    pub id: ID,
    pub title: String,
    pub content: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl Domain for Article {}
