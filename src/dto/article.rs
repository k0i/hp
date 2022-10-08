use serde::{Deserialize, Serialize};

use crate::domain::model::common::ID;

#[derive(Deserialize, Serialize, Debug)]
pub struct ArticleDTO {
    pub id: ID,
    pub title: String,
    pub content: String,
}
