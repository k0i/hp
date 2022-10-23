mod routes;
use std::net::TcpListener;

use pf::configuration::get_configuration;
use pf::startup::run;
use pf::telemetry::{get_subscriber, init_subscriber};
use pf::*;
use sqlx::MySqlPool;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let (subscriber, _guard) = get_subscriber("web", "info", std::io::stdout);
    init_subscriber(subscriber);
    let configuration = get_configuration().expect("Failed to read configuration.");
    let connection_pool = MySqlPool::connect(&configuration.database.connect_string())
        .await
        .expect("Failed to connect to Database.");
    let addr = format!("127.0.0.1:{}", configuration.application_port);
    let listener = TcpListener::bind(addr).expect("Failed to bind random port");
    match run(listener, connection_pool, configuration.wakatime_api_key) {
        Ok(server) => server.await,
        Err(e) => panic!("Error occured: {}", e),
    }
}
