import { Item, PrismaClient } from ".prisma/client";
import { SellType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ontology } from "../../../assets/metadata";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const path = req.query.path as string;
    const splitPath = path ? path.split(",") : [""];
    try {
      let items;
      if (path) {
        items = await prisma.item.findMany({
          where: {
            // identifier: id,
            parent: { title: splitPath.at(-1) },
          },
        });
      } else {
        items = await prisma.item.findMany({});
      }
      res.status(200).json(items);
    } catch (err) {
      console.log(err);
    }
  }
}
