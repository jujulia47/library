import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostCollection(server: FastifyInstance) {
  //------------------ POST------------------
  server.post("/collection", async (request) => {
    const postCollection = z.object({
      collection: z.string(),
    });

    const { collection } = postCollection.parse(request.body);

    const findCollection = await prisma.collectionArray.findFirst({
      where: {
        collectionName: collection,
      },
    });

    if (findCollection) {
      return {
        error: "Coleção já cadastrada",
      };
    } else {
      const newCollection = await prisma.collectionArray.create({
        data: {
          collectionName: collection,
          created_at: new Date(),
        },
      });
      return newCollection;
    }
  });
}
