import { useState, useEffect} from "react";

const loading = 	{
    "title": "",
    "author": "",
    "image": "",
    "category": "",
    "rating": "",
    "flags": []
}

const useContextGet = () => {
  const [books, setBooks] = useState([loading]);
    useEffect(() => {
        async function getBooks(){
            const fetchBooks = await fetch(`http://localhost:3333/book`)
            const handleBooks = await fetchBooks.json()
            setBooks(handleBooks)
        }
        getBooks()
    }, [])  

  return { books };
};

export default useContextGet;

