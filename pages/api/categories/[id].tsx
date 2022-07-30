import type { NextApiRequest, NextApiResponse } from "next";
import data from "data/Categories.json";

type Categories = keyof typeof data;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      const features = data[id as Categories];

      if (features) {
        res.status(200).json(features);
      } else {
        res.status(404).json({ detail: "Not Found" });
      }

      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
