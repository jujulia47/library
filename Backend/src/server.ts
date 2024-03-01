import Fastify from 'fastify'
import cors from '@fastify/cors'

const server = Fastify()

server.register(cors)

import { GetBook } from './routes/books/get_books'
import { GetFlag } from './routes/flags/get_flags'
import { GetSerie } from './routes/series/get_series'
import { GetQuote } from './routes/quotes/get_quotes'
import { GetColections } from './routes/colections/get_colections'
import { GetWishlist } from './routes/wishlist/get_wishlist'

import { PostBook } from './routes/books/post_books'
import { PostFlag } from './routes/flags/post_flags'
import { PostSerie } from './routes/series/post_series'
import { PostQuote } from './routes/quotes/post_quotes'
import { PostColection } from './routes/colections/post_colection'
import { PostWishlist } from './routes/wishlist/post_wishlist'


server.register(GetBook)
server.register(GetFlag)
server.register(GetSerie)
server.register(GetQuote)
server.register(GetColections)
server.register(GetWishlist)

server.register(PostBook)
server.register(PostFlag)
server.register(PostSerie)
server.register(PostQuote)
server.register(PostColection)
server.register(PostWishlist)

server.listen({
    port: 3333,
})
.then(() => {
    console.log('Http Server running')
})
.catch((err) => {
    console.error('Error starting server:', err)
})
