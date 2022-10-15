use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct AtcoderSolveCountDTO {
    pub count: i32,
    pub rank: i32,
}
impl AtcoderSolveCountDTO {
    pub fn count(&self) -> i32 {
        self.count
    }
    pub fn rank(&self) -> i32 {
        self.rank
    }
}
