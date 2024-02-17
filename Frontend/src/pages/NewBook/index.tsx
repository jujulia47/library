import React, { useContext, useEffect } from "react";
// import useContext from '../../context/index'
import { GlobalContext } from "../../context/index";

function NewBook() {
  const { postBooks } = useContext(GlobalContext)

  const submitForm = (events: any) => {
    events.preventDefault()
    console.log(events.target);
     const {
      title,
      author,
      image,
      category,
      rating,
      // flag
     } = events.target

     postBooks(
      title.value, 
      author.value, 
      image.value, 
      category.value, 
      rating.value, 
      // flag.value
      )
  }

  return (
    <>
      <form action="" method="post" onSubmit={(e) => submitForm(e)}>
        <label htmlFor="">Título</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Titulo do Livro"
        />
        <label htmlFor="">Autor</label>
        <input
          type="text"
          name="author"
          id="author"
          placeholder="Autor"
        />
        <label htmlFor="">Imagem</label>
        <input
          type="text"
          name="image"
          id="image"
          placeholder="Imagem"
        />
        <label htmlFor="">Categoria</label>
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Categoria"
        />
        <label htmlFor="">Avaliação</label>
        <input
          type="text"
          name="rating"
          id="rating"
          placeholder="Avaliação"
        />
        <button>Enviar</button>
      </form>
    </>
  );
}

export default NewBook;
