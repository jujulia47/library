import React, { createContext, useState, ReactNode, useEffect } from "react";
import type {
  Book,
  Collection,
  Flag,
  Serie,
  Version,
  Status,
  Quote,
  Wishlist,
} from "../typings/index";
import { getFlags } from "../actions/flags";
import { getBooks } from "../actions/books";
import { getVersions } from "../actions/versions";
import { getStatus } from "../actions/status";
import { getQuote } from "../actions/quotes";
import { getWishlist } from "../actions/wishlist";
import { getCollections } from "../actions/collections";
import { getSeries } from "../actions/series";

// Definindo o formato do contexto
type GlobalContextType = {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  series: Serie[];
  setSeries: React.Dispatch<React.SetStateAction<Serie[]>>;
  collections: Collection[];
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
  flags: Flag[];
  setFlags: React.Dispatch<React.SetStateAction<Flag[]>>;
  versions: Version[];
  setVersions: React.Dispatch<React.SetStateAction<Version[]>>;
  updateVersions: Version[];
  setUpdateVersions: React.Dispatch<React.SetStateAction<Version[]>>;
  deleteVersions: Version[];
  setDeleteVersions: React.Dispatch<React.SetStateAction<Version[]>>;
  status: Status[];
  setStatus: React.Dispatch<React.SetStateAction<Status[]>>;
  quote: Quote[];
  setQuote: React.Dispatch<React.SetStateAction<Quote[]>>;
  wishlist: Wishlist[];
  setWishlist: React.Dispatch<React.SetStateAction<Wishlist[]>>;
};

// Criando o contexto com o formato correto
export const GlobalContext = createContext({} as GlobalContextType);

// Provider do contexto
export const GlobalStorage = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [series, setSeries] = useState<Serie[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [flags, setFlags] = useState<Flag[]>([]);
  const [versions, setVersions] = useState<Version[]>([]);
  const [updateVersions, setUpdateVersions] = useState<Version[]>([]);
  const [deleteVersions, setDeleteVersions] = useState<Version[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [quote, setQuote] = useState<Quote[]>([]);
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);

  //Get Livros
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };
    fetchBooks();
  }, [setBooks]);

  // Buscar as flags quando o componente for montado
  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const fetchedFlags = await getFlags(); // Chama a função que faz o GET
        setFlags(fetchedFlags); // Atualiza o estado do contexto
      } catch (error) {
        console.error("Erro ao buscar flags:", error);
      }
    };
    fetchFlags();
  }, [setFlags]);

  //Get Versão
  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const fetchedVersions: any = await getVersions();
        setVersions(fetchedVersions);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };
    fetchVersions();
  }, [setVersions]);

  //Get Status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const fetchedStatus: any = await getStatus();
        setStatus(fetchedStatus);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };
    fetchStatus();
  }, [setStatus]);

  //Get Quotes
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const fetchedQuote: any = await getQuote();
        setQuote(fetchedQuote);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };
    fetchQuote();
  }, [setQuote]);

  //Get Wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const fetchedWishlist: any = await getWishlist();
        setWishlist(fetchedWishlist);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };
    fetchWishlist();
  }, [setWishlist]);

  //Get Collection
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const fetchedCollection: any = await getCollections();
        setCollections(fetchedCollection);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };
    fetchCollection();
  }, [setCollections]);

  //Get Series
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const fetchedSeries: any = await getSeries();
        setSeries(fetchedSeries);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };
    fetchSeries();
  }, [setSeries]);

  return (
    <GlobalContext.Provider
      value={{
        books,
        setBooks,
        series,
        setSeries,
        collections,
        setCollections,
        flags,
        setFlags,
        versions,
        setVersions,
        updateVersions,
        setUpdateVersions,
        deleteVersions,
        setDeleteVersions,
        status,
        setStatus,
        quote,
        setQuote,
        wishlist,
        setWishlist,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
