use serde::{Deserialize, Serialize};
use ulid::Ulid;

#[derive(sqlx::Type, Serialize, Deserialize, Debug)]
#[sqlx(transparent)]
pub struct ID(String);

impl ID {
    pub fn new() -> Self {
        let id = Ulid::new().to_string();
        Self(id)
    }
}
impl Default for ID {
    fn default() -> Self {
        Self::new()
    }
}
