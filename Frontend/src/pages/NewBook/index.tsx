import React, { useContext, useEffect } from "react";
// import useContext from '../../context/index'
import { GlobalContext } from "../../context/index";
import { FLagGlobalContext } from "../Flag/context/index";

function NewBook() {
  const { postBooks } = useContext(GlobalContext);
  const { flags } = useContext(FLagGlobalContext);

  console.log("flags", flags);

  const submitForm = (events: any) => {
    events.preventDefault();
    console.log("evento", events.target);
    const { title, author, image, category, rating, flags, flagsCustom} = events.target;
    console.log(flags, "nome pra gente saber o que é");
    const teste = [] as String[];

    [...flags].map((flag: any) => {
      flag.checked && teste.push(flag.value);
    });

    flagsCustom.value && teste.push(flagsCustom.value)

    postBooks(
      title.value,
      author.value,
      image.value,
      category.value,
      rating.value,
      teste
    );
  };

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
        <input type="text" name="author" id="author" placeholder="Autor" />
        <label htmlFor="">Imagem</label>
        <input type="text" name="image" id="image" placeholder="Imagem" />
        <label htmlFor="">Categoria</label>
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Categoria"
        />
        <label htmlFor="">Avaliação</label>
        <input type="text" name="rating" id="rating" placeholder="Avaliação" />

        {flags.map((flag, index) => {
          return (
            <label
              htmlFor={`flag${index}`}
              className="flag"
              id={`flag${index}`}
            >
              <input
                type="checkbox"
                name="flags"
                // id={`inputFlag${index}`}
                value={flag.flag}
              />
              {flag.flag}
            </label>
          );
        })}

        <label htmlFor="" className="flag" id="">
          <input
            type="text"
            name="flagsCustom"
            // id={`inputFlag${index}`}
            // value=""
          />
          Robson
        </label>

        {/* <select name="flag" id="flag">
          {flags.map((flag) => {
            return (
              <option value={flag.flag}>
                {flag.flag}
              </option>
            )
          })}
        </select> */}
        <button>Enviar</button>
      </form>
    </>
  );
}

export default NewBook;
