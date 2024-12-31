import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostStatus(server: FastifyInstance) {
  //------------------ POST------------------

  server.post("/status", async (request) => {
    const statusBody = z.object({
      bookStatus: z.string(),
    });

    const { bookStatus } = statusBody.parse(request.body);

    const findStatus = await prisma.status.findFirst({
      where: {
        bookStatus: bookStatus,
      },
    });

    if (findStatus) {
      return {
        error: "Status já cadastrada",
      };
    } else {
      const newStatus = await prisma.status.create({
        data: {
          bookStatus: bookStatus,
          created_at: new Date(),
        },
      });
      return newStatus;
    }
  });
}
