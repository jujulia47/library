import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function DeleteColection(server: FastifyInstance) {

  //------------DELETE-------------
  server.delete('/colection/id/:id', async (request) => {
      const idParam = z.object({
          id: z.string().uuid()
      })
      const {id} = idParam.parse(request.params)

      const colectionRemove = await prisma.colectionArray.delete({
          where: {
            id
          }
      })
      return colectionRemove
  })
}
