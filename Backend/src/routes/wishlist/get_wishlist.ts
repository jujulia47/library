import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetWishlist(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/wishlist", async () => {
    const wishlist = await prisma.wishlist.findMany({
      include: {
        colection: {
          select: {
            colection: true,
          },
        },
      },
    });
    return wishlist;
  });

  //Ex: PDP
  server.get("/wishlist/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const wishlist = prisma.wishlist.findFirst({
      where: {
        bookTitle: id,
      },
      include: {
        colection: {
          select: {
            colection: true,
          },
        },
      },
    });
    return wishlist;
  });
}
