import React from 'react';
import useContextGet from './hooks/useContextGet'
// import './styles/css/App.css';

function App() {
  const { books } = useContextGet();
  
  return (
    <>
      <div>{books.map((book) => {
        return (
          <>
            <p>{book?.title}</p>
            <img src={book?.image} alt="" />
          </>
        )
      })}</div>
    </>
  );
}

export default App;
