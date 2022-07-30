import type { NextApiRequest, NextApiResponse } from "next";
import { CustomTweet } from "types/app";

const ACTION = "https://publish.twitter.com/oembed";
const TWITTER = "https://twitter.com";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { items } = query as { items: string };

  switch (method) {
    case "GET":
      let tweets = [];

      for (const item of items.split(",")) {
        const [user, status] = item.split(":");
        const embed = `${ACTION}?url=${TWITTER}/${user}/status/${status}`;

        try {
          const tweet = await (await fetch(embed)).json();
          tweets.push(tweet);
        } catch (error) {
          //
        }
      }

      res.status(200).json(tweets);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
