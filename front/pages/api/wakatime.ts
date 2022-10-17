import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "wakatime"
    );
    const json = await response.json();
    fs.writeFile(`wakatime.json`, JSON.stringify(json), (err) => {
      if (err) {
        console.log("Error writing wakatime response", err);
      } else {
        console.log("Successfully generate wakatime response json");
      }
    });
    return res.status(200).end();
  } catch (error) {
    throw error;
  }
}
