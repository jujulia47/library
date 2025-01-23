//GET FLAG
export async function getFlags() {
  const fetchFlags = await fetch(`http://localhost:3333/flag`);
  const handleFlags = await fetchFlags.json();
  return handleFlags;
}

//POST FLAGS
export async function postFlags(flag: String) {
  await fetch(`http://localhost:3333/flag`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      flag,
    }),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
