import React, { useContext } from 'react'
// import useContext from '../../context/index'
import { GlobalContext } from '../Books/context/index';

function Home() {
    const { books } = useContext(GlobalContext)
    
  return books.length ? (   
    <> 
      <div>{books && books?.map((title, index) => {
          return(
            <p key={index}>{title.title}</p>
          )}
      )}
      </div>
      <div>{books && books?.map((flags, index) => {
          return(
            <p key={index}>{flags?.flags?.map((flag, index) =>{
              return(
                <p key={index}>{flag.flag}</p>
              )
            })}</p>
          )}
      )}
      </div>
      <div>{books && books?.map((quotes, index) => {
          return(
            <p key={index}>{quotes?.quotes?.map((quote, index) =>{
              return(
                <p key={index}>{quote.quote}</p>
              )
            })}</p>
          )}
      )}
      </div>
    </> 
  ) : (
    <p>Nenhum livro no banco de dados</p>
  )
}

export default Home