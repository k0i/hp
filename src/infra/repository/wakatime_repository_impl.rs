use crate::domain::{
    model::wakatime::{
        WakatimeActivities, WakatimeActivitiesRange, WakatimeDailyAvg, WakatimeLanguage,
    },
    repository::wakatime_repository::WakatimeRepository,
};
use anyhow::{Context, Result};
use async_trait::async_trait;
use reqwest::Client;

pub struct WakatimeRepositoryImpl {
    client: Client,
}
impl WakatimeRepositoryImpl {
    pub fn new(client: Client) -> Self {
        Self { client }
    }
}

#[async_trait]
impl WakatimeRepository for WakatimeRepositoryImpl {
    async fn get_wakatime_language(&self) -> Result<WakatimeLanguage> {
        self.client
            .get("https://wakatime.com/api/v1/users/current/insights/languages")
            .send()
            .await
            .expect("Failed to get languages data from wakatime.")
            .json::<WakatimeLanguage>()
            .await
            .with_context(|| "Failed to parse languages response from wakatime.")
    }
    async fn get_wakatime_daily_average(&self) -> Result<WakatimeDailyAvg> {
        self.client
            .get("https://wakatime.com/api/v1/users/current/insights/daily_average/last_year")
            .send()
            .await
            .expect("Failed to get daily average data from wakatime.")
            .json::<WakatimeDailyAvg>()
            .await
            .with_context(|| "Failed to parse daily average response from wakatime.")
    }
    async fn get_wakatime_activities(
        &self,
        activity_range: WakatimeActivitiesRange,
    ) -> Result<WakatimeActivities> {
        let mut activities = self
            .client
            .get("https://wakatime.com/api/v1/users/current/insights/days/last_year")
            .send()
            .await
            .expect("Failed to get daily average data from wakatime.")
            .json::<WakatimeActivities>()
            .await
            .with_context(|| "Failed to parse daily average response from wakatime.")?;
        activities.data.filter_range(activity_range);
        Ok(activities)
    }
}
