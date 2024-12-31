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
      initDate: z.string().nullable(),
      finishDate: z.string().nullable(),
      bookStatus: z.string().nullable(),
      rating: z.string(),
      comments: z.string().nullable(),
      pages: z.number(),
      bookVersion: z.string().nullable(),
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
      bookStatus,
      rating,
      comments,
      pages,
      bookVersion,
      flags,
      quotes,
      collections,
    } = postBook.parse(request.body);

    let createdFlags = [];
    let createdCollection = [];

    let serieConnect = {};
    let statusConnect  = {};
    let versionConnect  = {};
 
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

    if (statusConnect || bookVersion || serieName) {

      const findStatus = bookStatus
        ? await prisma.status.findFirst({
            where: { bookStatus: bookStatus },
          })
        : null;
    
      const findVersion = bookVersion
        ? await prisma.version.findFirst({
            where: { bookVersion: bookVersion },
          })
        : null;
    
      const findSerie = serieName
        ? await prisma.serie.findFirst({
            where: { serieName: serieName },
          })
        : null;
    
      if (!findStatus || !findVersion) {
        return { error: "A situação ou versão do livro não foi encontrada." };
      }
    
      let serieConnect;
      if (!findSerie && serieName) {
        const newSerie = await prisma.serie.create({
          data: {
            serieName,
            author,
            status: { connect: { id: findStatus.id } },
            created_at: new Date(),
          },
        });
        serieConnect = { connect: { id: newSerie.id } };
      } else if (findSerie) {
        serieConnect = { connect: { id: findSerie.id } };
      }
    
      serieConnect = { connect: { id: findStatus.id } };
      versionConnect = { connect: { id: findVersion.id } };
    
      return {
        statusConnect,
        versionConnect,
        serieConnect,
      };
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
        status: statusConnect,
        rating: rating,
        comments,
        pages,
        version: versionConnect,
        flags: {
          connect: createdFlags.map((flag) => ({
            id: flag.id,
          })),
        },
        quotes: {
          create: quotes
            .filter((quote) => quote.trim() !== "")
            .map((quote, page) => ({
              quote,
              page,
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
        version: true,
        status: true
      },
    });
    return newBook;
  });
}
