use rand::Rng;

use crate::helpers::{seed_articles, spawn_app};

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
