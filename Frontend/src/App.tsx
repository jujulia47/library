import React from 'react';
import { GlobalStorage } from './context/index';

// import Home from './pages/Home/index'
import NewBook from './pages/Books/NewBook/index'
import './styles/css/index.css';

function App() {  
  return (
    <GlobalStorage>
        {/* <Home/> */}
        <NewBook/>
    </GlobalStorage>
  );
}

export default App;
