import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "atcoder"
    );
    const json = await response.json();
    fs.writeFile(`atcoder.json`, JSON.stringify(json), (err) => {
      if (err) {
        console.log("Error writing atcoder response", err);
      } else {
        console.log("Successfully generate atcoder response json");
      }
    });
    return res.status(200).end();
  } catch (error) {
    throw error;
  }
}
