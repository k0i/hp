use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use crate::domain;

#[derive(sqlx::FromRow, Serialize, Deserialize)]
pub struct Article {
    pub id: String,
    pub title: String,
    pub content: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl From<domain::model::article::Article> for Article {
    fn from(model: domain::model::article::Article) -> Self {
        Self {
            id: model.id().to_string(),
            title: model.title().to_owned(),
            content: model.content().to_owned(),
            created_at: *model.created_at(),
            updated_at: *model.updated_at(),
        }
    }
}
