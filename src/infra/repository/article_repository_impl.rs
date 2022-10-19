use std::collections::{HashMap, HashSet};

use crate::{
    domain::{
        model::{
            article::{Article, Tag},
            common::ID,
        },
        repository::{article_repository::ArticleRepository, common::BaseRepository},
    },
    infra::datamodel::{self, article_tag::ArticleTag},
};
use anyhow::{Context, Result};
use async_trait::async_trait;
use sqlx::{MySql, MySqlPool, QueryBuilder};
use tracing::{Instrument, Span};

pub struct ArticleRepositoryImpl {
    connection: MySqlPool,
}
impl ArticleRepositoryImpl {
    pub fn new(connection: MySqlPool) -> Self {
        Self { connection }
    }
}

#[async_trait]
impl BaseRepository<Article> for ArticleRepositoryImpl {
    async fn get(&self, id: &crate::domain::model::common::ID, span: Span) -> Result<Article> {
        let article_data = sqlx::query_as!(
            datamodel::article::Article,
            "SELECT id as `id:_`, title, content, created_at, updated_at FROM articles WHERE id = ?",
            id
        )
        .fetch_one(&self.connection)
        .instrument(span)
        .await
        .with_context(|| "failed to get article in database session")?;
        let tags_span = Span::current();
        let tags_data = sqlx::query_as!(
            datamodel::tag::Tag,
            "SELECT t.id, t.name, t.created_at, t.updated_at FROM tags t INNER JOIN article_tags at ON t.id = at.tag_id  WHERE at.article_id = ?",
            id
        )
        .fetch_all(&self.connection)
        .instrument(tags_span)
        .await
        .with_context(|| "failed to list attached tags in database session")?;

        let mut article: Article = article_data.into();
        let tags = tags_data
            .into_iter()
            .map(|t| t.into())
            .collect::<Vec<Tag>>();
        article.set_tags(tags);
        Ok(article)
    }
    async fn list(&self, span: Span) -> Result<Vec<Article>> {
        let rows = sqlx::query!(
            r#"
            SELECT a.*, t.id as tagid, t.name, at.article_id, at.tag_id FROM articles a 
	        INNER JOIN article_tags at ON a.id = at.article_id
	        INNER JOIN tags t  ON t.id = at.tag_id;
            "#
        )
        .fetch_all(&self.connection)
        .instrument(span)
        .await
        .with_context(|| "failed to list articles in database session")?;
        let mut article_tag_mapping = HashMap::new();
        let mut articles = vec![];
        let mut articles_set = HashSet::new();
        for r in rows {
            if !articles_set.contains(&r.id) {
                articles.push(datamodel::article::Article {
                    id: r.id.clone(),
                    title: r.title,
                    content: r.content,
                    created_at: r.created_at,
                    updated_at: r.updated_at,
                });
                articles_set.insert(r.id);
            }

            let v = article_tag_mapping.entry(r.article_id).or_insert(vec![]);
            v.push(datamodel::tag::Tag {
                id: r.tagid,
                name: r.name,
                created_at: r.created_at,
                updated_at: r.updated_at,
            });
        }
        let articles = articles
            .into_iter()
            .map(|a| {
                let mapped_tags = article_tag_mapping.remove(&a.id);
                if let Some(mapped_tags) = mapped_tags {
                    let mut article: Article = a.into();
                    article.set_tags(mapped_tags.into_iter().map(|t| t.into()).collect());
                    article
                } else {
                    a.into()
                }
            })
            .collect::<Vec<Article>>();
        Ok(articles)
    }
    async fn create(&self, entity: Article, span: Span) -> Result<Article> {
        let article: datamodel::article::Article = entity.into();
        sqlx::query!(
        "INSERT INTO articles (id, title, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        article.id,
        article.title,
        article.content,
        article.created_at,
        article.updated_at
    )
        .execute(&self.connection)
        .instrument(span)
        .await
        .with_context(|| "failed to create article in database session")?;
        let get_span = Span::current();
        self.get(&ID::from(article.id), get_span).await
    }
    async fn update(&self, entity: Article, span: Span) -> Result<Article> {
        let article: datamodel::article::Article = entity.into();
        sqlx::query!(
            "UPDATE articles SET title = ?, content = ?, updated_at = ? WHERE id = ?",
            article.title,
            article.content,
            article.updated_at,
            article.id
        )
        .execute(&self.connection)
        .instrument(span)
        .await
        .with_context(|| "failed to update article in database session")?;
        let get_span = Span::current();
        self.get(&ID::from(article.id), get_span).await
    }
    async fn delete(&self, entity: Article, span: Span) -> Result<()> {
        sqlx::query!("DELETE FROM articles WHERE id = ?", entity.id())
            .execute(&self.connection)
            .instrument(span)
            .await
            .with_context(|| "failed to delete article in database session")?;
        Ok(())
    }
    async fn enter_transaction(&self, span: Span) -> Result<sqlx::Transaction<'_, sqlx::MySql>> {
        let transaction = self
            .connection
            .begin()
            .instrument(span)
            .await
            .with_context(|| "failed to enter transaction in database session")?;
        Ok(transaction)
    }
}

#[async_trait]
impl ArticleRepository for ArticleRepositoryImpl {
    async fn attach_tags(&self, entity: Article, span: Span) -> Result<Article> {
        let attaching_tag_ids = entity
            .tags()
            .iter()
            .map(|t| vec![t.id()])
            .collect::<Vec<_>>();
        let article_tags = (0..attaching_tag_ids.len()).map(|i| ArticleTag {
            id: 0,
            article_id: entity.id().to_string(),
            tag_id: attaching_tag_ids[i][0].to_string(),
            created_at: chrono::Utc::now(),
            updated_at: chrono::Utc::now(),
        });
        let mut query_builder: QueryBuilder<MySql> = QueryBuilder::new(
            "INSERT INTO article_tags (article_id, tag_id, created_at, updated_at)",
        );
        query_builder.push_values(article_tags, |mut b, article_tag| {
            b.push_bind(article_tag.article_id);
            b.push_bind(article_tag.tag_id);
            b.push_bind(article_tag.created_at);
            b.push_bind(article_tag.updated_at);
        });
        query_builder
            .build()
            .execute(&self.connection)
            .instrument(span)
            .await?;
        Ok(entity)
    }
}
