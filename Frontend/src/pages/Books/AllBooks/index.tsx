// import React, { useContext } from 'react'
import React, { useEffect } from "react";
import { useGlobalContext } from "../../../hooks/index";

function Teste() {
  const { flags, wishlist } = useGlobalContext();

  //   return books.length ? (
  //     <>
  //       <div>{books && books?.map((title, index) => {
  //           return(
  //             <p key={index}>{title.title}</p>
  //           )}
  //       )}
  //       </div>
  //       <div>{books && books?.map((flags, index) => {
  //           return(
  //             <p key={index}>{flags?.flags?.map((flag, index) =>{
  //               return(
  //                 <p key={index}>{flag.flag}</p>
  //               )
  //             })}</p>
  //           )}
  //       )}
  //       </div>
  //       <div>{books && books?.map((quotes, index) => {
  //           return(
  //             <p key={index}>{quotes?.quotes?.map((quote, index) =>{
  //               return(
  //                 <p key={index}>{quote.quote}</p>
  //               )
  //             })}</p>
  //           )}
  //       )}
  //       </div>
  //     </>
  //   ) : (
  //     <p>Nenhum livro no banco de dados</p>
  //   )
  return (
    <>
      <h1>Teste</h1>
      <div>
        <h1>Flags</h1>
        {flags.length > 0 ? (
          flags.map((flag, index) => <p key={index}>{flag.flag}</p>)
        ) : (
          <p>Carregando ou nenhuma flag encontrada...</p>
        )}
      </div>

      <div>
        <h1>Flags</h1>
        {wishlist.length > 0 ? (
          wishlist.map((bookTitle, index) => {
            console.log("bookTitle", bookTitle);

            return <></>;
          })
        ) : (
          <p>Carregando ou nenhuma flag encontrada...</p>
        )}
      </div>
    </>
  );
}

export default Teste;
