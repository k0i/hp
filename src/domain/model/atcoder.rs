#![allow(non_snake_case)]
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct AtcoderContestHistory {
    IsRated: bool,
    Place: u32,
    OldRating: u16,
    NewRating: u16,
    Performance: u16,
    ContestName: String,
    EndTime: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AtcoderSolveCount {
    pub ac_count: i32,
    pub ac_rank: i32,
}
impl AtcoderSolveCount {
    pub fn ac_count(&self) -> i32 {
        self.ac_count
    }
    pub fn ac_rank(&self) -> i32 {
        self.ac_rank
    }
    pub fn set_ac_count(&mut self, ac_count: i32) {
        self.ac_count = ac_count;
    }
    pub fn set_ac_rank(&mut self, ac_rank: i32) {
        self.ac_rank = ac_rank;
    }
    pub fn new(ac_count: i32, ac_rank: i32) -> Self {
        Self { ac_count, ac_rank }
    }
}
#[derive(Debug, Serialize, Deserialize)]
pub struct AtcoderSolveCounts {
    pub latest: AtcoderSolveCount,
    pub previous: AtcoderSolveCount,
}
impl AtcoderSolveCounts {
    pub fn new(latest: AtcoderSolveCount, previous: AtcoderSolveCount) -> Self {
        Self { latest, previous }
    }
}

#[derive(Serialize, Debug)]
pub struct AtcoderData {
    latestContest: AtcoderContestHistory,
    acCount: i32,
    contestParticipationCount: u16,
    solveCount: AtcoderSolveCount,
    previousCount: AtcoderSolveCount,
}

impl AtcoderData {
    pub fn new(
        latest_contest: AtcoderContestHistory,
        ac_count: i32,
        contest_participation_count: u16,
        solve_count: AtcoderSolveCount,
        previous_count: AtcoderSolveCount,
    ) -> Self {
        Self {
            latestContest: latest_contest,
            acCount: ac_count,
            contestParticipationCount: contest_participation_count,
            solveCount: solve_count,
            previousCount: previous_count,
        }
    }
}
