import React, { useContext } from 'react'
// import useContext from '../../context/index'
import { GlobalContext } from '../../context/index';

function Home() {
    const { books } = useContext(GlobalContext)
    console.log('Livroooooos', books);
    
  return (     
    <div>{books.map((title) => {
        return(
            <p>{title.title}</p>
        )}
    )}
    </div>

  )
}

export default Home