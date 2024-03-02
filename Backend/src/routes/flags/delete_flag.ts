import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function DeleteFlag(server: FastifyInstance) {

  //------------DELETE-------------
  server.delete('/flag/id/:id', async (request) => {
      const idParam = z.object({
          id: z.string().uuid()
      })
      const {id} = idParam.parse(request.params)

      const flagRemove = await prisma.flagsArray.delete({
          where: {
            id
          }
      })
      return flagRemove
  })
}
