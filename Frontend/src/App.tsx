import React from 'react';
// import useContextGet from './hooks/useContextGet'
import { GlobalStorage } from './pages/Books/context/index';
import { GlobalStorageFlag } from './pages/Flags/context/index'

import Home from './pages/Home/index'
// import NewBook from './pages/Books/NewBook/index'
import './styles/css/index.css';

function App() {
  // const { books } = useContextGet();
  
  return (
    <GlobalStorage>
      <GlobalStorageFlag>
        <Home/>
        {/* <NewBook/> */}
      </GlobalStorageFlag>
    </GlobalStorage>
  );
}

export default App;
