import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchVersion(server: FastifyInstance) {
  server.patch("/version/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    // objeto zod para o body
    const patchVersion = z.object({
      bookVersion: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const { bookVersion } = patchVersion.parse(request.body);

    const updateVersion = await prisma.version.update({
      where: {
        id: id,
      },
      data: {
        bookVersion,
      },
      include: {
        books: {
          select: {
            title: true,
          },
        },
      },
    });
    return updateVersion;
  });
}
