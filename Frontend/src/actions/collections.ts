//GET COLLECTION
export async function getCollections() {
  const fetchCollection = await fetch(`http://localhost:3333/collection`);
  const handleCollection = await fetchCollection.json();
  return handleCollection;
}

//POST COLLECTIONS
export async function postCollection(
  collectionName: String,
  initDate: string,
  finishDate: string,
  comments: string,
  title: string,
  bookTitle: string
) {
  await fetch(`http://localhost:3333/collection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionName,
      initDate,
      finishDate,
      comments,
      title,
      bookTitle,
    }),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
