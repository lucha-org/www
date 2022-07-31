import fs from "fs";
import { gitFetcher } from "lib/fetcher";
import Prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import type { File } from "types/octokit";
import YAML from "yaml";

// Demo: prisma/data.js
const BLACKLIST = [
  "hashnode",
  "medium",
  "ghost",
  "firebase",
  "supabase",
  "appwrite",
  "googleanalytics",
  "matomo",
  "splitbee",
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  const session = await unstable_getServerSession(req, res, authOptions);
  const file = YAML.parse(fs.readFileSync("./data/Root.yaml", "utf-8"));
  const { slug } = query as { slug: string };

  switch (method) {
    case "GET":
      let feat = {};
      let wrestler;

      try {
        wrestler = await Prisma.wrestler.findUniqueOrThrow({
          where: { slug },
        });
      } catch (error) {
        res.status(404).json({ code: 404, detail: "Wrestler Not Found" });
        return;
      }

      if (BLACKLIST.includes(slug)) {
        feat = file[wrestler?.category as string][slug];
      } else {
        const { content } = await gitFetcher<File>(
          `/repos/${slug}/Luchador/contents/FEATURES.yaml`,
          session?.accessToken as string
        );

        try {
          const decoded = atob(content);
          feat = YAML.parse(decoded);
        } catch (error) {
          //
        }
      }

      res.status(200).json({ ...wrestler, features: feat });
      break;

    case "PUT":
      if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
      }

      const { features, ...data } = JSON.parse(body);

      const REPO = {
        name: "Luchador",
        description: "My Luchador Config",
        homepage: `https://lucha.vercel.app/${data.alias}`,
        has_wiki: false,
        has_projects: false,
        auto_init: true,
      };

      try {
        await Prisma.wrestler.update({ where: { id: data.id }, data });
      } catch (error) {
        await Prisma.wrestler.create({ data });

        // Create repo
        await gitFetcher(
          `/orgs/${data.slug}/repos`,
          session.accessToken as string,
          { method: "POST", body: JSON.stringify(REPO) }
        );

        // Create features
        const encoded = btoa(YAML.stringify(features));
        await gitFetcher(
          `/repos/${data.slug}/Luchador/contents/FEATURES.yaml`,
          session.accessToken as string,
          {
            method: "PUT",
            body: JSON.stringify({
              message: "Update FEATURES.yaml",
              content: encoded,
            }),
          }
        );
      }

      res.status(200).json({ message: "Okay" });
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
