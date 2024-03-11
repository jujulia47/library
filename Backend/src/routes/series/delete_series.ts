import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function DeleteSerie(server: FastifyInstance) {
  //------------DELETE-------------
  server.delete("/serie/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const { id } = idParam.parse(request.params);

    const deleteSerie = await prisma.serie.delete({
      where: {
        id,
      },
      include: {
        books: {
          select: {
            title: true,
          },
        },
      },
    });
    return deleteSerie;
  });
}
