// //POST QUOTES
// async function postQuote(quote: String, bookName: String) {
//   await fetch(`http://localhost:3333/quote`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       quote: quote,
//       bookName: bookName
//     }),
//   })
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));
// }
export {};
