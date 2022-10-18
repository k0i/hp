use crate::infra::{self, datamodel};

use super::common::ID;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Article {
    id: ID,
    title: String,
    content: String,
    tags: Tags,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
}
impl Article {
    pub fn new(title: impl Into<String>, content: impl Into<String>) -> Self {
        Self {
            id: ID::new(),
            title: title.into(),
            content: content.into(),
            tags: Vec::new(),
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
    pub fn tags(&self) -> &Tags {
        &self.tags
    }
    pub fn created_at(&self) -> &DateTime<Utc> {
        &self.created_at
    }
    pub fn updated_at(&self) -> &DateTime<Utc> {
        &self.updated_at
    }
    pub fn set_title(&mut self, title: String) {
        self.title = title;
    }
    pub fn set_content(&mut self, content: String) {
        self.content = content;
    }
    pub fn set_tags(&mut self, tags: Tags) {
        self.tags = tags;
    }
}

impl From<datamodel::article::Article> for Article {
    fn from(article: datamodel::article::Article) -> Self {
        Self {
            id: ID::from(article.id),
            title: article.title,
            content: article.content,
            tags: vec![],
            created_at: article.created_at,
            updated_at: article.updated_at,
        }
    }
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Tag {
    id: ID,
    name: String,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
}

impl From<infra::datamodel::tag::Tag> for Tag {
    fn from(tag: infra::datamodel::tag::Tag) -> Self {
        Self {
            id: ID::from(tag.id),
            name: tag.name,
            created_at: tag.created_at,
            updated_at: tag.updated_at,
        }
    }
}

impl Tag {
    pub fn new(name: impl Into<String>) -> Self {
        Self {
            id: ID::new(),
            name: name.into(),
            created_at: Utc::now(),
            updated_at: Utc::now(),
        }
    }
    pub fn retrieve(id: ID, name: impl Into<String>) -> Self {
        Self {
            id,
            name: name.into(),
            created_at: Utc::now(),
            updated_at: Utc::now(),
        }
    }
    pub fn id(&self) -> &ID {
        &self.id
    }
    pub fn name(&self) -> &str {
        &self.name
    }
    pub fn created_at(&self) -> &DateTime<Utc> {
        &self.created_at
    }
    pub fn updated_at(&self) -> &DateTime<Utc> {
        &self.updated_at
    }
    pub fn set_name(&mut self, name: String) {
        self.name = name;
        self.updated_at = Utc::now();
    }
}
pub type Tags = Vec<Tag>;
