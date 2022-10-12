CREATE TABLE atcoder_histories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ac_count INT NOT NULL,
  ac_rank INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
