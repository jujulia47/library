import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostWishlist(server: FastifyInstance) {
  //------------------ POST------------------
  server.post("/wishlist", async (request) => {
    const wishlistBody = z.object({
      bookTitle: z.string(),
      bookImage: z.string().optional(),
      link: z.string().optional(),
      collections: z.array(z.string()).optional(),
      serieName: z.string().optional(),
    });

    const { bookTitle, bookImage, link, collections, serieName } = wishlistBody.parse(
      request.body
    );

    let createdCollection = [];

    if(collections){
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
          bookImage: bookImage === undefined ? null : bookImage,  // Definindo como null se não for passado
          link: link === undefined ? null : link,
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
          serie: {
            select: {
              serieName: true
            }
          }
        },
      });
      return newWishlist;
    }
  });
}
