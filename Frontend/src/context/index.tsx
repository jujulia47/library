import React, { createContext, useState } from "react";
import type { Book, Collection, Flag, Serie } from "../typings/index";

export const GlobalContext = createContext(
  {} as {
    books: Book[];
    setBooks: any;
    series: Serie[];
    setSeries: any;
    collections: Collection[];
    setCollections: any;
    flags: Flag[];
    setFlags: any;
  }
);

export const GlobalStorage = ({ children }: any) => {
  // const [loading, setloading] = useState({
  //   title: "",
  //   author: "",
  //   image: "",
  //   category: "",
  //   rating: "",
  //   flags: [],
  // });

  const [clear, setClear] = useState("")

  const [books, setBooks] = useState([
    {
      image: "",
      title: "",
      serieName: "",
      author: "",
      category: "",
      language: "",
      library: false,
      initDate: "",
      finishDate: "",
      finish: false,
      rating: "",
      flags: [],
      quotes: [],
      collections: [],
    },
  ]);

  const [series, setSeries] = useState([
    {
      serieName: "",
      concluded: false,
      abandoned: false,
    },
  ]);

  const [collections, setCollections] = useState([{ collectionName: "" }]);
  const [flags, setFlags] = useState([{ flag: "" }]);

  return (
    <GlobalContext.Provider
      value={{
        books,
        setBooks,
        series,
        setSeries,
        flags,
        setFlags,
        collections,
        setCollections,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
