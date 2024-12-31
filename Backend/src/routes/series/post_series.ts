import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostSerie(server: FastifyInstance) {
  //------------------ POST------------------

  server.post("/serie", async (request) => {
    const serieBody = z.object({
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

    const { serieName, author, initDate, finishDate, bookStatus, rating, comments, flags, books, wishlist } = serieBody.parse(request.body);

    const findSerie = await prisma.serie.findFirst({
      where: {
        serieName: serieName,
      },
    });

    let createdFlags = [];
    for (const flag of flags) {
      if (flag.trim() != "") {
        const findFlag = await prisma.flagsArray.findFirst({
          where: {
            flag: flag,
          },
        });
        if (findFlag) {
          createdFlags.push(findFlag);
        } else {
          const newFlag = await prisma.flagsArray.create({
            data: {
              flag: flag,
              created_at: new Date(),
            },
          });
          createdFlags.push(newFlag);
        }
      }
    }

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
    let statusConnect = {};

    if (bookStatus) {
      // Buscar a situação no banco de dados
      const foundStatus = await prisma.status.findFirst({
        where: { bookStatus: bookStatus },
      });
    
      if (!foundStatus) {
        return { error: "A situação do livro não foi encontrada." };
      }
    
      // Conectar à situação encontrada
      statusConnect = { connect: { id: foundStatus.id } };
    } 

    if (findSerie) {
      return {
        error: "Serie já cadastrada",
      };
    } else {
      const newSerie = await prisma.serie.create({
        data: {
          serieName,
          author,
          initDate,
          finishDate,
          rating, 
          comments, 
          books: {
            connect: booksIds,
          },
          wishlist: {
            connect: wishlistIds,
          },
          flags: {
            connect: createdFlags.map((flag) => ({
              id: flag.id,
            })),
          },
          status: statusConnect,
          created_at: new Date(),
        },
      });
      return newSerie;
    }
  });
}
