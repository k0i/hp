use crate::helpers::{seed_articles, spawn_app};
use chrono::Utc;
use pf::domain::model::common::ID;
use rand::Rng;
use reqwest::header::CONTENT_TYPE;

#[tokio::test]
async fn list() {
    let test_app = spawn_app().await;
    let mut rand = rand::thread_rng();
    let article_count = rand.gen_range(1..10) as usize;

    for i in 0..article_count {
        seed_articles(
            test_app.connection_pool.clone(),
            &format!("title{}", i),
            &format!("content{}", i),
        )
        .await;
    }
    let client = reqwest::Client::new();
    let response = client
        .get(&format!("{}/articles", &test_app.address))
        .send()
        .await
        .expect("Failed to execute request.");
    assert_eq!(200, response.status().as_u16());
    assert_eq!(
        article_count,
        response
            .json::<Vec<serde_json::Value>>()
            .await
            .unwrap()
            .len()
    );
}
#[tokio::test]
async fn get() {
    let test_app = spawn_app().await;
    let id = ID::new();
    let id_str = id.to_string();
    sqlx::query!(
        "INSERT INTO articles (id, title, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        id as ID,
        "title",
        "content",
        Utc::now(),
        Utc::now()
    )
    .execute(&test_app.connection_pool)
    .await
    .expect("seed failed");

    let client = reqwest::Client::new();
    let response = client
        .get(&format!("{}/article/{}", &test_app.address, id_str))
        .send()
        .await
        .expect("Failed to execute request.");
    assert_eq!(200, response.status().as_u16());
    assert_eq!(
        id_str,
        response
            .json::<serde_json::Value>()
            .await
            .unwrap()
            .get("id")
            .unwrap()
            .as_str()
            .unwrap()
    );
}

#[tokio::test]
async fn create() {
    let test_app = spawn_app().await;
    let new_article = serde_json::json!({
        "title": "title",
        "content": "content",
    });
    let client = reqwest::Client::new();
    let response = client
        .post(&format!("{}/articles", &test_app.address))
        .header(CONTENT_TYPE, "application/json")
        .body(new_article.to_string())
        .send()
        .await
        .expect("Failed to execute request.");
    assert_eq!(200, response.status().as_u16());
    assert_eq!(
        "title",
        response
            .json::<serde_json::Value>()
            .await
            .unwrap()
            .get("title")
            .unwrap()
            .as_str()
            .unwrap()
    );
}

#[tokio::test]
async fn update() {
    let test_app = spawn_app().await;
    let new_article = serde_json::json!({
        "title": "title",
        "content": "content",
    });
    let client = reqwest::Client::new();
    let response = client
        .post(&format!("{}/articles", &test_app.address))
        .header(CONTENT_TYPE, "application/json")
        .body(new_article.to_string())
        .send()
        .await
        .expect("Failed to execute request.");
    assert_eq!(200, response.status().as_u16());
    let temp_id = response.json::<serde_json::Value>().await.unwrap();
    let id = temp_id.get("id").unwrap();
    let new_title = "new title";
    let new_content = "new content";
    let update_article = serde_json::json!({
        "id":id,
        "title": new_title,
        "content": new_content,
    });
    let response = client
        .patch(&format!("{}/articles", &test_app.address))
        .header(CONTENT_TYPE, "application/json")
        .body(update_article.to_string())
        .send()
        .await
        .expect("Failed to execute request.");
    assert_eq!(200, response.status().as_u16());
    let res_json = response.json::<serde_json::Value>().await.unwrap();
    assert_eq!(new_title, res_json.get("title").unwrap().as_str().unwrap());
    assert_eq!(
        new_content,
        res_json.get("content").unwrap().as_str().unwrap()
    );
}

#[tokio::test]
async fn delete() {
    let test_app = spawn_app().await;
    let new_article = serde_json::json!({
        "title": "title",
        "content": "content",
    });
    let client = reqwest::Client::new();
    let response = client
        .post(&format!("{}/articles", &test_app.address))
        .header(CONTENT_TYPE, "application/json")
        .body(new_article.to_string())
        .send()
        .await
        .expect("Failed to execute request.");
    assert_eq!(200, response.status().as_u16());
    let temp_id = response.json::<serde_json::Value>().await.unwrap();
    let id = temp_id.get("id").unwrap();
    let delete_article = serde_json::json!({
        "id":id,
    });
    let response = client
        .delete(&format!("{}/articles", &test_app.address))
        .header(CONTENT_TYPE, "application/json")
        .body(delete_article.to_string())
        .send()
        .await
        .expect("Failed to execute request.");
    assert_eq!(200, response.status().as_u16());
}
