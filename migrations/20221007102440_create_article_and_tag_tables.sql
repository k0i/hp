CREATE TABLE articles (
  id VARCHAR(26) NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  INDEX articles_title_idx (title)
);

CREATE TABLE tags (
  id VARCHAR(26) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  INDEX tags_name_idx (name)
);

CREATE TABLE article_tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  article_id VARCHAR(26) NOT NULL,
  tag_id     VARCHAR(26) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  CONSTRAINT fk_article_id FOREIGN KEY (article_id) REFERENCES articles(id),
  CONSTRAINT fk_tag_id FOREIGN KEY (tag_id) REFERENCES tags(id),
  CONSTRAINT unique_article_tag UNIQUE (article_id, tag_id)
);
