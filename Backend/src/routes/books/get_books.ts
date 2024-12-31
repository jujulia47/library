import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetBook(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/book", async () => {
    const getBooks = await prisma.book.findMany({
      include: {
        serie: {
          select: {
            serieName: true,
            author: true,
            rating: true,
            status: {
              select: {
                bookStatus: true
              },
            },
            initDate: true,
            finishDate: true,
            comments: true,
          },
        },
        status: {
          select: {
            bookStatus: true
          }
        },
        version: {
          select: {
            bookVersion: true
          }
        },
        flags: {
          select: {
            flag: true,
          },
        },
        quotes: {
          select: {
            quote: true,
            page: true
          },
        },
        collection: {
          select: {
            collectionName: true,
            comments: true,
            initDate: true,
            finishDate: true
          },
        },
      },
    });
    return getBooks;
  });

  //Ex: PDP
  server.get("/book/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const getBooksId = prisma.book.findFirst({
      where: {
        title: id,
      },
      include: {
        serie: {
          select: {
            serieName: true,
            author: true,
            rating: true,
            status: {
              select: {
                bookStatus: true
              },
            },
            initDate: true,
            finishDate: true,
            comments: true,
          },
        },
        status: {
          select: {
            bookStatus: true
          }
        },
        version: {
          select: {
            bookVersion: true
          }
        },
        flags: {
          select: {
            flag: true,
          },
        },
        quotes: {
          select: {
            quote: true,
            page: true
          },
        },
        collection: {
          select: {
            collectionName: true,
            comments: true,
            initDate: true,
            finishDate: true
          },
        },
      },
    });
    return getBooksId;
  });
}
