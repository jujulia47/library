import type {
  Collection,
  Flag,
  Quote,
  Status,
  Version,
  Serie,
} from "../typings/index";

//GET BOOK
export async function getBooks() {
  const fetchBooks = await fetch(`http://localhost:3333/book`);
  const handleBooks = await fetchBooks.json();
  return handleBooks;
}

//POST BOOKS
export async function postBooks(
  image: String,
  title: String,
  serieName: Serie,
  author: String,
  category: String,
  language: String,
  library: Boolean,
  initDate: String,
  finishDate: String,
  bookStatus: Status,
  rating: String,
  comments: String,
  pages: String,
  bookVersion: Version,
  flags: Flag[],
  quotes: Quote[],
  collections: Collection[]
) {
  await fetch(`http://localhost:3333/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
      rating,
      comments,
      pages,
      flags,
      bookVersion,
      quotes,
      collections,
    }),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
