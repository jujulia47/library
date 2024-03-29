import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function GetBook(server: FastifyInstance) {
  //------------------ GET------------------
  server.get("/book", async () => {
    const getBooks = await prisma.book.findMany({
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
    return getBooks;
  });

  //Ex: PDP
  server.get("/book/:id", async (request) => {
    const idParam = z.object({
      id: z.string(),
    });

    const { id } = idParam.parse(request.params);

    const getBooksId = prisma.book.findFirst({
      where: {
        title: id,
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
    return getBooksId;
  });

  //------------------ POST------------------

  // server.post('/user', async (request) => {
  //     // Cria um objeto Zod para definir o esquema de dados do frontend
  //     const userBody = z.object({
  //         name: z.string(),
  //         email: z.string().email(),
  //         password: z.string(),
  //         isAdmin: z.boolean()
  //     });

  //     // Recupera os dados do frontend
  //     const { name, email, password, isAdmin} = userBody.parse(request.body);

  //     // Verifica se o e-mail já está em uso
  //     const existingUser = await prisma.user.findFirst({
  //         where: {
  //             email: email
  //         }
  //     });

  //     if (existingUser) {
  //         // E-mail já em uso, retornar uma resposta de erro
  //         return {
  //             error: 'E-mail já cadastrado'
  //         };
  //     } else {
  //         // Insere o usuário no banco de dados
  //         const newUser = await prisma.user.create({
  //             data: {
  //                 name: name,
  //                 email: email,
  //                 password: password,
  //                 isAdmin: isAdmin,
  //                 created_at: new Date()
  //             }
  //         });
  //         return newUser;
  //     }
  // });

  //------------------ PUT------------------

  // rota para editar um cadastro
  // server.put('/user/id/:id', async (request) => {
  //     // objeto zod para o id
  //     const idParam = z.object({
  //         id: z.string().uuid()
  //     })
  //     // objeto zod para o body
  //     const putBody = z.object({
  //         name: z.string(),
  //         email: z.string(),
  //         password: z.string(),
  //         isAdmin: z.boolean()
  //     })
  //     // recupera dados do frontend com o params
  //     const {id} = idParam.parse(request.params)
  //     // recupera dados do frontend com o body
  //     const {name, email, password, isAdmin} = putBody.parse(request.body)
  //     // atualiza o cadastro no banco de dados
  //     const userUpdated = await prisma.user.update({
  //         where: {
  //             id: id
  //         },
  //         data: {
  //             name,
  //             email,
  //             password,
  //             isAdmin
  //         }
  //     })
  //     return userUpdated
  // })

  //DELETE

  // rota para remover um cadastro
  // server.delete('/user/id/:id', async (request) => {
  //     // objeto zod para o id
  //     const idParam = z.object({
  //         id: z.string().uuid()
  //     })
  //     // recupera dados do frontend com o params
  //     const {id} = idParam.parse(request.params)
  //     // remove do banco de dados
  //     const userRemoved = await prisma.user.delete({
  //         where: {
  //             id
  //         }
  //     })
  //     return userRemoved
  // })
}
