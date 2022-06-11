import { User, PrismaClient } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userID = req.query.userId as string;
    try {
      const user: User | null = await prisma.user.findUnique({
        where: {
          identifier: userID,
        },
      });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  }
}
