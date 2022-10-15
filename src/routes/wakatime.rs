use actix_web::{get, HttpRequest, HttpResponse, Responder};
use ulid::Ulid;

use crate::startup::SharedUsecases;

#[get("/wakatime")]
#[tracing::instrument(name = "get wakatime info", skip(usecases))]
pub async fn wakatime(_: HttpRequest, usecases: SharedUsecases) -> impl Responder {
    let req_id = Ulid::new().to_string();
    let req_span = tracing::info_span!("start get wakatime info", req_id = %req_id);
    let _req_span_guard = req_span.enter();

    let res = usecases.wakatime_usecase.get().await;
    if res.is_err() {
        tracing::error!("Failed to get wakatime info");
        return HttpResponse::InternalServerError().finish();
    }
    let wakatime_data = res.unwrap();
    HttpResponse::Ok().json(wakatime_data)
}
