import React from 'react';
import { GlobalStorage } from './context/index';

// import Home from './pages/Home/index';
import NewBook from './pages/Forms/NewBook/index';
// import NewFlag from './pages/Forms/NewFlag';
// import NewCollection from './pages/Forms/NewCollection/index';
// import NewQuote from './pages/Forms/NewQuote';
// import NewSerie from './pages/Forms/NewSerie/index';
// import NewWishlist from './pages/Forms/NewWishlist/index';
// import NewVersion from './pages/Forms/NewVersion';
// import NewStatus from './pages/Forms/NewStatus';
// import Teste from './pages/Books/AllBooks/index'


import './styles/css/index.css';

function App() {
  return (
    <GlobalStorage>
      {/* <p>FORMULÁRIO NOVA VERSÃO</p>
      <NewVersion /> */}
      {/* <Home /> */}
      <NewBook />
      <br />
      {/* <p>FORMULÁRIO NOVA FLAG</p>
      <NewFlag /> */}
      <br />
      {/* <p>FORMULÁRIO NOVO STATUS</p>
      <NewStatus /> */}
      < br />
      {/* <p>FORMULÁRIO NOVA WISHLIST</p>
      <NewWishlist /> */}
      {/* <p>FORMULÁRIO NOVA CITAÇÃO</p>
      <NewQuote /> */}
      {/* <p>FORMULÁRIO NOVA SÉRIE</p>
      <NewSerie /> */}
      {/* <p>FORMULÁRIO NOVA COLEÇÃO</p>
      <NewCollection /> */}
      {/* <Teste /> */}
    </GlobalStorage>
  );
}

export default App;
