export interface AtcoderContestResult {
  IsRated: boolean;
  Place: number;
  OldRating: number;
  NewRating: number;
  Performance: number;
  ContestName: String;
  EndTime: String;
  ContestScreenName: string;
}
interface AtcoderContestInfo {
  contestHistories: AtcoderContestResult[];
}
export interface AtcoderAcResult {
  ac_count: number;
  ac_rank: number;
  created_at: string;
}
interface AtcoderHistory {
  acCountHistories: AtcoderAcResult[];
}

export interface AtcoderInfo extends AtcoderContestInfo, AtcoderHistory {}
