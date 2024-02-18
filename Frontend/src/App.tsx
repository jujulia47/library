import React from 'react';
import useContextGet from './hooks/useContextGet'
import { GlobalStorage } from './context/index';
import { GlobalStorageFlag } from './pages/Flag/context/index'

import Home from './pages/Home/index'
import NewBook from './pages/NewBook/index'
// import './styles/css/App.css';

function App() {
  // const { books } = useContextGet();
  
  return (
    <GlobalStorage>
      <GlobalStorageFlag>
      {/* <div>{books.map((book) => {
        return (
          <>
            <p>{book?.title}</p>
            <img src={book?.image} alt="" />
          </>
        )
      })}</div> */}
        <Home/>
        <NewBook/>
      </GlobalStorageFlag>
    </GlobalStorage>
  );
}

export default App;
