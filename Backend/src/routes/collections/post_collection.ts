import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostCollection(server: FastifyInstance) {
  //------------------ POST------------------
  server.post("/collection", async (request) => {
    const postCollection = z.object({
      collection: z.string(),
      comments: z.string(),
      initDate: z.string().nullable(),
      finishDate: z.string().nullable(),
      books: z.array(z.string()),
      wishlist: z.array(z.string()),
    });

    const { collection, comments, initDate, finishDate, books, wishlist } = postCollection.parse(request.body);

    const findCollection = await prisma.collectionArray.findFirst({
      where: {
        collectionName: collection,
      },
    });

    // Buscar os IDs dos livros na tabela `book`
    const findBooks = await prisma.book.findMany({
      where: {
        title: { in: books },
      },
    });
    const booksIds = findBooks.map((book) => ({ id: book.id }));

    if (books.length > 0 && booksIds.length !== books.length) {
      return {
        error: "Alguns livros não foram encontrados.",
      };
    }

    // Buscar os IDs da wishlist na tabela `wishlist`
    const findWishlist = await prisma.wishlist.findMany({
      where: {
        bookTitle: { in: wishlist },
      },
    });
    const wishlistIds = findWishlist.map((item) => ({ id: item.id }));

    if (wishlist.length > 0 && wishlistIds.length !== wishlist.length) {
      return {
        error: "Alguns itens da wishlist não foram encontrados.",
      };
    }

    if (findCollection) {
      return {
        error: "Coleção já cadastrada",
      };
    } else {
      const newCollection = await prisma.collectionArray.create({
        data: {
          collectionName: collection,
          comments,
          initDate,
          finishDate,
          books: {
            connect: booksIds,
          },
          wishlist: {
            connect: wishlistIds,
          },
          created_at: new Date(),
        },
      });
      return newCollection;
    }
  });
}
