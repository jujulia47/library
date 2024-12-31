import Fastify from "fastify";
import cors from "@fastify/cors";

const server = Fastify();

server.register(cors);

//GET
import { GetBook } from "./routes/books/get_books";
import { GetFlag } from "./routes/flags/get_flags";
import { GetSerie } from "./routes/series/get_series";
import { GetQuote } from "./routes/quotes/get_quotes";
import { GetCollections } from "./routes/collections/get_collections";
import { GetWishlist } from "./routes/wishlist/get_wishlist";
import { GetStatus } from "./routes/status/get_status";
import { GetVersion } from "./routes/version/get_version";

//POST
import { PostBook } from "./routes/books/post_books";
import { PostFlag } from "./routes/flags/post_flags";
import { PostSerie } from "./routes/series/post_series";
import { PostQuote } from "./routes/quotes/post_quotes";
import { PostCollection } from "./routes/collections/post_collection";
import { PostWishlist } from "./routes/wishlist/post_wishlist";
import { PostStatus } from "./routes/status/post_status";
import { PostVersion } from "./routes/version/post_version";

//DELETE
import { DeleteBook } from "./routes/books/delete_books";
import { DeleteSerie } from "./routes/series/delete_series";
import { DeleteFlag } from "./routes/flags/delete_flag";
import { DeleteQuote } from "./routes/quotes/delete_quotes";
import { DeleteCollection } from "./routes/collections/delete_collection";
import { DeleteWishlist } from "./routes/wishlist/delete_wishlist";
import { DeleteStatus } from "./routes/status/delete_status";
import { DeleteVersion } from "./routes/version/delete_version";

//PATCH
import { PatchBook } from "./routes/books/patch_books";
import { PatchSerie } from "./routes/series/patch_series";
import { PatchFlag } from "./routes/flags/patch_flag";
import { PatchQuote } from "./routes/quotes/patch_quotes";
import { PatchCollection } from "./routes/collections/patch_collection";
import { PatchWishlist } from "./routes/wishlist/patch_wishlist";
import { PatchStatus } from "./routes/status/patch_status";
import { PatchVersion } from "./routes/version/patch_version";

server.register(GetBook);
server.register(GetFlag);
server.register(GetSerie);
server.register(GetQuote);
server.register(GetCollections);
server.register(GetWishlist);
server.register(GetStatus);
server.register(GetVersion);

server.register(PostBook);
server.register(PostFlag);
server.register(PostSerie);
server.register(PostQuote);
server.register(PostCollection);
server.register(PostWishlist);
server.register(PostStatus);
server.register(PostVersion);

server.register(DeleteBook);
server.register(DeleteSerie);
server.register(DeleteFlag);
server.register(DeleteQuote);
server.register(DeleteCollection);
server.register(DeleteWishlist);
server.register(DeleteStatus);
server.register(DeleteVersion);

server.register(PatchBook);
server.register(PatchSerie);
server.register(PatchFlag);
server.register(PatchQuote);
server.register(PatchCollection);
server.register(PatchWishlist);
server.register(PatchStatus);
server.register(PatchVersion);

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Http Server running");
  })
  .catch((err) => {
    console.error("Error starting server:", err);
  });
