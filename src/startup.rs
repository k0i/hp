use crate::infra::repository::Repositories;
use crate::routes::articles;
use crate::routes::health_check::health_check;
use crate::usecase::Usecases;
use actix_web::dev::Server;
use actix_web::{web, App, HttpServer};
use sqlx::MySqlPool;
use std::net::TcpListener;
use tracing_actix_web::TracingLogger;

pub type SharedUsecases = web::Data<Usecases>;

pub fn run(listener: TcpListener, connection_pool: MySqlPool) -> Result<Server, std::io::Error> {
    let repositories = Repositories::new(connection_pool);
    let usecases = Usecases::new(repositories);
    let usecases: SharedUsecases = web::Data::new(usecases);
    let server = HttpServer::new(move || {
        App::new()
            .wrap(TracingLogger::default())
            .service(health_check)
            .service(articles::list)
            .service(articles::create)
            .app_data(usecases.clone())
    })
    .listen(listener)?
    .run();
    Ok(server)
}
