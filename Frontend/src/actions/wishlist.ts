// import type { Collection } from "../typings/index";

//   //POST WISHLIST
//   async function postWishlist(
//     bookTitle: String,
//     bookImage: String,
//     link: String,
//     collections: Collection[]
//     ) {
//     await fetch(`http://localhost:3333/wishlist`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         bookTitle: bookTitle,
//         bookImage: bookImage,
//         link: link,
//         collections: collections
//       }),
//     })
//       .then((response) => response.json())
//       .then((response) => console.log(response))
//       .catch((err) => console.error(err));
//   }
export {};
