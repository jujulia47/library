import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchWishlist(server: FastifyInstance) {
  server.patch("/wishlist/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    // objeto zod para o body
    const patchBody = z.object({
      bookImage: z.string(),
      bookTitle: z.string(),
      link: z.string(),
      collection: z.array(z.string()),
    });

    const { id } = idParam.parse(request.params);

    const { bookImage, bookTitle, link, collection } = patchBody.parse(
      request.body
    );

    const findCollection = await prisma.collectionArray.findMany({
      where: {
        collectionName: { in: collection },
      },
    });

    const CollectionIds = findCollection.map((collection) => ({
      id: collection.id,
    }));

    const updateWishlist = await prisma.wishlist.update({
      where: {
        id: id,
      },
      data: {
        bookImage,
        bookTitle,
        link,
        collection: {
          set: CollectionIds,
        },
      },
      include: {
        collection: {
          select: {
            collectionName: true,
          },
        },
      },
    });
    return updateWishlist;
  });
}
