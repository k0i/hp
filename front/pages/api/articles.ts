import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Article } from "../../types/article";
import { getPath } from "../../utils/fs";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "articles"
    );
    const json = (await response.json()) as Array<Article>;
    const mdFilePath = getPath("content");
    json.forEach((a) =>
      fs.writeFile(
        `${mdFilePath}/${a.created_at}.json`,
        JSON.stringify(a),
        (err) => {
          if (err) {
            console.log("Error writing file", err);
          } else {
            console.log("Successfully wrote file");
          }
        }
      )
    );
    return await res.status(200);
  } catch (error) {
    throw error;
  }
}
