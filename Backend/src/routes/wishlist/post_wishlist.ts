import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostWishlist(server: FastifyInstance) {
  //------------------ POST------------------
  server.post("/wishlist", async (request) => {
    const wishlistBody = z.object({
      bookTitle: z.string(),
      bookImage: z.string(),
      link: z.string(),
      colection: z.array(z.string()),
    });

    const { bookTitle, bookImage, link, colection } = wishlistBody.parse(
      request.body
    );

    let createdColection = [];

    // Para cada item na coleção, verifique se ele já existe no banco de dados
    for (const colectionItem of colection) {
      const existingColectionItem = await prisma.colectionArray.findFirst({
        where: {
          colection: colectionItem,
        },
      });

      if (existingColectionItem) {
        // Se o item da coleção já existir, adicione-o ao array de itens da coleção criados
        createdColection.push(existingColectionItem);
      } else {
        // Se o item da coleção não existir, crie-o e adicione-o ao array de itens da coleção criados
        const newColectionItem = await prisma.colectionArray.create({
          data: {
            colection: colectionItem,
            created_at: new Date(),
          },
        });
        createdColection.push(newColectionItem);
      }
    }

    const existingWishlist = await prisma.wishlist.findFirst({
      where: {
        bookTitle: bookTitle,
      },
    });

    if (existingWishlist) {
      return {
        error: "Livro já cadastrado na lista de wishlist",
      };
    } else {
      const newFlag = await prisma.wishlist.create({
        data: {
          bookTitle: bookTitle,
          bookImage: bookImage,
          link: link,
          colection: {
            connect: createdColection.map((colectionItem) => ({
              id: colectionItem.id,
            })),
          },
          created_at: new Date(),
        },
        include: {
          colection: {
            select: {
              colection: true
            }
          }
        }
      });
      return newFlag;
    }
  });
}
