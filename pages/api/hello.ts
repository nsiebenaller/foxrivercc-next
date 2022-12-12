// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client, Pool } from "pg";

type Data = {
  name: string;
  baseDomain: string;
  rows: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const rows = await new Promise((resolve) => {
    pool.query("SELECT NOW()", (_err, res) => {
      resolve(res.rows);
      pool.end();
    });
  });

  console.log(rows);

  const baseDomain = String(process.env.BASE_DOMAIN);
  res.status(200).json({ name: "John Doe", baseDomain, rows });
}
