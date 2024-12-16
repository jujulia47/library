import React from 'react';
import { GlobalStorage } from './context/index';

import Home from './pages/Home/index';
import NewBook from './pages/Forms/NewBook/index';
import NewFlag from './pages/Flags/NewFlag/index';
import NewCollection from './pages/Collection/NewCollection/index';
import NewQuote from './pages/Quotes/NewQuote/index';
import NewSerie from './pages/Series/NewSerie/index';
import NewWishlist from './pages/Wishlist/NewWishlist/index';

import './styles/css/index.css';

function App() {
  return (
    <GlobalStorage>
      {/* <Home /> */}
      <p>FORMULÁRIO NOVO LIVRO</p>
      <NewBook />
      {/* <br />
      <p>FORMULÁRIO NOVA FLAG</p>
      <NewFlag />
      <br />
      <p>FORMULÁRIO NOVA COLEÇÃO</p>
      <NewCollection />
      <p>FORMULÁRIO NOVA CITAÇÃO</p>
      <NewQuote />
      <p>FORMULÁRIO NOVA SÉRIE</p>
      <NewSerie />
      <p>FORMULÁRIO NOVA WISHLIST</p>
      <NewWishlist /> */}
    </GlobalStorage>
  );
}

export default App;
