import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostColection(server: FastifyInstance) {
  //------------------ POST------------------
  server.post("/colection", async (request) => {
    const colectionBody = z.object({
        colection: z.string(),
    });

    const { colection } = colectionBody.parse(request.body);

    const existingColection = await prisma.colectionArray.findFirst({
      where: {
        colection: colection
      },
    });

    if (existingColection) {
      return {
        error: "Flag já cadastrada",
      };
    } else {
      const newFlag = await prisma.colectionArray.create({
        data: {
          colection: colection,
          created_at: new Date(),
        },
      });
      return newFlag;
    }
  });
}
