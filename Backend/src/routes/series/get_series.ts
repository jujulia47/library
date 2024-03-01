import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetSerie(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/serie", async () => {
    const series = await prisma.serie.findMany({
      include: {
         books: {
            select: {
              title: true
            }
         }
      },
    });
    return series;
  });

  //Ex: PDP
  server.get("/serie/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const serie = prisma.serie.findFirst({
      where: {
        serieName: id
      },
      include: {
        books: {
           select: {
             title: true
           }
        }
     },
    });
    return serie;
  });
}
