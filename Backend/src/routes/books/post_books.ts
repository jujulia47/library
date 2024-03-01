import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostBook(server: FastifyInstance) {
  //------------------ POST------------------

  server.post("/book", async (request) => {
    // Cria um objeto Zod para definir o esquema de dados do frontend
    const bookBody = z.object({
      image: z.string(),
      title: z.string(),
      serie: z.object({
        serieName: z.string(),
        concluded: z.boolean(),
        abandoned: z.boolean(),
      }),
      author: z.string(),
      category: z.string(),
      language: z.string(),
      library: z.boolean(),
      initDate: z.string(),
      finishDate: z.string(),
      finish: z.boolean(),
      rating: z.string(),
      flags: z.array(z.string()),
      quotes: z.array(z.string()),
      colection: z.array(z.string()),
    });

    // Recupera os dados do frontend
    const {
      image,
      title,
      serie: { serieName, concluded, abandoned },
      author,
      category,
      language,
      library,
      initDate,
      finishDate,
      finish,
      rating,
      flags,
      quotes,
      colection,
    } = bookBody.parse(request.body);

    let createdFlags = [];
    let createdColection = [];

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

    // Para cada item na coleção, verifique se ele já existe no banco de dados
    for (const colectionItem of colection) {
      const existingColectionItem = await prisma.colectionArray.findFirst({
        where: {
          colection: colectionItem,
        },
      });

      if (existingColectionItem) {
        // Se o item da coleção já existir, adicione-o ao array de itens da coleção criados
        createdColection.push(existingColectionItem);
      } else {
        // Se o item da coleção não existir, crie-o e adicione-o ao array de itens da coleção criados
        const newColectionItem = await prisma.colectionArray.create({
          data: {
            colection: colectionItem,
            created_at: new Date(),
          },
        });
        createdColection.push(newColectionItem);
      }
    }

    // Verifica se a série já existe no banco de dados
    let existingSerie = await prisma.serie.findFirst({
      where: {
        serieName: serieName,
      },
    });

    // Se a série já existir, use-a, senão, crie uma nova série
    if (!existingSerie) {
      existingSerie = await prisma.serie.create({
        data: {
          serieName,
          concluded,
          abandoned,
          created_at: new Date(),
        },
      });
    }

    // Insere o livro no banco de dados, conectando-o às flags criadas
    const newBook = await prisma.book.create({
      data: {
        image: image,
        title: title,
        serie: {
          connect: { id: existingSerie.id }, // Conecta o livro à série existente ou recém-criada
        },
        author: author,
        category: category,
        language: language,
        library: library,
        initDate: initDate,
        finishDate: finishDate,
        finish: finish,
        rating: rating,
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
        colection: {
          connect: createdColection.map((colectionItem) => ({
            id: colectionItem.id,
          })),
        },
        created_at: new Date(),
      },
      include: {
        serie: {
          select: {
            serieName: true,
            concluded: true,
            abandoned: true
          }
        },
        flags: {
          select: {
            flag: true
          }
        },
        quotes: {
          select: {
            quote: true
          }
        },
        colection: {
          select: {
            colection: true
          }
        }
      },
    });

    return newBook;
  });
}
