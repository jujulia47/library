export async function getQuote() {
  const fetchQuote = await fetch(`http://localhost:3333/quote`);
  const handleQuote = await fetchQuote.json();
  return handleQuote;
}

//POST QUOTES
export async function postQuote(quote: String, page: String, title: String) {
  await fetch(`http://localhost:3333/quote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quote: quote,
      page: page,
      title: title,
    }),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
