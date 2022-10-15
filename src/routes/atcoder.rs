use actix_web::{get, HttpRequest, HttpResponse, Responder};
use ulid::Ulid;

use crate::startup::SharedUsecases;

#[get("/atcoder")]
#[tracing::instrument(name = "get atcoder info", skip(usecases))]
pub async fn atcoder(_: HttpRequest, usecases: SharedUsecases) -> impl Responder {
    let req_id = Ulid::new().to_string();
    let req_span = tracing::info_span!("start get atcoder info", req_id = %req_id);
    let _req_span_guard = req_span.enter();
    let query_span = tracing::info_span!("start list atcoder info database session");
    let res = usecases.atcoder_usecase.get(query_span).await;
    if res.is_err() {
        tracing::error!("Failed to get atcoder info");
        return HttpResponse::InternalServerError().finish();
    }
    let wakatime_data = res.unwrap();
    HttpResponse::Ok().json(wakatime_data)
}
