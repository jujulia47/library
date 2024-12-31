import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchBook(server: FastifyInstance) {
  server.patch("/book/id/:id", async (request) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });

    const patchBody = z.object({
      image: z.string(),
      title: z.string(),
      serieName: z.string().nullable(),
      author: z.string(),
      category: z.string(),
      language: z.string(),
      library: z.boolean(),
      initDate: z.date(),
      finishDate: z.date(),
      bookStatus: z.string().nullable(),
      rating: z.string(),
      comments: z.string(),
      pages: z.number(),
      bookVersion: z.string().nullable(),
      flags: z.array(z.string()),
      collection: z.array(z.string()),
    });

    const { id } = idParam.parse(request.params);

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
      comments,
      pages,
      bookVersion,
      rating,
      flags,
      collection,
    } = patchBody.parse(request.body);

    const findFlags = await prisma.flagsArray.findMany({
      where: {
        flag: { in: flags },
      },
    });
    let flagIds = findFlags.map((flag) => ({ id: flag.id }));
    if (flags.length === 0 || (flags.length === 0 && flags[0] === "")) {
      flagIds = [];
    }

    const findCollections = await prisma.collectionArray.findMany({
      where: {
        collectionName: { in: collection },
      },
    });
    let CollectionIds = findCollections.map((collection) => ({
      id: collection.id,
    }));
    if (
      collection.length === 0 ||
      (collection.length === 0 && collection[0] === "")
    ) {
      CollectionIds = [];
    }

    let serieConnect = {};
    let statusConnect = {};
    let versionConnect = {};

    if (serieName || statusConnect || bookVersion) {
      const findSerie = await prisma.serie.findFirst({
        where: {
          serieName: serieName,
        },
      });

      const findBookStatus = await prisma.status.findFirst({
        where: {
          bookStatus: bookStatus,
        },
      });

      const findBookVersion = await prisma.version.findFirst({
        where: {
          bookVersion: bookVersion,
        },
      });

      if (!findSerie || !findBookStatus || !findBookVersion) {
        return {
          error: "A série, a situação ou a versão do livro não foi encontrada.",
        };
      }
      serieConnect = { connect: { id: findSerie.id } };
      statusConnect = { connect: { id: findBookStatus.id } };
      versionConnect = { connect: { id: findBookVersion.id } };
      
    } else {
      serieConnect = { disconnect: true };
      statusConnect = { disconnect: true}
      versionConnect = { disconnect: true}
    }

    const UpdateBook = await prisma.book.update({
      where: {
        id: id,
      },
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
        comments,
        pages,
        version: versionConnect,
        rating,
        flags: {
          set: flagIds,
        },
        collection: {
          set: CollectionIds,
        },
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
        collection: {
          select: {
            collectionName: true,
          },
        },
        status: {
          select: {
            bookStatus: true,
          }
        },
        version: {
          select: {
            bookVersion: true
          }
        }
      },
    });
    return UpdateBook;
  });
}
