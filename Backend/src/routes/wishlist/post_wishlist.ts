import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostWishlist(server: FastifyInstance) {
  //------------------ POST------------------
  server.post("/wishlist", async (request) => {
    const wishlistBody = z.object({
      bookTitle: z.string(),
      bookImage: z.string(),
      link: z.string(),
      collections: z.array(z.string()),
      serieName: z.string().nullable(),
    });

    const { bookTitle, bookImage, link, collections, serieName } = wishlistBody.parse(
      request.body
    );

    let createdCollection = [];

    for (const collection of collections) {
      const findCollection = await prisma.collectionArray.findFirst({
        where: {
          collectionName: collection,
        },
      });

      if (findCollection) {
        createdCollection.push(findCollection);
      } else {
        const newCollectionItem = await prisma.collectionArray.create({
          data: {
            collectionName: collection,
            created_at: new Date(),
          },
        });
        createdCollection.push(newCollectionItem);
      }
    }

    let serieConnect = {};
    if (serieName) {
      const foundSerie = await prisma.serie.findFirst({
        where: { serieName: serieName },
      });
      if (!foundSerie) {
        return { error: "A série não foi encontrada." };
      }
      serieConnect = { connect: { id: foundSerie.id } };
    } 

    const findWishlist = await prisma.wishlist.findFirst({
      where: {
        bookTitle: bookTitle,
      },
    });

    if (findWishlist) {
      return {
        error: "Livro já cadastrado na lista de wishlist",
      };
    } else {
      const newWishlist = await prisma.wishlist.create({
        data: {
          bookTitle: bookTitle,
          bookImage: bookImage,
          link: link,
          collection: {
            connect: createdCollection.map((collection) => ({
              id: collection.id,
            })),
          },
          serie: serieConnect,
          created_at: new Date(),
        },
        include: {
          collection: {
            select: {
              collectionName: true,
            },
          },
        },
      });
      return newWishlist;
    }
  });
}
