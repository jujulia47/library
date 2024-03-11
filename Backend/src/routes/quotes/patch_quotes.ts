import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchQuote(server: FastifyInstance) {
  server.patch("/quote/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    // objeto zod para o body
    const putBody = z.object({
      quote: z.string(),
      bookName: z.string().nullable(),
    });

    const { id } = idParam.parse(request.params);

    const { quote, bookName } = putBody.parse(request.body);

    let bookConnect = null;

    if (bookName) {
      const findBook = await prisma.book.findFirst({
        where: {
          title: bookName,
        },
      });
      if (!findBook) {
        return {
          error: "O livro não foi encontrado.",
        };
      }
      bookConnect = { connect: { id: findBook.id } };
    } else {
      bookConnect = { disconnect: true };
    }

    const updateQuote = await prisma.quotesArray.update({
      where: {
        id: id,
      },
      data: {
        quote,
        book: bookConnect,
      },
      include: {
        book: {
          select: {
            title: true,
          },
        },
      },
    });
    return updateQuote;
  });
}
