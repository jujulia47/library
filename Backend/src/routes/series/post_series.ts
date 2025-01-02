import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostSerie(server: FastifyInstance) {
  //------------------ POST------------------

  server.post("/serie", async (request, reply) => {
    const serieBody = z.object({
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

    const { serieName, author, initDate, finishDate, bookStatus, rating, comments, flags, books, wishlist } = serieBody.parse(request.body);
    // Filtrar strings vazias
    const filteredBooks = books.filter((book) => book.trim() !== "");
    const filteredWishlist = wishlist.filter((item) => item.trim() !== "");
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
        title: { in: filteredBooks },
      },
    });
    const booksIds = findBooks.map((book) => ({ id: book.id }));
    if (filteredBooks.length > 0 && booksIds.length !== filteredBooks.length) {
      return reply.status(400).send({
        error: "Alguns livros não foram encontrados.",
      });
    }

    const findWishlist = await prisma.wishlist.findMany({
      where: {
        bookTitle: { in: filteredWishlist  },
      },
    });
    const wishlistIds = findWishlist.map((item) => ({ id: item.id }));
    if (filteredWishlist.length > 0 && wishlistIds.length !== filteredWishlist.length) {
      return reply.status(400).send({
        error: "Alguns itens da wishlist não foram encontrados.",
      });
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
        include: {
          status: {
            select: {
              bookStatus: true
            }
          },
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
      return newSerie;
    }
  });
}
