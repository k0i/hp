import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { HealthCheckInfo } from "../../types/healthchecks";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_HEALTH_CKECKS_URL!, {
      headers: {
        "X-api-key": process.env.NEXT_PUBLIC_HEALTH_CHECKS_READ_ONLY_API_KEY!,
      },
    });

    const json = (await response.json()) as HealthCheckInfo;
    fs.writeFile(`healthChecks.json`, JSON.stringify(json), (err) => {
      if (err) {
        console.log("Error writing healthChecks response", err);
      } else {
        console.log("Successfully generate healthChecks response json");
      }
    });
    return res.status(200).end();
  } catch (error) {
    throw error;
  }
}
