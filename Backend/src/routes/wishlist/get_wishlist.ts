import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetWishlist(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/wishlist", async () => {
    const getWishlist = await prisma.wishlist.findMany({
      include: {
        collection: {
          select: {
            collectionName: true,
          },
        },
      },
    });
    return getWishlist;
  });

  //Ex: PDP
  server.get("/wishlist/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const getWishlistId = prisma.wishlist.findFirst({
      where: {
        bookTitle: id,
      },
      include: {
        collection: {
          select: {
            collectionName: true,
          },
        },
      },
    });
    return getWishlistId;
  });
}
