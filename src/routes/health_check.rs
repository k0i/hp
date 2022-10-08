use actix_web::{get, HttpRequest, HttpResponse, Responder};

#[get("/health_check")]
pub async fn health_check(_: HttpRequest) -> impl Responder {
    HttpResponse::Ok().finish()
}
