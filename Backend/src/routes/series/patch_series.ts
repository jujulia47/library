import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchSerie(server: FastifyInstance) {
  server.patch("/serie/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const patchSerie = z.object({
      serieName: z.string(),
      author: z.string(),
      initDate: z.date(),
      finishDate: z.date(),
      bookStatus: z.string().nullable(),
      rating: z.string(),
      comments: z.string(),
      flags: z.array(z.string()),
      books: z.array(z.string()),
      wishlist: z.array(z.string()),
    });

    const { id } = idParam.parse(request.params);

    const { serieName, author, initDate, finishDate, bookStatus, rating, comments, flags, books, wishlist } = patchSerie.parse(request.body);

    const findFlags = await prisma.flagsArray.findMany({
      where: {
        flag: { in: flags },
      },
    });
    let flagIds = findFlags.map((flag) => ({ id: flag.id }));
    if (flags.length === 0 || (flags.length === 0 && flags[0] === "")) {
      flagIds = [];
    }

    const findBook = await prisma.book.findMany({
      where: {
        title: { in: books },
      },
    });
    let booksIds = findBook.map((book) => ({ id: book.id }));
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

    let statusConnect = {};

    if (bookStatus ) {
      const findBookStatus = await prisma.status.findFirst({
        where: {
          bookStatus: bookStatus,
        },
      });

      if (!findBookStatus) {
        return {
          error: "A Situação do livro não foi encontrada.",
        };
      }
      statusConnect = { connect: { id: findBookStatus.id } };
      
    } else {
      statusConnect = { disconnect: true}
    }

    const updateSerie = await prisma.serie.update({
      where: {
        id: id,
      },
      data: {
        serieName,
        author,
        initDate,
        finishDate,
        rating, 
        comments, 
        flags: {
          set: flagIds,
        },
        books: {
          set: booksIds,
        },
        wishlist: {
          set: wishlistIds,
        },
        status: statusConnect,
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
        flags: {
          select: {
            flag: true,
          },
        },
        status: {
          select: {
            bookStatus: true,
          },
        },
      },
    });
    return updateSerie;
  });
}
