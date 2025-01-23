import type { Collection, Serie } from "../typings/index";

export async function getWishlist() {
  const fetchWishlist = await fetch(`http://localhost:3333/wishlist`);
  const handleWishlist = await fetchWishlist.json();
  return handleWishlist;
}

//POST WISHLIST
export async function postWishlist(
  bookTitle: String,
  bookImage: String,
  link: String,
  collections: Collection[],
  serieName: Serie
) {
  await fetch(`http://localhost:3333/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookTitle,
      bookImage,
      link,
      collections,
      serieName,
    }),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
