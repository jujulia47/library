// //GET COLLECTION
// async function getCollections() {
//   const fetchCollection = await fetch(`http://localhost:3333/collection`);
//   const handleCollection = await fetchCollection.json();
//   // setCollections(handleCollection);
// }

//   //POST COLLECTIONS
//   async function postCollection(collection: String) {
//     await fetch(`http://localhost:3333/collection`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         collection: collection,
//       }),
//     })
//       .then((response) => response.json())
//       .then((response) => console.log(response))
//       .catch((err) => console.error(err));
//   }
export {};
