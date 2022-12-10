use anyhow::Result;

use crate::domain::{
    model::wakatime::{WakatimeActivitiesRange, WakatimeData},
    repository::wakatime_repository::WakatimeRepository,
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

impl<T> WakatimeUsecase<T>
where
    T: WakatimeRepository,
{
    pub async fn get(&self) -> Result<WakatimeData> {
        let (wakatime_daily_avg, wakatime_language, wakatime_activities) = tokio::join!(
            self.repository.get_wakatime_daily_average(),
            self.repository.get_wakatime_language(),
            self.repository
                .get_wakatime_activities(WakatimeActivitiesRange::Last7Days)
        );
        let wakatime_daily_avg = wakatime_daily_avg?;
        let wakatime_language = wakatime_language?;
        let wakatime_activities = wakatime_activities?;
        Ok(WakatimeData::new(
            wakatime_language,
            wakatime_daily_avg,
            wakatime_activities,
        ))
    }
}
