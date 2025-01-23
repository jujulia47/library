import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PostBook(server: FastifyInstance) {
  //------------------ POST------------------

  server.post("/book", async (request) => {
    const postBook = z.object({
      image: z.string().optional().nullable(),
      title: z.string(),
      serieName: z.string().optional().nullable(),
      author: z.string().optional().nullable(),
      category: z.string().optional().nullable(),
      language: z.string().optional().nullable(),
      library: z.boolean().optional(),
      initDate: z.string().optional().nullable(),
      finishDate: z.string().optional().nullable(),
      bookStatus: z.string(),
      rating: z.string().optional().nullable(),
      comments: z.string().optional().nullable(),
      pages: z.string().optional(),
      bookVersion: z.string(),
      flags: z.array(z.string()).optional().default([]),
      quotes: z.array(z.string()).optional(),
      collections: z.array(z.string()).optional(),
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

    let serieConnect = {};
 
    let createdFlags = [];
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

    let createdCollection = [];
    if(collections){
      for (const collection of collections) {
        const findCollection = await prisma.collectionArray.findFirst({
          where: {
            collectionName: collection,
          },
        });
  
        if (findCollection) {
          createdCollection.push(findCollection);
        } else {
          const newCollectionItem = await prisma.collectionArray.create({
            data: {
              collectionName: collection,
              created_at: new Date(),
            },
          });
          createdCollection.push(newCollectionItem);
        }
      }
    }

    let createdQuotes = [];
    if(quotes){
      for (const quote of quotes) {
        const findQuote = await prisma.quotesArray.findFirst({
          where: {
            quote: quote,
          },
        });
  
        if (findQuote) {
          createdQuotes.push(findQuote);
        } else {
          const newQuote = await prisma.quotesArray.create({
            data: {
              quote: quote,
              created_at: new Date(),
            },
          });
          createdQuotes.push(newQuote);
        }
      }
    }

    let statusConnect = {};
    if (bookStatus) {
      const foundStatus = await prisma.status.findFirst({
        where: { bookStatus: bookStatus },
      });
      if (!foundStatus) {
        return { error: "A situação do livro não foi encontrada." };
      }
      statusConnect = { connect: { id: foundStatus.id } };
    } 

    let versionConnect = {};
    if (bookVersion) {
      const foundVersion = await prisma.version.findFirst({
        where: { bookVersion: bookVersion },
      });
      if (!foundVersion) {
        return { error: "A situação do livro não foi encontrada." };
      }
      versionConnect = { connect: { id: foundVersion.id } };
    } 

    if (serieName) {    
      const findSerie = await prisma.serie.findFirst({
        where: { serieName: serieName },
      });
      if (!findSerie) {
        const newSerie = await prisma.serie.create({
          data: {
            serieName,
            created_at: new Date(),
          },
        });
        serieConnect = { connect: { id: newSerie.id } };
      }
      serieConnect = { connect: { id: findSerie?.id } };   
    }
    
    const newBook = await prisma.book.create({
      data: {
        image,
        title,
        serie: serieConnect,
        author,
        category,
        language,
        library,
        initDate,
        finishDate,
        status: statusConnect,
        rating,
        comments,
        pages,
        version: versionConnect,
        flags: {
          connect: createdFlags.map((flag) => ({
            id: flag.id,
          })),
        },
        quotes: {
          connect: createdQuotes.map((quote) => ({
            id: quote.id,
          })),
        },
        collection: {
          connect: createdCollection.map((collection) => ({
            id: collection.id,
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
