import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostSerie(server: FastifyInstance) {
  //------------------ POST------------------

  server.post("/serie", async (request) => {
    const serieBody = z.object({
      serieName: z.string(),
      concluded: z.boolean(),
      abandoned: z.boolean(),
    });

    const { serieName, concluded, abandoned } = serieBody.parse(request.body);

    const findSerie = await prisma.serie.findFirst({
      where: {
        serieName: serieName,
      },
    });

    if (findSerie) {
      return {
        error: "Serie já cadastrada",
      };
    } else {
      const newSerie = await prisma.serie.create({
        data: {
          serieName: serieName,
          concluded: concluded,
          abandoned: abandoned,
          created_at: new Date(),
        },
      });
      return newSerie;
    }
  });
}
