use serde::{Deserialize, Serialize};

use crate::domain::model::common::ID;

#[derive(Deserialize, Serialize, Debug)]
pub struct CreateArticleDTO {
    pub title: String,
    pub content: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct UpdateArticleDTO {
    pub id: ID,
    pub title: String,
    pub content: String,
}
#[derive(Deserialize, Serialize, Debug)]
pub struct DeleteArticleDTO {
    pub id: ID,
}
