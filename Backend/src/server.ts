import Fastify from 'fastify'
import cors from '@fastify/cors'

const server = Fastify()

server.register(cors)

import { GetBook } from './routes/books/get_books'
import { GetFlag } from './routes/flags/get_flags'
import { PostBook } from './routes/books/post_books'
import { PostFlag } from './routes/flags/post_flags'

server.register(GetBook)
server.register(GetFlag)
server.register(PostBook)
server.register(PostFlag)

server.listen({
    port: 3333,
})
.then(() => {
    console.log('Http Server running')
})
.catch((err) => {
    console.error('Error starting server:', err)
})
