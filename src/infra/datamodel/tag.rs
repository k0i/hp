use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use crate::domain;

#[derive(sqlx::FromRow, Serialize, Deserialize)]
pub struct Tag {
    pub id: String,
    pub name: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl From<domain::model::article::Tag> for Tag {
    fn from(model: domain::model::article::Tag) -> Self {
        Self {
            id: model.id().to_string(),
            name: model.name().into(),
            created_at: *model.created_at(),
            updated_at: *model.updated_at(),
        }
    }
}
