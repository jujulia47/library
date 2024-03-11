import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchSerie(server: FastifyInstance) {
  server.patch("/serie/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const patchSerie = z.object({
      serieName: z.string(),
      concluded: z.boolean(),
      abandoned: z.boolean(),
    });

    const { id } = idParam.parse(request.params);

    const { serieName, concluded, abandoned } = patchSerie.parse(request.body);

    const updateSerie = await prisma.serie.update({
      where: {
        id: id,
      },
      data: {
        serieName,
        concluded,
        abandoned,
      },
      include: {
        books: {
          select: {
            title: true,
          },
        },
      },
    });
    return updateSerie;
  });
}
