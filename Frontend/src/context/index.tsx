import React, { createContext, useState, ReactNode } from 'react';
import type { Book, Collection, Flag, Serie, Version } from '../typings/index';

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
