import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function DeleteWishlist(server: FastifyInstance) {
  //------------DELETE-------------
  server.delete("/wishlist/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const { id } = idParam.parse(request.params);

    const deleteWishlist = await prisma.wishlist.delete({
      where: {
        id,
      },
      include: {
        collection: {
          select: {
            collectionName: true,
          },
        },
      },
    });
    return deleteWishlist;
  });
}
