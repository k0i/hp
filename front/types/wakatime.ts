interface WakatimeDailyAverage {
  daily_avg: {
    data: {
      current_user: {
        daily_average: { seconds: number; text: string };
        total: { seconds: number; text: string };
      };
    };
  };
}
interface WakatimeLanguageInfo {
  language: {
    data: { languages: Array<{ name: string; total_seconds: number }> };
  };
}
interface WakatimeActivitiesInfo {
  activities: {
    data: {
      days: Array<{
        categories: Array<{ name: string; total: number }>;
        date: string;
        total: number;
      }>;
    };
  };
}

export interface WakatimeInfo
  extends WakatimeDailyAverage,
    WakatimeLanguageInfo,
    WakatimeActivitiesInfo {}
