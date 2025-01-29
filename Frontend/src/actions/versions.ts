export async function getVersions() {
  const fetchVersion = await fetch("http://localhost:3333/version");
  const handleVersion = await fetchVersion.json();
  return handleVersion;
}

export async function postVersion(bookVersion: string) {
  await fetch("http://localhost:3333/version", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookVersion,
    }),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// export async function UpdateVersion(bookVersion: string) {
//   await fetch(`http://localhost:3333/version/id/${updateVersions}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       bookVersion,
//     }),
//   })
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));
// }
