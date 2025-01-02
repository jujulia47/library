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
      bookTitle: z.string(),
      bookImage: z.string().optional(),
      link: z.string().optional().nullable(),
      collection: z.array(z.string()).optional().default([]),
      serieName: z.string().optional(),
    });

    const { id } = idParam.parse(request.params);

    const { bookImage, bookTitle, link, collection, serieName } = patchBody.parse(
      request.body
    );
    
    const findCollection = await prisma.collectionArray.findMany({
      where: {
        collectionName: { in: collection },
      },
    });
    let CollectionIds = findCollection.map((collection) => ({
      id: collection.id,
    }));
    if (collection.length === 0 || (collection.length === 0 && collection[0] === "")) {
      CollectionIds = [];
    }
    
    let serieConnect = {};
    if (serieName) {
      const findSerie = await prisma.serie.findFirst({
        where: {
          serieName: serieName,
        },
      });
      if (!findSerie) {
        return {
          error: "A série, a situação ou a versão do livro não foi encontrada.",
        };
      }
      serieConnect = { connect: { id: findSerie.id } };
    } else {
      serieConnect = { disconnect: true };
    }

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
        serie: serieConnect,
      },
      include: {
        collection: {
          select: {
            collectionName: true,
          },
        },
        serie: {
          select: {
            serieName: true,
          },
        },
      },
    });
    return updateWishlist;
  });
}
