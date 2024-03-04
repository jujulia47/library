import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

//REGRA
// Emitir um alerta de que quando uma série for alterada, será alterada para todos os livros vinculadas a ela
// Quando finalizado a alteração ou antes, exibir os livros vinculados

export async function PatchSerie(server: FastifyInstance) {
  server.patch("/serie/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    // objeto zod para o body
    const putBody = z.object({
      serieName: z.string(),
      concluded: z.boolean(),
      abandoned: z.boolean(),
    });

    const { id } = idParam.parse(request.params);

    const { serieName, concluded, abandoned } = putBody.parse(request.body);

    const serieUpdated = await prisma.serie.update({
      where: {
        id: id,
      },
      data: {
        serieName,
        concluded,
        abandoned,
      },
      include: {
        books: {
          select: {
            title: true
          }
        }
      }
    });
    return serieUpdated;
  });
}
