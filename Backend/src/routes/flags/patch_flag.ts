import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

//REGRA
// Emitir um alerta de que quando uma flag for alterada, será alterada para todos os livros vinculadas a ela
// Quando finalizado a alteração ou antes, exibir os livros vinculados

export async function PatchFlag(server: FastifyInstance) {
  server.patch("/flag/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    // objeto zod para o body
    const putBody = z.object({
        flag: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const { flag } = putBody.parse(request.body);

    const flagUpdated = await prisma.flagsArray.update({
      where: {
        id: id,
      },
      data: {
        flag,
      },
      include: {
        books: {
          select: {
            title: true
          }
        }
      }
    });
    return flagUpdated;
  });
}
