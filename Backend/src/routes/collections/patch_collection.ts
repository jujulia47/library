import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchCollection(server: FastifyInstance) {
  server.patch("/collection/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const PatchCollection = z.object({
      collectionName: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const { collectionName } = PatchCollection.parse(request.body);

    const updateCollection = await prisma.collectionArray.update({
      where: {
        id: id,
      },
      data: {
        collectionName,
      },
      include: {
        books: {
          select: {
            title: true,
          },
        },
        wishlist: {
          select: {
            bookTitle: true,
          },
        },
      },
    });
    return updateCollection;
  });
}
