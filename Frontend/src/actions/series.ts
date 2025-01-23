import type { Book, Flag, Status, Wishlist } from "../typings/index";

//GET SERIE
export async function getSeries() {
  const fetchSeries = await fetch(`http://localhost:3333/serie`);
  const handleSeries = await fetchSeries.json();
  return handleSeries;
}

//POST SERIES
export async function postSerie(
  serieName: String,
  author: String,
  rating: String,
  initDate: String,
  finishDate: String,
  comments: String,
  books: Book[],
  flags: Flag[],
  bookStatus: Status,
  wishlist: Wishlist[]
) {
  await fetch(`http://localhost:3333/serie`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      serieName,
      author,
      rating,
      initDate,
      finishDate,
      comments,
      books,
      flags,
      bookStatus,
      wishlist,
    }),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
