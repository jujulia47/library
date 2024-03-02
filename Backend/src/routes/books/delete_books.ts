import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function DeleteBook(server: FastifyInstance) {

  //------------DELETE-------------
  server.delete('/book/id/:id', async (request) => {
      const idParam = z.object({
          id: z.string().uuid()
      })
      const {id} = idParam.parse(request.params)

      const bookRemove = await prisma.book.delete({
          where: {
            id
          }
      })
      return bookRemove
  })
}
