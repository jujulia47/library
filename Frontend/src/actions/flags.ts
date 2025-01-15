// //GET FLAG
// async function getFlags() {
//   const fetchFlags = await fetch(`http://localhost:3333/flag`);
//   const handleFlags = await fetchFlags.json();
//   // setFlags(handleFlags);
// }

//   //POST FLAGS
//   async function postFlags(flag: String) {
//     await fetch(`http://localhost:3333/flag`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         flag: flag,
//       }),
//     })
//       .then((response) => response.json())
//       .then((response) => console.log(response))
//       .catch((err) => console.error(err));
//   }
export {};
