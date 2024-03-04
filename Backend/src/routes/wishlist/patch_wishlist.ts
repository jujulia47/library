import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchWishlist(server: FastifyInstance) {
  server.patch("/wishlist/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });
    // objeto zod para o body
    const putBody = z.object({
      bookImage: z.string(),
      bookTitle: z.string(),
      link: z.string(),
      colection: z.array(z.string()),

    });

    const { id } = idParam.parse(request.params);

    const {         
      bookImage,
      bookTitle,
      link,
      colection,
      } = putBody.parse(request.body);

      const existingColections = await prisma.colectionArray.findMany({
        where: {
          colection: { in: colection },
        },
      });
  
      const ColectionIds = existingColections.map((colection) => ({ id: colection.id }));

    const wishlistUpdated = await prisma.wishlist.update({
      where: {
        id: id,
      },
      data: {
        bookImage,
        bookTitle,
        link,
        colection: {
          set: ColectionIds
        }
      },
      include: {
        colection: {
          select: {
            colection: true,
          },
        },
      },
    });
    return wishlistUpdated;
  });
}
