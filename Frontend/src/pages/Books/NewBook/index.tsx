import React, { useContext, useEffect } from "react";
// import useContext from '../../context/index'
import { GlobalContext } from "../context/index";
import { FLagGlobalContext } from "../../../pages/Flags/context/index";

function NewBook() {
  const { postBooks, setBooks } = useContext(GlobalContext);
  const { flags } = useContext(FLagGlobalContext);

  const submitForm = (events: any) => {
    events.preventDefault();
    console.log("evento", events.target);
    const {
      title,
      author,
      category,
      language,
      library,
      finish,
      finishDate,
      image,
      rating,
      flags,
      flagsCustom,
      quotes,
    } = events.target;

    // console.log(finish, "finish");

    const teste = [] as String[];

    [...flags].map((flag: any) => {
      flag.checked && teste.push(flag.value);
    });

    // if (flags && Array.isArray(flags)) {
    //   for (const flag of flags) {
    //     if (flag.checked) {
    //       teste.push(flag.value);
    //     }
    //   }
    // } else {
    //   teste.push(flags.value);
    // }

    flagsCustom.value && teste.push(flagsCustom.value);

    postBooks(
      title.value,
      author.value,
      category.value,
      language.value,
      library.value === "true",
      finish.value === "true",
      finishDate.value,
      image.value,
      rating.value,
      teste,
      quotes.value
    );
  };

  return (
    <>
      <form action="" method="post" onSubmit={(e) => submitForm(e)}>
        <div>
          <label htmlFor="">Título</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Titulo do Livro"
          />
        </div>

        <br/>

        <div>
          <label htmlFor="">Autor</label>
          <input type="text" name="author" id="author" placeholder="Autor" />
        </div>

        <br/>

        <div>
          <label htmlFor="">Categoria</label>
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Categoria"
          />
        </div>

        <br/>

        <div>
          <label htmlFor="">Idioma</label>
          <select name="language" id="language">
          <option value="Português" id="pt-bt">Português</option>
          <option value="English" id="pt-bt">English</option>
          </select>
        </div>
        <br/>

        <div>
          <label htmlFor="library" id="library">Biblioteca</label>
          <br/>
          <input type="radio" id="true" name="library" value="true" defaultChecked/>
          <label htmlFor="">Sim</label>
          <br/>
          <input type="radio" id="false" name="library" value="false"/>
          <label htmlFor="">Não</label>
        </div>

        <br/>

        <div>
          <label htmlFor="finish" id="finish">Lido</label>
          <br/>
          <input type="radio" id="true" name="finish" value="true" defaultChecked/>
          <label htmlFor="">Sim</label>
          <br/>
          <input type="radio" id="false" name="finish" value="false"/>
          <label htmlFor="">Não</label>
        </div>

        <br/>
        <div>
          <label htmlFor="">Data da Leitrua</label>
          <input type="text" name="finishDate" id="finishDate" placeholder="finishDate" />
        </div>

        <br/>
        
        <div>
          <label htmlFor="">Imagem</label>
          <input type="text" name="image" id="image" placeholder="Imagem" />
        </div>
        
        <br/>

        <div>
          <label htmlFor="">Avaliação</label>
          <input
            type="text"
            name="rating"
            id="rating"
            placeholder="Avaliação"
          />
        </div>

        <br/>

        <div>
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
            {" "}
            Nova flag{" "}
          </label>
          <input type="text" name="flagsCustom" />
        </div>

        {/* <select name="flag" id="flag">
          {flags.map((flag) => {
            return (
              <option value={flag.flag}>
                {flag.flag}
              </option>
            )
          })}
        </select> */}
        <br/>
        <div>
          <label htmlFor="">Book Quotes</label>
          <input type="text" name="quotes" id="quotes" placeholder="quotes" />
        </div>
        <br/>
        <button>Enviar</button>
      </form>
    </>
  );
}

export default NewBook;
