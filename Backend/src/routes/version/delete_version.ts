import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function DeleteVersion(server: FastifyInstance) {
  //------------DELETE-------------
  server.delete("/version/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const { id } = idParam.parse(request.params);

    const deleteVersion = await prisma.version.delete({
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
    return deleteVersion;
  });
}
