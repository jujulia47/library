import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetFlag(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/flag", async () => {
    const getFlags = await prisma.flagsArray.findMany({
      include: {
        books: {
          select: {
            title: true,
          },
        },
      },
    });
    return getFlags;
  });

  //Ex: PDP
  server.get("/flag/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const getFlagsId = prisma.flagsArray.findFirst({
      where: {
        flag: id,
      },
      include: {
        books: {
          select: {
            title: true,
          },
        },
      },
    });
    return getFlagsId;
  });
}
