// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  baseDomain: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const baseDomain = String(process.env.BASE_DOMAIN);
  res.status(200).json({ name: "John Doe", baseDomain });
}
