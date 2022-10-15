use anyhow::{Context, Result};
use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct Settings {
    pub database: DatabaseSettings,
    pub application_port: u16,
    pub wakatime_api_key: String,
}

#[derive(Deserialize, Debug)]
pub struct DatabaseSettings {
    pub vendor: String,
    pub username: String,
    pub password: String,
    pub host: String,
    pub port: u16,
    pub database_name: String,
}

pub fn get_configuration() -> Result<Settings, config::ConfigError> {
    let settings = config::Config::builder()
        .add_source(config::File::new(
            "configuration.yaml",
            config::FileFormat::Yaml,
        ))
        .build()?;
    settings.try_deserialize()
}

impl DatabaseSettings {
    pub fn connect_string(&self) -> String {
        format!(
            "{}://{}:{}@{}:{}/{}",
            self.vendor, self.username, self.password, self.host, self.port, self.database_name
        )
    }
    pub fn connect_string_without_db(&self) -> String {
        format!(
            "{}://{}:{}@{}:{}/",
            self.vendor, self.username, self.password, self.host, self.port
        )
    }
}

pub fn new_reqwest_client(wakatime_api_key: impl Into<String>) -> Result<reqwest::Client> {
    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert(
        "Authorization",
        format!("Basic {}", wakatime_api_key.into())
            .parse()
            .expect("wakatime api key is invalid"),
    );
    reqwest::Client::builder()
        .default_headers(headers)
        .build()
        .with_context(|| "failed to build reqwest client")
}
