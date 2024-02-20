import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostFlag(server: FastifyInstance) {
  //------------------ POST------------------

  server.post("/flag", async (request) => {
    // Cria um objeto Zod para definir o esquema de dados do frontend
    const bookBody = z.object({
      flag: z.string(),
    });

    // Recupera os dados do frontend
    const { flag } = bookBody.parse(request.body);

    // Verifica se a flag já está em uso
    const existingBook = await prisma.flagsArray.findFirst({
      where: {
        flag: flag,
      },
    });

    if (existingBook) {
      // Livro já cadastrado, retornar uma resposta de erro
      return {
        error: "Flag já cadastrada",
      };
    } else {
      // Insere a flag no banco de dados
      const newFlag = await prisma.flagsArray.create({
        data: {
          flag: flag,
          created_at: new Date(),
        },
      });
      return newFlag;
    }
  });
}
