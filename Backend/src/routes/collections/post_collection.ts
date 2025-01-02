import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostCollection(server: FastifyInstance) {
  server.post("/collection", async (request, reply) => {
    // Validação do corpo da requisição
    const postCollection = z.object({
      collectionName: z.string(),
      comments: z.string(),
      initDate: z.string().nullable(),
      finishDate: z.string().nullable(),
      books: z.array(z.string()).optional().default([]),
      wishlist: z.array(z.string()).optional().default([]),
    });

    const { collectionName, comments, initDate, finishDate, books, wishlist } = postCollection.parse(request.body);
    // Filtrar strings vazias
    const filteredBooks = books.filter((book) => book.trim() !== "");
    const filteredWishlist = wishlist.filter((item) => item.trim() !== "");
    // Verificar se a coleção já existe
    const findCollection = await prisma.collectionArray.findFirst({
      where: { collectionName: collectionName },
    });

    if (findCollection) {
      return reply.status(400).send({ error: "Coleção já cadastrada" });
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

    // Criar a nova coleção
    const newCollection = await prisma.collectionArray.create({
      data: {
        collectionName,
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

    return reply.status(201).send(newCollection);
  });
}
