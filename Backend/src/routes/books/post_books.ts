import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostBook(server: FastifyInstance) {
  //------------------ POST------------------

  server.post("/book", async (request) => {
    const postBook = z.object({
      image: z.string(),
      title: z.string(),
      serieName: z.string().nullable(),
      author: z.string(),
      category: z.string(),
      language: z.string(),
      library: z.boolean(),
      initDate: z.string(),
      finishDate: z.string(),
      finish: z.boolean(),
      rating: z.string(),
      flags: z.array(z.string()),
      quotes: z.array(z.string()).default([]),
      collections: z.array(z.string()),
    });

    const {
      image,
      title,
      serieName,
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
      collections,
    } = postBook.parse(request.body);

    let createdFlags = [];
    let createdCollection = [];
    let serieConnect = {};

    for (const flag of flags) {
      if (flag.trim() != "") {
        const findFlag = await prisma.flagsArray.findFirst({
          where: {
            flag: flag,
          },
        });
        if (findFlag) {
          createdFlags.push(findFlag);
        } else {
          const newFlag = await prisma.flagsArray.create({
            data: {
              flag: flag,
              created_at: new Date(),
            },
          });
          createdFlags.push(newFlag);
        }
      }
    }

    for (const collection of collections) {
      if (collection.trim() !== "") {
        const findCollection = await prisma.collectionArray.findFirst({
          where: {
            collectionName: collection,
          },
        });

        if (findCollection) {
          createdCollection.push(findCollection);
        } else {
          const newCollection = await prisma.collectionArray.create({
            data: {
              collectionName: collection,
              created_at: new Date(),
            },
          });
          createdCollection.push(newCollection);
        }
      }
    }

    if (serieName) {
      const findSerie = await prisma.serie.findFirst({
        where: {
          serieName: serieName,
        },
      });

      if (!findSerie) {
        return {
          error: "A série não foi encontrada.",
        };
      }
      // Use o ID do livro encontrado para conectar a citação ao livro
      serieConnect = { connect: { id: findSerie.id } };
    }

    const newBook = await prisma.book.create({
      data: {
        image: image,
        title: title,
        serie: serieConnect,
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
          create: quotes
            .filter((quote) => quote.trim() !== "")
            .map((quote) => ({
              quote: quote,
              created_at: new Date(),
            })),
        },
        collection: {
          connect: createdCollection.map((collectionItem) => ({
            id: collectionItem.id,
          })),
        },
        created_at: new Date(),
      },
      include: {
        serie: {
          select: {
            serieName: true,
            concluded: true,
            abandoned: true,
          },
        },
        flags: {
          select: {
            flag: true,
          },
        },
        quotes: {
          select: {
            quote: true,
          },
        },
        collection: {
          select: {
            collectionName: true,
          },
        },
      },
    });

    return newBook;
  });
}
