import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostVersion(server: FastifyInstance) {
  //------------------ POST------------------

  server.post("/version", async (request) => {
    const versionBody = z.object({
      bookVersion: z.string(),
    });

    const { bookVersion } = versionBody.parse(request.body);

    const findVersion = await prisma.version.findFirst({
      where: {
        bookVersion: bookVersion,
      },
    });

    if (findVersion) {
      return {
        error: "Versão já cadastrada",
      };
    } else {
      const newVersion = await prisma.version.create({
        data: {
          bookVersion: bookVersion,
          created_at: new Date(),
        },
      });
      return newVersion;
    }
  });
}
