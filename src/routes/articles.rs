use actix_web::{delete, get, patch, post, web, HttpRequest, HttpResponse, Responder};
use ulid::Ulid;

use crate::{
    dto::article::{CreateArticleDTO, DeleteArticleDTO, UpdateArticleDTO},
    startup::SharedUsecases,
};

#[get("/articles")]
#[tracing::instrument(name = "list articles", skip(usecases))]
pub async fn list(_: HttpRequest, usecases: SharedUsecases) -> impl Responder {
    let req_id = Ulid::new().to_string();
    let req_span = tracing::info_span!("start list articles", req_id = %req_id);
    let _req_span_guard = req_span.enter();

    let query_span = tracing::info_span!("start list articles database session");
    usecases
        .article_usecase
        .list(query_span)
        .await
        .map(|articles| HttpResponse::Ok().json(articles))
        .unwrap_or_else(|e| {
            tracing::error!("failed to list articles: {}", e);
            HttpResponse::InternalServerError().finish()
        })
}

#[get("/article/{id}")]
#[tracing::instrument(
    name = "get article",
    skip(usecases),
    fields(
        article_id = %id.0,
    )
)]
pub async fn get(id: web::Path<(String,)>, usecases: SharedUsecases) -> impl Responder {
    let req_id = Ulid::new().to_string();
    let req_span = tracing::info_span!("start get article", req_id = %req_id);
    let _req_span_guard = req_span.enter();
    let query_span = tracing::info_span!("start get article database session");
    let id = id.into_inner().0.into();
    usecases
        .article_usecase
        .get(id, query_span)
        .await
        .map(|article| HttpResponse::Ok().json(article))
        .unwrap_or_else(|e| {
            tracing::error!("failed to get article: {}", e);
            HttpResponse::InternalServerError().finish()
        })
}

#[post("/articles")]
#[tracing::instrument(
    name = "create article",
    skip(req, usecases),
    fields(
        article_title = %req.title,
    )
)]
pub async fn create(req: web::Json<CreateArticleDTO>, usecases: SharedUsecases) -> impl Responder {
    let req_id = Ulid::new().to_string();
    let req_span = tracing::info_span!("start create article", req_id = %req_id);
    let _req_span_guard = req_span.enter();
    let query_span = tracing::info_span!("start create article database session");
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

#[patch("/articles")]
#[tracing::instrument(
    name = "update article",
    skip(req, usecases),
    fields(
        article_title = %req.title,
        article_id = %req.id,
    )
)]
pub async fn update(req: web::Json<UpdateArticleDTO>, usecases: SharedUsecases) -> impl Responder {
    let req_id = Ulid::new().to_string();
    let req_span = tracing::info_span!("start update article", req_id = %req_id);
    let _req_span_guard = req_span.enter();
    let query_span = tracing::info_span!("start update article database session");
    usecases
        .article_usecase
        .update(req.into_inner(), query_span)
        .await
        .map(|article| HttpResponse::Ok().json(article))
        .unwrap_or_else(|e| {
            tracing::error!("failed to update article: {}", e);
            HttpResponse::InternalServerError().finish()
        })
}

#[delete("/articles")]
#[tracing::instrument(
    name = "delete article",
    skip(req, usecases),
    fields(
        article_id = %req.id,
    )
)]
pub async fn delete(req: web::Json<DeleteArticleDTO>, usecases: SharedUsecases) -> impl Responder {
    let req_id = Ulid::new().to_string();
    let req_span = tracing::info_span!("start delete article", req_id = %req_id);
    let _req_span_guard = req_span.enter();
    let query_span = tracing::info_span!("start delete article database session");
    usecases
        .article_usecase
        .delete(req.into_inner(), query_span)
        .await
        .map(|article| HttpResponse::Ok().json(article))
        .unwrap_or_else(|e| {
            tracing::error!("failed to delete article: {}", e);
            HttpResponse::InternalServerError().finish()
        })
}
