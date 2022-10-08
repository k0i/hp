use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use ulid::Ulid;

#[derive(sqlx::Type, Serialize, Deserialize)]
#[sqlx(transparent)]
pub struct ID(String);

impl ID {
    pub fn new() -> Self {
        let id = Ulid::new().to_string();
        Self(id)
    }
}

pub trait Domain {
    fn new() -> (ID, DateTime<Utc>, DateTime<Utc>) {
        (ID::new(), Utc::now(), Utc::now())
    }
}
