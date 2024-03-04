import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

//----------REGRAS-----------------
//SÉRIES => tabela independente, será editada de forma separada
// O que pode ser altado em Livro em relação a série é o seu nome, pois as vezes cadastrou a série errada no livro, então pode editar no livro a série para colocar a correta.
// mas a situação da série (concluída ou abandonada) é particular dela mesmo não podendo ser altarada na edição do livro.
// Então precisa pegar o ID das séries que já existem, pois é o ID (mesmo passando o nome no front) que será alterado na tebela de livros (serieID)

//FLAGS => Em livros só pode editar caso tenha colocado uma flag errada e seria outra (que já exista, então na parte de edição do livro só vai aparecer o select com as flags que existe).
// Não pode criar uma nova flag quando for editar um livro.
// Se for adicionar uma nova flag que não existe, precisa criar ela primeiro na página de cadastro de flags, e então editar o livro e adicionar a nova flag.
// Ou quando for criar a nova flag, já aparecer os livro que existem no banco e já vincular?

//COLECTIONS => Mesma regra da flag e serie

//QUOTES => Editado apenas na página do Livro, onde as citaçãoes são cadastradas. Não pode ser editava na mesma página que edita o livro em si

//OUTRAS REGRAS
// Não pode ter flag duplicada no mesmo livro

export async function PatchBook(server: FastifyInstance) {
  // rota para editar um cadastro
  server.patch("/book/id/:id", async (request) => {
    // objeto zod para o id
    const idParam = z.object({
      id: z.string().uuid(),
    });
    // objeto zod para o body
    const putBody = z.object({
      image: z.string(),
      title: z.string(),
      serie: z.object({
        serieName: z.string(),
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
      colection: z.array(z.string()),
    });

    const { id } = idParam.parse(request.params);

    const {
      image,
      title,
      serie: { serieName },
      author,
      category,
      language,
      library,
      initDate,
      finishDate,
      finish,
      rating,
      flags,
      colection,
    } = putBody.parse(request.body);

    const existingSerie = await prisma.serie.findFirst({
      where: {
        serieName: serieName,
      },
    });

    const existingFlags = await prisma.flagsArray.findMany({
      where: {
        flag: { in: flags },
      },
    });

    const existingColections = await prisma.colectionArray.findMany({
      where: {
        colection: { in: colection },
      },
    });

    const flagIds = existingFlags.map((flag) => ({ id: flag.id }));
    const ColectionIds = existingColections.map((colection) => ({ id: colection.id }));

    
    if (!existingSerie || existingFlags.length === 0 || existingColections.length === 0) {
      throw new Error("Série, Flag ou Coleção não encontrada");
    }

    const userUpdated = await prisma.book.update({
      where: {
        id: id,
      },
      data: {
        image,
        title,
        serie: {
          connect: {
            id: existingSerie.id,
          },
        },
        author,
        category,
        language,
        library,
        initDate,
        finishDate,
        finish,
        rating,
        flags: {
          set: flagIds, // Define todas as flags do livro com as flags encontradas no banco
        },
        colection: {
          set: ColectionIds, // Define todas as coleções do livro com as coleções encontradas no banco
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
        colection: {
          select: {
            colection: true,
          },
        },
      },
    });
    return userUpdated;
  });
}
