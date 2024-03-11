import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostFlag(server: FastifyInstance) {
  //------------------ POST------------------

  server.post("/flag", async (request) => {
    const flagBody = z.object({
      flag: z.string(),
    });

    const { flag } = flagBody.parse(request.body);

    const findFlag = await prisma.flagsArray.findFirst({
      where: {
        flag: flag,
      },
    });

    if (findFlag) {
      return {
        error: "Flag já cadastrada",
      };
    } else {
      const newFlag = await prisma.flagsArray.create({
        data: {
          flag: flag,
          created_at: new Date(),
        },
      });
      return newFlag;
    }
  });
}
