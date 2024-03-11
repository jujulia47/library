import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function DeleteCollection(server: FastifyInstance) {
  //------------DELETE-------------
  server.delete("/collection/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const { id } = idParam.parse(request.params);

    const deleteCollection = await prisma.collectionArray.delete({
      where: {
        id,
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
    return deleteCollection;
  });
}
