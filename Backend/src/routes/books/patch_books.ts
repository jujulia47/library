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
      initDate: z.string(),
      finishDate: z.string(),
      finish: z.boolean(),
      rating: z.string(),
      flags: z.array(z.string()),
      collections: z.array(z.string()),
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
      finish,
      rating,
      flags,
      collections,
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
        collectionName: { in: collections },
      },
    });
    let CollectionIds = findCollections.map((collection) => ({
      id: collection.id,
    }));
    if (
      collections.length === 0 ||
      (collections.length === 0 && collections[0] === "")
    ) {
      CollectionIds = [];
    }

    let serieConnect = null;

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
        finish,
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
      },
    });
    return UpdateBook;
  });
}
