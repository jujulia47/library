import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function DeleteBook(server: FastifyInstance) {
  //------------DELETE-------------
  server.delete("/book/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const { id } = idParam.parse(request.params);

    const deleteBook = await prisma.book.delete({
      where: {
        id,
      },
      include: {
        serie: {
          select: {
            serieName: true,
          },
        },
        quotes: {
          select: {
            quote: true,
          },
        },
        flags: {
          select: {
            flag: true,
          },
        },
        collection: {
          select: {
            collectionName: true,
          },
        },
      },
    });
    return deleteBook;
  });
}
