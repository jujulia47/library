import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetQuote(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/quote", async () => {
    const getQuotes = await prisma.quotesArray.findMany({
      include: {
        book: {
          select: {
            title: true,
          },
        },
      },
    });
    return getQuotes;
  });

  //Ex: PDP
  server.get("/quote/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const getQuotesId = prisma.quotesArray.findFirst({
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
    return getQuotesId;
  });
}
