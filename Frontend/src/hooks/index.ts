import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/index";
import type { Book, Collection, Flag, Quote, Serie } from "../typings/index";

const useRequest = () => {
  const { setBooks, setSeries, setFlags, setCollections} = useContext(GlobalContext);

  //GET BOOK
  async function getBooks() {
    const fetchBooks = await fetch(`http://localhost:3333/book`);
    const handleBooks = await fetchBooks.json();
    setBooks(handleBooks);
  }
  //GET SERIE
  async function getSeries() {
    const fetchSeries = await fetch(`http://localhost:3333/serie`);
    const handleSeries = await fetchSeries.json();
    setSeries(handleSeries);
  }
  //GET COLLECTION
  async function getCollections() {
    const fetchCollection = await fetch(`http://localhost:3333/collection`);
    const handleCollection = await fetchCollection.json();
    setCollections(handleCollection);
  }
  //GET FLAG
  async function getFlags() {
    const fetchFlags = await fetch(`http://localhost:3333/flag`);
    const handleFlags = await fetchFlags.json();
    setFlags(handleFlags);
  }

  useEffect(() => {
    getBooks();
    getSeries();
    getFlags();
    getCollections();
  }, []);

  //POST
  async function postBooks(
    image: String,
    title: String,
    serieName: String,
    author: String,
    category: String,
    language: String,
    library: Boolean,
    initDate: String,
    finishDate: String,
    finish: Boolean,
    rating: String,
    flags: Flag[],
    quotes: Quote[],
    collections: Collection[]
  ) {
    await fetch(`http://localhost:3333/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image,
        title: title,
        serieName: serieName,
        author: author,
        category: category,
        language: language,
        library: library,
        initDate: initDate,
        finishDate: finishDate,
        finish: finish,
        rating: rating,
        flags: flags,
        quotes: [quotes],
        collections: collections, //Se passar entre conchetes aparece esse erro
        // "[
        //   {
        //     "code": "invalid_type",
        //     "expected": "string",
        //     "received": "array",
        //     "path": [
        //       "collections",
        //       0
        //     ],
        //     "message": "Expected string, received array"
        //   }
        // ]"
        //Então, passar o valor em um array, espera-se uma string apenas, e não um array
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  return { postBooks };
};

export default useRequest;
