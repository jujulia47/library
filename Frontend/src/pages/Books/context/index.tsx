import React, { createContext, useState, useEffect } from "react";

interface Flag {
  id: string;
  flag: string;
  created_at: string;
}

interface Quote {
  id:           String 
  quote:         String 
  quoteId:       String
  created_at:    String
}

interface Book {
  title: String;
  author: String;
  category: String;
  language: String;
  library: Boolean;
  finish: Boolean;
  finishDate: String;
  image: string;
  rating: String;
  flags: Flag[];
  quotes: Quote[]
}

export const GlobalContext = createContext(
  {} as {
    books: Book[];
    postBooks: any;
    setBooks: any;
    getBooks: any
  }
);

export const GlobalStorage = ({ children }: any) => {
  const [books, setBooks] = useState([
    {
      title: "",
      author: "",
      category: "",
      language: "",
      library: false,
      finish: false,
      finishDate: "",
      image: "",
      rating: "",
      flags: [],
      quotes: []
    },
  ]);

  //GET
  async function getBooks() {
    const fetchBooks = await fetch(`http://localhost:3333/book`);
    const handleBooks = await fetchBooks.json();
    setBooks(handleBooks);
  }
  useEffect(() => {
    getBooks();
  }, []);

  //POST
  async function postBooks(
    title: String,
    author: String,
    category: String,
    language: String,
    library: Boolean,
    finish: Boolean,
    finishDate: String,
    image: String,
    rating: String,
    flags: Flag[],
    quotes: Quote[]
  ) {
    await fetch(`http://localhost:3333/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "title": title,
        "author": author,
        "category": category,
        "language": language,
        "library": library,
        "finish": finish,
        "finishDate": finishDate,
        "image": image,
        "rating": rating,
        "flags": flags,
        "quotes": [quotes]
      }),
    });
  }
  
  return (
    <GlobalContext.Provider
      value={{
        books,
        setBooks,
        postBooks,
        getBooks
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
