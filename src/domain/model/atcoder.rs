use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use crate::infra::datamodel;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "PascalCase")]
pub struct AtcoderContestHistory {
    is_rated: bool,
    place: u32,
    old_rating: u16,
    new_rating: u16,
    performance: u16,
    contest_name: String,
    contest_screen_name: String,
    end_time: String,
}

impl AtcoderContestHistory {
    pub fn is_rated(&self) -> bool {
        self.is_rated
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AtcoderSolveCount {
    id: i32,
    ac_count: i32,
    ac_rank: i32,
    created_at: DateTime<Utc>,
}
impl AtcoderSolveCount {
    pub fn id(&self) -> i32 {
        self.id
    }
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
    pub fn created_at(&self) -> DateTime<Utc> {
        self.created_at
    }
    pub fn set_created_at(&mut self, created_at: DateTime<Utc>) {
        self.created_at = created_at;
    }
    pub fn new(id: i32, ac_count: i32, ac_rank: i32, created_at: DateTime<Utc>) -> Self {
        Self {
            id,
            ac_count,
            ac_rank,
            created_at,
        }
    }
}
impl From<datamodel::atcoder_history::AtcoderSolveCountHistory> for AtcoderSolveCount {
    fn from(datamodel: datamodel::atcoder_history::AtcoderSolveCountHistory) -> Self {
        Self {
            id: datamodel.id,
            ac_count: datamodel.ac_count,
            ac_rank: datamodel.ac_rank,
            created_at: datamodel.created_at,
        }
    }
}

#[derive(Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct AtcoderData {
    ac_count_histories: Vec<AtcoderSolveCount>,
    contest_histories: Vec<AtcoderContestHistory>,
}

impl AtcoderData {
    pub fn new(
        ac_count_histories: Vec<AtcoderSolveCount>,
        contest_histories: Vec<AtcoderContestHistory>,
    ) -> Self {
        Self {
            ac_count_histories,
            contest_histories,
        }
    }
}
