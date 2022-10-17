use crate::infra::datamodel;

use super::common::ID;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Article {
    id: ID,
    title: String,
    content: String,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
}
impl Article {
    pub fn new(title: impl Into<String>, content: impl Into<String>) -> Self {
        Self {
            id: ID::new(),
            title: title.into(),
            content: content.into(),
            created_at: Utc::now(),
            updated_at: Utc::now(),
        }
    }
    pub fn id(&self) -> &ID {
        &self.id
    }
    pub fn title(&self) -> &str {
        &self.title
    }
    pub fn content(&self) -> &str {
        &self.content
    }
    pub fn created_at(&self) -> &DateTime<Utc> {
        &self.created_at
    }
    pub fn updated_at(&self) -> &DateTime<Utc> {
        &self.updated_at
    }
    pub fn set_title(&mut self, title: String) {
        self.title = title;
        self.updated_at = Utc::now();
    }
    pub fn set_content(&mut self, content: String) {
        self.content = content;
        self.updated_at = Utc::now();
    }
}

impl From<datamodel::article::Article> for Article {
    fn from(datamodel: datamodel::article::Article) -> Self {
        Self {
            id: ID::from(datamodel.id),
            title: datamodel.title,
            content: datamodel.content,
            created_at: datamodel.created_at,
            updated_at: datamodel.updated_at,
        }
    }
}
