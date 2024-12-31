import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostQuote(server: FastifyInstance) {
  //------------------ POST------------------//

  server.post("/quote", async (request) => {
    const quoteBody = z.object({
      quote: z.string(),
      page: z.number(),
      bookName: z.string().nullable(),
    });

    const { quote, page, bookName } = quoteBody.parse(request.body);

    let bookConnect = {};

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
    }

    const findQuote = await prisma.quotesArray.findFirst({
      where: {
        quote: quote,
      },
    });

    if (findQuote) {
      return {
        error: "Citação já cadastrada",
      };
    } else {
      const newQuote = await prisma.quotesArray.create({
        data: {
          quote: quote,
          page,
          book: bookConnect,
          created_at: new Date(),
        },
      });
      return newQuote;
    }
  });
}
