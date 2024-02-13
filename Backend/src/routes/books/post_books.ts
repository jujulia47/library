import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostBook(server: FastifyInstance) {
  //------------------ POST------------------

  server.post("/book", async (request) => {
    // Cria um objeto Zod para definir o esquema de dados do frontend
    const bookBody = z.object({
      title: z.string(),
      author: z.string(),
      image: z.string(),
      category: z.string(),
      rating: z.string(),
      flags: z.array(z.string()), // Adiciona a propriedade 'flags' no corpo da requisição
    });

    // Recupera os dados do frontend
    const { title, author, image, category, rating, flags } = bookBody.parse(
      request.body
    );

    let createdFlags = [];

    // Para cada flag no array, verifique se ela já existe no banco de dados
    for (const flag of flags) {
      const existingFlag = await prisma.flagsArray.findFirst({
        where: {
          flag: flag,
        },
      });

      if (existingFlag) {
        // Se a flag já existir, adicione-a ao array de flags criadas
        createdFlags.push(existingFlag);
      } else {
        // Se a flag não existir, crie-a e adicione-a ao array de flags criadas
        const newFlag = await prisma.flagsArray.create({
          data: {
            flag: flag,
            created_at: new Date(),
          },
        });
        createdFlags.push(newFlag);
      }
    }

    // Insere o livro no banco de dados, conectando-o às flags criadas
    const newBook = await prisma.book.create({
      data: {
        title: title,
        author: author,
        image: image,
        category: category,
        rating: rating,
        created_at: new Date(),
        flags: {
          connect: createdFlags.map((flag) => ({
            id: flag.id,
          })),
        },
      },
      include: {
        flags: true,
      },
    });

    return newBook;
  });
}
