import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchFlag(server: FastifyInstance) {
  server.patch("/flag/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    // objeto zod para o body
    const patchFlag = z.object({
      flag: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const { flag } = patchFlag.parse(request.body);

    const updateFlag = await prisma.flagsArray.update({
      where: {
        id: id,
      },
      data: {
        flag,
      },
      include: {
        books: {
          select: {
            title: true,
          },
        },
      },
    });
    return updateFlag;
  });
}
