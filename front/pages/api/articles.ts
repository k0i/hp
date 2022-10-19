import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Article } from "../../types/article";
import { getPath } from "../../utils/fs";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "articles"
    );
    const json = (await response.json()) as Array<Article>;
    const mdFilePath = getPath("content");
    console.log(json);
    json.forEach((a) =>
      fs.writeFile(`${mdFilePath}/${a.id}.json`, JSON.stringify(a), (err) => {
        if (err) {
          console.log("Error writing articles into file", err);
        } else {
          console.log("Successfully wrote articles into file");
        }
      })
    );
    return res.status(200).end();
  } catch (error) {
    throw error;
  }
}
