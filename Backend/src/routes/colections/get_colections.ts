import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetColections(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/colection", async () => {
    const colections = await prisma.colectionArray.findMany({
      include: {
        books: {
          select: {
            title: true,
          },
        },
        wishlist: {
          select: {
            bookTitle: true,
          },
        },
      },
    });
    return colections;
  });

  //Ex: PDP
  server.get("/colection/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const colections = prisma.colectionArray.findFirst({
      where: {
        colection: id,
      },
      include: {
        books: {
          select: {
            title: true,
          },
        },
        wishlist: {
          select: {
            bookTitle: true,
          },
        },
      },
    });
    return colections;
  });
}
