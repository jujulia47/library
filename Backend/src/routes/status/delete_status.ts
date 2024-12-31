import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function DeleteStatus(server: FastifyInstance) {
  //------------DELETE-------------
  server.delete("/status/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const { id } = idParam.parse(request.params);

    const deleteStatus = await prisma.status.delete({
      where: {
        id,
      },
      include: {
        books: {
          select: {
            title: true,
          },
        },
        serie: {
          select: {
            serieName: true,
          },
        },
      },
    });
    return deleteStatus;
  });
}
