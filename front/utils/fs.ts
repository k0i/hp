import fs from "fs";
import path from "path";
import { Article } from "../types/article";
import { WakatimeInfo } from "../types/wakatime";
import { AtcoderInfo } from "../types/atcoder";
import { HealthCheckInfo } from "../types/healthchecks";

export const getPath = (folder: string) => {
  return path.join(process.cwd(), `/${folder}`);
};

export const getFileContent = (filename: string, folder: string) => {
  const ARTICLES_PATH = getPath(folder);
  return fs.readFileSync(path.join(ARTICLES_PATH, filename), "utf8");
};

export const getAllArticles = (folder: string) => {
  const ARTICLES_PATH = getPath(folder);

  return fs.readdirSync(ARTICLES_PATH).map((fileName) => {
    return JSON.parse(getFileContent(fileName, folder)) as Article;
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

export const getLatestHealthChecksInfo = (): HealthCheckInfo =>
  JSON.parse(fs.readFileSync("healthChecks.json", "utf8")) as HealthCheckInfo;
