use crate::configuration::new_reqwest_client;
use crate::infra::repository::Repositories;
use crate::routes::health_check::health_check;
use crate::routes::{articles, atcoder, wakatime};
use crate::usecase::Usecases;
use actix_web::dev::Server;
use actix_web::{web, App, HttpServer};
use anyhow::Context;
use anyhow::Result;
use sqlx::MySqlPool;
use std::net::TcpListener;
use tracing_actix_web::TracingLogger;

pub type SharedUsecases = web::Data<Usecases>;

pub fn run(
    listener: TcpListener,
    connection_pool: MySqlPool,
    wakatime_api_key: String,
) -> Result<Server> {
    let client = new_reqwest_client(wakatime_api_key).context("Failed to create reqwest client")?;
    let repositories = Repositories::new(connection_pool, client, reqwest::Client::new());
    let usecases = Usecases::new(repositories);
    let usecases: SharedUsecases = web::Data::new(usecases);
    let server = HttpServer::new(move || {
        let cors = actix_cors::Cors::permissive();
        App::new()
            .wrap(TracingLogger::default())
            .wrap(cors)
            .service(health_check)
            .service(articles::list)
            .service(articles::create)
            .service(articles::get)
            .service(articles::update)
            .service(articles::delete)
            .service(wakatime::wakatime)
            .service(atcoder::atcoder)
            .app_data(usecases.clone())
    })
    .listen(listener)?
    .run();
    Ok(server)
}
