import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function PatchBook(server: FastifyInstance) {
  server.patch("/book/id/:id", async (request, reply) => {
    const idParam = z.object({
      id: z.string().uuid(),
    });

    const patchBody = z.object({
      image: z.string().optional().nullable(),
      title: z.string(),
      serieName: z.string().optional(),
      author: z.string().optional().nullable(),
      category: z.string().optional().nullable(),
      language: z.string().optional().nullable(),
      library: z.boolean().optional(),
      initDate: z.string().optional().nullable(),
      finishDate: z.string().optional().nullable(),
      bookStatus: z.string(),
      rating: z.string().optional().nullable(),
      comments: z.string().optional().nullable(),
      pages: z.number().optional().default(0),
      bookVersion: z.string(),
      flags: z.array(z.string()).optional().default([]),
      collections: z.array(z.string()).optional().default([]),
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
      collections,
    } = patchBody.parse(request.body);    

    const filteredFlags = flags.filter((flag) => flag.trim() !== "");
    const findFlags = await prisma.flagsArray.findMany({
      where: {
        flag: { in: filteredFlags },
      },
    });
    if (filteredFlags.length > findFlags.length) {
      const notFoundFlags = filteredFlags.filter(
        (flag) => !findFlags.some((found) => found.flag === flag)
      );
      return reply.status(400).send({
        error: `As seguintes flags não foram encontradas: ${notFoundFlags.join(", ")}`,
      });
    }
    const flagIds = findFlags.map((flag) => ({ id: flag.id }));

    const findCollection = await prisma.collectionArray.findMany({
      where: {
        collectionName: { in: collections },
      },
    });
    let CollectionIds = findCollection.map((collection) => ({
      id: collection.id,
    }));
    if (collections.length === 0 || (collections.length === 0 && collections[0] === "")) {
      CollectionIds = [];
    }

    let serieConnect = {};
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
      serieConnect = { connect: { id: findSerie.id } };
    } else {
      serieConnect = { disconnect: true };
    }

    let statusConnect = {};
    if (bookStatus) {
      const findStatus = await prisma.status.findFirst({
        where: {
          bookStatus: bookStatus,
        },
      });
      if (!findStatus) {
        return {
          error: "O status não foi encontrado.",
        };
      }
      statusConnect = { connect: { id: findStatus.id } };
    } else {
      statusConnect = { disconnect: true };
    }

    let versionConnect = {};
    if (bookVersion) {
      const findVersion = await prisma.version.findFirst({
        where: {
          bookVersion: bookVersion,
        },
      });
      if (!findVersion) {
        return {
          error: "A versão não foi encontrada.",
        };
      }
      versionConnect = { connect: { id: findVersion.id } };
    } else {
      versionConnect = { disconnect: true };
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
    return UpdateBook;
  });
}
