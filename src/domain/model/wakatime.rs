use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug)]
pub struct WakatimeData {
    language: WakatimeLanguage,
    daily_avg: WakatimeDailyAvg,
    activities: WakatimeActivities,
}
impl WakatimeData {
    pub fn new(
        language: WakatimeLanguage,
        daily_avg: WakatimeDailyAvg,
        activities: WakatimeActivities,
    ) -> Self {
        Self {
            language,
            daily_avg,
            activities,
        }
    }
}

#[derive(Deserialize, Debug, Serialize)]
pub struct WakatimeLanguage {
    data: WakatimeLanguagesData,
}
#[derive(Deserialize, Debug, Serialize)]
struct WakatimeLanguagesData {
    languages: Vec<WakatimeLanguageData>,
}
#[derive(Deserialize, Debug, Serialize)]
struct WakatimeLanguageData {
    name: String,
    total_seconds: f64,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct WakatimeDailyAvg {
    data: WakatimeDailyAvgData,
}
#[derive(Deserialize, Debug, Serialize)]
struct WakatimeDailyAvgData {
    current_user: WakatimeCurrentUser,
}
#[derive(Deserialize, Debug, Serialize)]
struct WakatimeCurrentUser {
    daily_average: WakatimeInsightTimes,
    total: WakatimeInsightTimes,
}
#[derive(Deserialize, Debug, Serialize)]
struct WakatimeInsightTimes {
    seconds: f64,
    text: String,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct WakatimeActivities {
    data: WakatimeActivitiesData,
}
#[derive(Deserialize, Debug, Serialize)]
struct WakatimeActivitiesData {
    days: Vec<WakatimeActivityDataPerDay>,
}
#[derive(Deserialize, Debug, Serialize)]
struct WakatimeActivityDataPerDay {
    date: String,
    total: f64,
}
