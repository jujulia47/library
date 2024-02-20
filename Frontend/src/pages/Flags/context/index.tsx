import React, { createContext, useState, useEffect } from "react";

interface Flag {
  id: string;
  flag: string;
  created_at: string;
}

export const FLagGlobalContext = createContext(
  {} as {
    flags: Flag[];
    setFlags: any;
  }
);

export const GlobalStorageFlag = ({ children }: any) => {
  const [flags, setFlags] = useState([
    {
        id: "",
        flag: "",
        created_at: "",
    },
  ]);

  //GET
  async function getFlags() {
    const fetchFlags = await fetch(`http://localhost:3333/flag`);
    const handleFlags = await fetchFlags.json();
    setFlags(handleFlags);
  }
  useEffect(() => {
    getFlags();
  }, []);

  return (
    <FLagGlobalContext.Provider
      value={{
        flags,
        setFlags,
      }}
    >
      {children}
    </FLagGlobalContext.Provider>
  );
};
