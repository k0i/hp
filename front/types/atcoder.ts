interface AtcoderContestInfo {
  latestContest: {
    IsRated: boolean;
    Place: number;
    OldRating: number;
    NewRating: number;
    Performance: number;
    ContestName: String;
    EndTime: String;
  };
}
interface AtcoderHistory {
  acCount: number;
  contestParticipationCount: number;
  solveCount: { ac_count: number; ac_rank: number };
  previousCount: { ac_count: number; ac_rank: number };
}

export interface AtcoderInfo extends AtcoderContestInfo, AtcoderHistory {}
