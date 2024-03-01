import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetQuote(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/quote", async () => {
    const quotes = await prisma.quotesArray.findMany({
      include: {
        book: {
          select: {
            title: true,
          },
        },
      },
    });
    return quotes;
  });

  //Ex: PDP
  server.get("/quote/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const quote = prisma.quotesArray.findFirst({
      where: {
        quote: id,
      },
      include: {
        book: {
          select: {
            title: true,
          },
        },
      },
    });
    return quote;
  });
}
