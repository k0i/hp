use anyhow::Result;

use crate::{
    domain::{model::wakatime::WakatimeData, repository::wakatime_repository::WakatimeRepository},
    infra::repository::wakatime_repository_impl::WakatimeRepositoryImpl,
};

pub struct WakatimeUsecase<T>
where
    T: WakatimeRepository,
{
    repository: T,
}

impl<T> WakatimeUsecase<T>
where
    T: WakatimeRepository,
{
    pub fn new(repository: T) -> Self {
        Self { repository }
    }
}

impl WakatimeUsecase<WakatimeRepositoryImpl> {
    pub async fn get(&self) -> Result<WakatimeData> {
        let wakatime_daily_avg = self.repository.get_wakatime_daily_average().await?;
        let wakatime_language = self.repository.get_wakatime_language().await?;
        Ok(WakatimeData::new(wakatime_language, wakatime_daily_avg))
    }
}
