// import type { Collection, Flag, Quote } from '../typings/index';

// //GET BOOK
// async function getBooks() {
//   const fetchBooks = await fetch(`http://localhost:3333/book`);
//   const handleBooks = await fetchBooks.json();
//   // setBooks(handleBooks);
// }

// //POST BOOKS
// async function postBooks(
//   image: String,
//   title: String,
//   serieName: String,
//   author: String,
//   category: String,
//   language: String,
//   library: Boolean,
//   initDate: String,
//   finishDate: String,
//   finish: Boolean,
//   rating: String,
//   flags: Flag[],
//   quotes: Quote[],
//   collections: Collection[],
// ) {
//   await fetch(`http://localhost:3333/book`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       image: image,
//       title: title,
//       serieName: serieName,
//       author: author,
//       category: category,
//       language: language,
//       library: library,
//       initDate: initDate,
//       finishDate: finishDate,
//       finish: finish,
//       rating: rating,
//       flags: flags,
//       quotes: [quotes],
//       collections: collections,
//     }),
//   })
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));
// }
export {};
