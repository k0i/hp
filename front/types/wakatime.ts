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

export interface WakatimeInfo
  extends WakatimeDailyAverage,
    WakatimeLanguageInfo {}
