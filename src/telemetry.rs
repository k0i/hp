use opentelemetry::global;
use tracing::{subscriber::set_global_default, Subscriber};
use tracing_appender::non_blocking::WorkerGuard;
use tracing_bunyan_formatter::{BunyanFormattingLayer, JsonStorageLayer};
use tracing_log::LogTracer;
use tracing_subscriber::{
    fmt::MakeWriter, prelude::__tracing_subscriber_SubscriberExt, EnvFilter, Registry,
};

pub fn get_subscriber<Sink>(
    name: impl Into<String>,
    env_filter: impl Into<String>,
    _sink: Sink,
) -> (impl Subscriber + Sync + Send, WorkerGuard)
where
    Sink: for<'a> MakeWriter<'a> + Send + Sync + 'static,
{
    let name = name.into();
    global::set_text_map_propagator(opentelemetry_jaeger::Propagator::new());
    let tracer = opentelemetry_jaeger::new_agent_pipeline()
        .with_service_name(name.clone())
        .install_simple()
        .unwrap();
    let opentelemetry = tracing_opentelemetry::layer().with_tracer(tracer);
    let env_filter =
        EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new(env_filter.into()));
    let file_appender = tracing_appender::rolling::never("./", "web.log");
    let (non_blocking, guard) = tracing_appender::non_blocking(file_appender);
    let formatting_layer = BunyanFormattingLayer::new(name, non_blocking);

    (
        Registry::default()
            .with(env_filter)
            .with(JsonStorageLayer)
            .with(formatting_layer)
            .with(opentelemetry),
        guard,
    )
}

pub fn init_subscriber(subscriber: impl Subscriber + Send + Sync) {
    LogTracer::init().expect("Failed to set logger");
    set_global_default(subscriber).expect("Failed to set subscriber");
}
