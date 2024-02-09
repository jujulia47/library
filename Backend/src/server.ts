import Fastify from 'fastify'

const server = Fastify()

import cors from '@fastify/cors'
import { Book } from './routes/routes_books'


server.register(Book)
// server.register(AppProduct)
server.register(cors)

server.listen({
    port: 3333,
})
.then( () => {
    console.log('Http Server running')
})



