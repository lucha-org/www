import type { NextApiRequest, NextApiResponse } from "next";
import Prisma from "lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      const result = await Prisma.wrestler.findMany({ where: { ...query } });
      res.status(200).json(result);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
