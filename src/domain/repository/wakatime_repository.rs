use anyhow::Result;
use async_trait::async_trait;

use crate::domain::model::wakatime::{WakatimeActivities, WakatimeDailyAvg, WakatimeLanguage};

#[async_trait]
pub trait WakatimeRepository {
    async fn get_wakatime_language(&self) -> Result<WakatimeLanguage>;
    async fn get_wakatime_daily_average(&self) -> Result<WakatimeDailyAvg>;
    async fn get_wakatime_activities(&self) -> Result<WakatimeActivities>;
}
