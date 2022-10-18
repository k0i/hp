use chrono::{DateTime, Utc};

pub struct ArticleTag {
    pub id: i32,
    pub article_id: String,
    pub tag_id: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
