use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
pub struct ArticleDTO {
    pub title: String,
    pub content: String,
}
