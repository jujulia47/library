import React, { createContext, useState, useEffect } from "react";

interface Book {
  title: string;
  author: string;
  image: string;
  category: string;
  rating: string;
  flags: String[];
}

export const GlobalContext = createContext(
  {} as {
    books: Book[];
    postBooks: any;
    setBooks: any;
  }
);

export const GlobalStorage = ({ children }: any) => {
  const [books, setBooks] = useState([
    {
      title: "",
      author: "",
      image: "",
      category: "",
      rating: "",
      flags: [],
    },
  ]);

  //GET
  async function getBooks() {
    const fetchBooks = await fetch(`http://localhost:3333/book`);
    const handleBooks = await fetchBooks.json();
    setBooks(handleBooks);
    console.log("Livros", handleBooks);
  }
  useEffect(() => {
    getBooks();
  }, []);

  //POST

  //dessa forma a requisão não vai de primeira pro banco
  //funciona, mas por algum motivo não atualiza o banco de primeira 
  // revisar a flag, está com erro
  async function postBooks(
    title: string,
    author: string,
    image: string,
    category: string,
    rating: string,
    flags: String[]
  ) {
    await fetch(`http://localhost:3333/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //Corpo (body) => contém os dados que serão enviandos para o servidor.
      //No contexto de uma requisição POST para cadastrar um livro em um banco de dados,
      //o corpo da requisição é onde se coloca os detalhes do livro que deseja enviar para a API.
      body: JSON.stringify({
        "title": title,
        "author": author,
        "image": image,
        "category": category,
        "rating": rating,
        "flags": flags,
      }),
    });
    console.log('lalalalalalalalalala');
  }

  return (
    <GlobalContext.Provider
      value={{
        books,
        setBooks,
        postBooks
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
