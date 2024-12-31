import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchCollection(server: FastifyInstance) {
  server.patch("/collection/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const PatchCollection = z.object({
      collectionName: z.string(),
      comments: z.string(),
      books: z.array(z.string()),
      wishlist: z.array(z.string()),
    });

    const { id } = idParam.parse(request.params);

    const { collectionName, comments, books, wishlist } = PatchCollection.parse(request.body);

    const findBooks = await prisma.book.findMany({
      where: {
        title: { in: books },
      },
    });
    let booksIds = findBooks.map((book) => ({ id: book.id }));
    if (books.length === 0 || (books.length === 0 && books[0] === "")) {
      booksIds = [];
    }

    const findWishlist = await prisma.wishlist.findMany({
      where: {
        bookTitle: { in: wishlist },
      },
    });
    let wishlistIds = findWishlist.map((wishTable) => ({ id: wishTable.id }));
    if (wishlist.length === 0 || (wishlist.length === 0 && wishlist[0] === "")) {
      wishlistIds = [];
    }

    const updateCollection = await prisma.collectionArray.update({
      where: {
        id: id,
      },
      data: {
        collectionName,
        comments,
        books: {
          set: booksIds
        },
        wishlist: {
          set: wishlistIds
        }
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
    return updateCollection;
  });
}
