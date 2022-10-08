use std::net::TcpListener;

use chrono::Utc;
use once_cell::sync::Lazy;
use pf::telemetry::{get_subscriber, init_subscriber};
use pf::{
    configuration::{get_configuration, DatabaseSettings},
    domain::model::common::ID,
};
use sqlx::{Connection, Executor, MySqlConnection, MySqlPool};

static TRACING: Lazy<()> = Lazy::new(|| {
    let default_filter_level = "info".to_string();
    let subscriber_name = "test".to_string();
    if std::env::var("TEST_LOG").is_ok() {
        let subscriber = get_subscriber(subscriber_name, default_filter_level, std::io::stdout);
        init_subscriber(subscriber);
    } else {
        let subscriber = get_subscriber(subscriber_name, default_filter_level, std::io::sink);
        init_subscriber(subscriber);
    };
});

pub struct TestApp {
    pub address: String,
    pub connection_pool: MySqlPool,
}
pub async fn spawn_app() -> TestApp {
    Lazy::force(&TRACING);
    let mut config = get_configuration().expect("Failed to read configuration.");
    let rand_db = ulid::Ulid::new().to_string();
    config.database.database_name = rand_db;
    let connection_pool = configure_database(&config.database).await;
    let listener = TcpListener::bind("127.0.0.1:0").expect("Failed to bind random port");
    let port = listener.local_addr().unwrap().port();
    let server =
        pf::startup::run(listener, connection_pool.clone()).expect("Failed to bind address");
    let _ = tokio::spawn(server);
    let address = format!("http://127.0.0.1:{}", port);
    TestApp {
        address,
        connection_pool,
    }
}

pub async fn configure_database(config: &DatabaseSettings) -> MySqlPool {
    let mut connection = MySqlConnection::connect(&config.connect_string_without_db())
        .await
        .expect("Failed to connect to database.");
    connection
        .execute(format!(r#"CREATE DATABASE `{}`;"#, config.database_name).as_str())
        .await
        .expect("Failed to create database.");

    let connection_pool = MySqlPool::connect(&config.connect_string())
        .await
        .expect("Failed to connect to database.");
    sqlx::migrate!("./migrations")
        .run(&connection_pool)
        .await
        .expect("Failed to migrate the database");
    connection_pool
}

pub async fn seed_articles(connection_pool: MySqlPool, title: &str, content: &str) {
    let id = ID::new();
    sqlx::query!(
        "INSERT INTO articles (id, title, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        id as ID,
        title,
        content,
        Utc::now(),
        Utc::now()
    )
    .execute(&connection_pool)
    .await
    .unwrap();
}
