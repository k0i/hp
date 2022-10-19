import { ArticleTag } from "./tag";

export interface Article {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  tags: ArticleTag[];
}
