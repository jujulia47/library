//GET STATUS
export async function getStatus() {
  const fetchStatus = await fetch(`http://localhost:3333/status`);
  const handleStatus = await fetchStatus.json();
  return handleStatus;
}

//POST STATUS
export async function postStatus(bookStatus: String) {
  await fetch(`http://localhost:3333/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookStatus,
    }),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
