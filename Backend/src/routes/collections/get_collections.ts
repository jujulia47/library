import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetCollections(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/collection", async () => {
    const getCollections = await prisma.collectionArray.findMany({
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
    return getCollections;
  });

  //Ex: PDP
  server.get("/collection/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const getCollectionsId = prisma.collectionArray.findFirst({
      where: {
        collectionName: id,
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
    return getCollectionsId;
  });
}
