import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetVersion(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/version", async () => {
    const getVersion = await prisma.version.findMany({
      include: {
        books: {
          select: {
            title: true,
          },
        },
      },
    });
    return getVersion;
  });

  //Ex: PDP
  server.get("/version/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const getVersionId = prisma.version.findFirst({
      where: {
        bookVersion: id,
      },
      include: {
        books: {
          select: {
            title: true,
          },
        },
      },
    });
    return getVersionId;
  });
}
