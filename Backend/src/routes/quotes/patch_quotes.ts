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
      page: z.number(),
      title: z.string().optional(),
    });

    const { id } = idParam.parse(request.params);

    const { quote, page, title } = putBody.parse(request.body);

    let bookConnect = null;

    if (title) {
      const findBook = await prisma.book.findFirst({
        where: {
          title: title,
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
        page,
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
