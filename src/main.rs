mod routes;
use std::net::TcpListener;

use env_logger::Env;
use pf::configuration::get_configuration;
use pf::startup::run;
use pf::*;
use sqlx::MySqlPool;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();
    let configuration = get_configuration().expect("Failed to read configuration.");
    let connection_pool = MySqlPool::connect(&configuration.database.connect_string())
        .await
        .expect("Failed to connect to Database.");
    let addr = format!("127.0.0.1:{}", configuration.application_port);
    let listener = TcpListener::bind(addr).expect("Failed to bind random port");
    run(listener, connection_pool)?.await
}
