import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostQuote(server: FastifyInstance) {
  //------------------ POST------------------//

  server.post("/quote", async (request) => {
    const quoteBody = z.object({
      quote: z.string(),
      page: z.string(),
      title: z.string().optional(),
    });

    const { quote, page, title } = quoteBody.parse(request.body);

    let bookConnect = {};
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
        include: {
          book: {
            select: {
              title: true,
            },
          },
        }
      });
      return newQuote;
    }
  });
}
