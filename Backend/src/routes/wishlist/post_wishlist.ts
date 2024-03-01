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
    });

    const { bookTitle, bookImage, link } = wishlistBody.parse(request.body);

    const existingWishlist = await prisma.wishlist.findFirst({
      where: {
        bookTitle: bookTitle
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
          created_at: new Date(),
        },
      });
      return newFlag;
    }
  });
}
