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
    });

    const { bookTitle, bookImage, link, collections } = wishlistBody.parse(
      request.body
    );

    let createdCollection = [];

    // Para cada item na coleção, verifique se ele já existe no banco de dados
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
