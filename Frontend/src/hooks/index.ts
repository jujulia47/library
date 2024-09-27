import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/index";
import type { Book, Collection, Flag, Quote, Serie } from "../typings/index";

const useRequest = () => {
  const { setBooks, setSeries, setFlags, setCollections } =
    useContext(GlobalContext);

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

  //POST BOOKS
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
        collections: collections,
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  //POST FLAGS
  async function postFlags(flag: String) {
    await fetch(`http://localhost:3333/flag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flag: flag,
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  //POST COLLECTIONS
  async function postCollection(collection: String) {
    await fetch(`http://localhost:3333/collection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collection: collection,
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  //POST QUOTES
  async function postQuote(quote: String, bookName: String) {
    await fetch(`http://localhost:3333/quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: quote,
        bookName: bookName
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  //POST SERIES
  async function postSerie(
    serieName: String,
    concluded: Boolean,
    abandoned: Boolean
    ) {
    await fetch(`http://localhost:3333/serie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serieName: serieName,
        concluded: concluded,
        abandoned: abandoned
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  //POST WISHLIST
  async function postWishlist(
    bookTitle: String,
    bookImage: String,
    link: String,
    collections: Collection[]    
    ) {
    await fetch(`http://localhost:3333/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookTitle: bookTitle,
        bookImage: bookImage,
        link: link,
        collections: collections    
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  return { postBooks, postFlags, postCollection, postQuote, postSerie, postWishlist };
};

export default useRequest;