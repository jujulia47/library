import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostSerie(server: FastifyInstance) {
  //------------------ POST------------------

  server.post("/serie", async (request) => {
    // Cria um objeto Zod para definir o esquema de dados do frontend
    const serieBody = z.object({
        serieName: z.string(),
        concluded: z.boolean(),
        abandoned: z.boolean()
    });

    // Recupera os dados do frontend
    const { 
        serieName, 
        concluded, 
        abandoned
    } = serieBody.parse(request.body);

    // Verifica se a flag já está em uso
    const existingSerie = await prisma.serie.findFirst({
      where: {
        serieName: serieName
      },
    });

    if (existingSerie) {
      // Livro já cadastrado, retornar uma resposta de erro
      return {
        error: "Serie já cadastrada",
      };
    } else {
      // Insere a flag no banco de dados
      const newSerie = await prisma.serie.create({
        data: {
          serieName: serieName,
          concluded: concluded,
          abandoned: abandoned,
          created_at: new Date(),
        },
      });
      return newSerie;
    }
  });
}
