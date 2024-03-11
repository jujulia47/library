import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function DeleteQuote(server: FastifyInstance) {
  //------------DELETE-------------
  server.delete("/quote/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    const { id } = idParam.parse(request.params);

    const deleteQuote = await prisma.quotesArray.delete({
      where: {
        id,
      },
      include: {
        book: {
          select: {
            title: true,
          },
        },
      },
    });
    return deleteQuote;
  });
}
