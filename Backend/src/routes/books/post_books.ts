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
      category: z.string(),
      language: z.string(),
      library: z.boolean(),
      finish: z.boolean(),
      finishDate: z.string(),
      image: z.string(),
      rating: z.string(),
      flags: z.array(z.string()), // Adiciona a propriedade 'flags' no corpo da requisição
      quotes: z.array(z.string()),
    });

    // Recupera os dados do frontend
    const {
      title,
      author,
      category,
      language,
      library,
      finish,
      finishDate,
      image,
      rating,
      flags,
      quotes,
    } = bookBody.parse(request.body);

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
        category: category,
        language: language,
        library: library,
        finish: finish,
        finishDate: finishDate,
        image: image,
        rating: rating,
        created_at: new Date(),
        flags: {
          connect: createdFlags.map((flag) => ({
            id: flag.id,
          })),
        },
        quotes: {
          create: quotes.map((quote) => ({
            quote: quote,
            created_at: new Date(),
          })),
        },
      },
      include: {
        flags: true,
        quotes: true,
      },
    });

    return newBook;
  });
}
