import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetStatus(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/status", async () => {
    const getStatus = await prisma.status.findMany({
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
    return getStatus;
  });

  //Ex: PDP
  server.get("/status/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const getStatusId = prisma.status.findFirst({
      where: {
        bookStatus: id,
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
    return getStatusId;
  });
}
