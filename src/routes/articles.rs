use actix_web::{get, post, web, HttpRequest, HttpResponse, Responder};
use ulid::Ulid;

use crate::{dto::article::ArticleDTO, startup::SharedUsecases};

#[get("/articles")]
#[tracing::instrument(name = "list article", skip(usecases))]
pub async fn list(_: HttpRequest, usecases: SharedUsecases) -> impl Responder {
    let req_id = Ulid::new().to_string();
    let req_span = tracing::info_span!("start list articles", req_id = %req_id);
    let _req_span_guard = req_span.enter();

    let query_span = tracing::info_span!("fetching articles from the database");
    usecases
        .article_usecase
        .list(query_span)
        .await
        .map(|articles| HttpResponse::Ok().json(articles))
        .unwrap_or_else(|e| {
            tracing::error!("failed to fetch articles: {}", e);
            HttpResponse::InternalServerError().finish()
        })
}

#[post("/articles")]
#[tracing::instrument(
    name = "create article",
    skip(req, usecases),
    fields(
        title = %req.title,
    )
)]
pub async fn create(req: web::Json<ArticleDTO>, usecases: SharedUsecases) -> impl Responder {
    let req_id = Ulid::new().to_string();
    let req_span = tracing::info_span!("start create article", req_id = %req_id);
    let _req_span_guard = req_span.enter();
    let query_span = tracing::info_span!("creating article");
    usecases
        .article_usecase
        .create(req.into_inner(), query_span)
        .await
        .map(|article| HttpResponse::Ok().json(article))
        .unwrap_or_else(|e| {
            tracing::error!("failed to create article: {}", e);
            HttpResponse::InternalServerError().finish()
        })
}
