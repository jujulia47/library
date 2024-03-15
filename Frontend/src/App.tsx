import React from 'react';
import { GlobalStorage } from './context/index';

// import Home from './pages/Home/index'
import NewBook from './pages/Books/NewBook/index'
import NewFlag from './pages/Flags/NewFlag/index'
import NewCollection from './pages/Collection/NewCollection/index'

import './styles/css/index.css';

function App() {  
  return (
    <GlobalStorage>
        {/* <Home/> */}
        <p>FORMULÁRIO NOVO LIVRO</p>
        <NewBook/>
        <br/>
        <p>FORMULÁRIO NOVA FLAG</p>
        <NewFlag/>
        <br/>
        <p>FORMULÁRIO NOVA COLEÇÃO</p>
        <NewCollection/>
    </GlobalStorage>
  );
}

export default App;
