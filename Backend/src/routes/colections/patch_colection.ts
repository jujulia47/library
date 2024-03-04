import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

//REGRA
// Emitir um alerta de que quando uma coleção for alterada, será alterada para todos os livros vinculadas a ela
// Quando finalizado a alteração ou antes, exibir os livros vinculados

export async function PatchColection(server: FastifyInstance) {
  server.patch("/colection/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    // objeto zod para o body
    const putBody = z.object({
      colection: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const { colection } = putBody.parse(request.body);

    const colectionUpdated = await prisma.colectionArray.update({
      where: {
        id: id,
      },
      data: {
        colection
      },
      include: {
        books: {
          select: {
            title: true
          }
        },
        wishlist: {
          select: {
            bookTitle: true
          }
        }
      }
    });
    return colectionUpdated;
  });
}
