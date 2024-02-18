import React, { useContext } from 'react'
// import useContext from '../../context/index'
import { GlobalContext } from '../../context/index';

function Home() {
    const { books } = useContext(GlobalContext)
    console.log('Livros', books);
    console.log('Autor', books[0].author);
    console.log('Categoria', books[0].category);
    console.log('Image', books[0].image);
    console.log('Avaliação', books[0].rating);
    console.log('Título', books[0].title);
    // console.log('Título', books[0].flags[0].flag);

  return (   
    <> 
      <div>{books.map((title) => {
          return(
            <p>{title.title}</p>
          )}
      )}
      </div>
      <div>{books.map((flags) => {
          return(
            <p>{flags.flags.map((flag) =>{
              return(
                <p>{flag.flag}</p>
              )
            })}</p>
          )}
      )}
      </div>
    </> 
  )
}

export default Home