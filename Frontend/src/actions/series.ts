// //GET SERIE
// async function getSeries() {
//   const fetchSeries = await fetch(`http://localhost:3333/serie`);
//   const handleSeries = await fetchSeries.json();
//   // setSeries(handleSeries);
// }

// //POST SERIES
// async function postSerie(
//   serieName: String,
//   concluded: Boolean,
//   abandoned: Boolean
//   ) {
//   await fetch(`http://localhost:3333/serie`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       serieName: serieName,
//       concluded: concluded,
//       abandoned: abandoned
//     }),
//   })
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));
// }
export {};
