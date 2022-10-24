use actix_web::{web, HttpResponse};
use ulid::Ulid;

#[allow(dead_code)]
pub async fn undefined(req: web::Bytes) -> HttpResponse {
    let req_id = Ulid::new().to_string();
    let body = String::from_utf8(req.to_vec()).unwrap();
    let req_span = tracing::warn_span!("maybe malicious request", body=%body, req_id=%req_id);
    let _req_span_guard = req_span.enter();
    HttpResponse::InternalServerError().finish()
}
