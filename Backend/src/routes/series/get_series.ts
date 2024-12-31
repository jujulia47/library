import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetSerie(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/serie", async () => {
    const getSeries = await prisma.serie.findMany({
      include: {
        books: {
          select: {
            title: true,
          },
        },
        flags: {
          select: {
            flag: true,
          },
        },
        wishlist: {
          select: {
            bookTitle: true,
          },
        },
        status: {
          select: {
            bookStatus: true,
          },
        },
      },
    });
    return getSeries;
  });

  //Ex: PDP
  server.get("/serie/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const getSeriesId = prisma.serie.findFirst({
      where: {
        serieName: id,
      },
      include: {
        books: {
          select: {
            title: true,
          },
        },
        flags: {
          select: {
            flag: true,
          },
        },
        wishlist: {
          select: {
            bookTitle: true,
          },
        },
        status: {
          select: {
            bookStatus: true,
          },
        },
      },
    });
    return getSeriesId;
  });
}
