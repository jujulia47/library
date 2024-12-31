import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchStatus(server: FastifyInstance) {
  server.patch("/status/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    // objeto zod para o body
    const patchStatus = z.object({
      bookStatus: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const { bookStatus } = patchStatus.parse(request.body);

    const updateStatus = await prisma.status.update({
      where: {
        id: id,
      },
      data: {
        bookStatus,
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
    return updateStatus;
  });
}
