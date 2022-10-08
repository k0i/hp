use actix_web::{get, post, web, HttpRequest, HttpResponse, Responder};
use sqlx::MySqlPool;
use tracing::Instrument;
use ulid::Ulid;

use crate::{
    domain::model::{
        article::Article,
        common::{Domain, ID},
    },
    dto::article::ArticleDTO,
};

#[get("/articles")]
pub async fn list(_: HttpRequest, connection_pool: web::Data<MySqlPool>) -> impl Responder {
    let req_id = Ulid::new().to_string();
    let req_span = tracing::info_span!("start list articles", req_id = %req_id);
    let _req_span_guard = req_span.enter();

    let query_span = tracing::info_span!("fetching articles from the database");
    let res = sqlx::query_as!(
        Article,
        "select id as `id:_`,title,content,created_at,updated_at from articles"
    )
    .fetch_all(connection_pool.get_ref())
    .instrument(query_span)
    .await;
    res.map(|articles| HttpResponse::Ok().json(articles))
        .unwrap_or_else(|_| {
            tracing::error!("list articles error");
            HttpResponse::InternalServerError().finish()
        })
}

#[post("/articles")]
pub async fn create(
    req: web::Json<ArticleDTO>,
    connection_pool: web::Data<MySqlPool>,
) -> impl Responder {
    let (id, created_at, updated_at) = Article::new();
    tracing::info!("create article: {:?}", req);
    let res = sqlx::query!(
        "INSERT INTO articles (id, title, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        id as ID,
        req.title,
        req.content,
        created_at,
        updated_at
    )
    .execute(connection_pool.get_ref())
    .await;
    res.map(|_| HttpResponse::Ok().finish())
        .unwrap_or_else(|e| {
            tracing::error!("create article failed: {:?}", e);
            HttpResponse::InternalServerError().finish()
        })
}
