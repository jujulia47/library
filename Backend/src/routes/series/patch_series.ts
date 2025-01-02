import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchSerie(server: FastifyInstance) {
  server.patch("/serie/id/:id", async (request, reply) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const patchSerie = z.object({
      serieName: z.string(),
      author: z.string().optional(),
      initDate: z.string().optional(),
      finishDate: z.string().optional(),
      bookStatus: z.string(),
      rating: z.string().optional(),
      comments: z.string().optional(),
      flags: z.array(z.string()).optional().default([]),
      books: z.array(z.string()).optional().default([]),
      wishlist: z.array(z.string()).optional().default([]),
    });

    const { id } = idParam.parse(request.params);

    const { serieName, author, initDate, finishDate, bookStatus, rating, comments, flags, books, wishlist } = patchSerie.parse(request.body);
    // Filtra valores vazios
    const filteredBooks = books.filter((book) => book.trim() !== "");
    const filteredWishlist = wishlist.filter((item) => item.trim() !== "");
    const filteredFlags = flags.filter((flag) => flag.trim() !== "");

    // Valida Flags
    const findFlags = await prisma.flagsArray.findMany({
      where: {
        flag: { in: filteredFlags },
      },
    });
    if (filteredFlags.length > findFlags.length) {
      const notFoundFlags = filteredFlags.filter(
        (flag) => !findFlags.some((found) => found.flag === flag)
      );
      return reply.status(400).send({
        error: `As seguintes flags não foram encontradas: ${notFoundFlags.join(", ")}`,
      });
    }
    const flagIds = findFlags.map((flag) => ({ id: flag.id }));

    // Valida Books
    const findBooks = await prisma.book.findMany({
      where: {
        title: { in: filteredBooks },
      },
    });
    if (filteredBooks.length > findBooks.length) {
      const notFoundBooks = filteredBooks.filter(
        (book) => !findBooks.some((found) => found.title === book)
      );
      return reply.status(400).send({
        error: `Os seguintes livros não foram encontrados: ${notFoundBooks.join(", ")}`,
      });
    }
    const booksIds = findBooks.map((book) => ({ id: book.id }));

    // Valida Wishlist
    const findWishlist = await prisma.wishlist.findMany({
      where: {
        bookTitle: { in: filteredWishlist },
      },
    });
    if (filteredWishlist.length > findWishlist.length) {
      const notFoundWishlist = filteredWishlist.filter(
        (item) => !findWishlist.some((found) => found.bookTitle === item)
      );
      return reply.status(400).send({
        error: `Os seguintes itens da wishlist não foram encontrados: ${notFoundWishlist.join(", ")}`,
      });
    }
    const wishlistIds = findWishlist.map((wish) => ({ id: wish.id }));

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
