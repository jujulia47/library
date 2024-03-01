import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostQuote(server: FastifyInstance) {
  //------------------ POST------------------//

  server.post("/quote", async (request) => {
    const quoteBody = z.object({
      quote: z.string(),
      bookId: z.string()
    });

    const {
      quote,
      bookId,
    } = quoteBody.parse(request.body);

    const existingQuote = await prisma.quotesArray.findFirst({
      where: {
        quote: quote,
      },
    });

    if (existingQuote) {
      return {
        error: "Citação já cadastrado",
      };
    } else {
      const newQuote = await prisma.quotesArray.create({
        data: {
          quote: quote,
          book: {
            connect: {
              id: bookId,
            },
          },
          created_at: new Date(),
        },
      });
      return newQuote;
    }
  });
}
