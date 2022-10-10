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
impl From<String> for ID {
    fn from(id: String) -> Self {
        Self(id)
    }
}

impl std::fmt::Display for ID {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}
