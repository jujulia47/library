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
    });

    const { id } = idParam.parse(request.params);

    const { quote } = putBody.parse(request.body);

    const quoteUpdated = await prisma.quotesArray.update({
      where: {
        id: id,
      },
      data: {
        quote
      },
      include: {
        book: {
          select: {
            title: true
          }
        }
      }
    });
    return quoteUpdated;
  });
}
