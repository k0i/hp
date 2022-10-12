import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Article } from "../types/article";
import { WakatimeInfo } from "../types/wakatime";
import { AtcoderInfo } from "../types/atcoder";

export const getPath = (folder: string) => {
  return path.join(process.cwd(), `/${folder}`);
};

export const getFileContent = (filename: string, folder: string) => {
  const POSTS_PATH = getPath(folder);
  return fs.readFileSync(path.join(POSTS_PATH, filename), "utf8");
};

export const getAllArticles = (folder: string) => {
  const POSTS_PATH = getPath(folder);

  return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\\.json?$/.test(path))
    .map((fileName) => {
      const source = getFileContent(fileName, folder);
      const slug = fileName.replace(/\\.md?$/, "");
      const { data } = matter(source);
      return {
        frontmatter: data,
        slug: slug,
      };
    });
};

export const getLastArticle = (folder: string): Article => {
  const ARTICLE_PATH = getPath(folder);
  const articles = fs.readdirSync(ARTICLE_PATH);
  return JSON.parse(
    getFileContent(articles[articles.length - 1], folder)
  ) as Article;
};

export const getLatestWakatimeInfo = (): WakatimeInfo =>
  JSON.parse(fs.readFileSync("wakatime.json", "utf8")) as WakatimeInfo;

export const getLatestAtcoderInfo = (): AtcoderInfo =>
  JSON.parse(fs.readFileSync("atcoder.json", "utf8")) as AtcoderInfo;
