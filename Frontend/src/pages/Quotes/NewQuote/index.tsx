import React, { useContext, useRef } from "react";
import { GlobalContext } from "../../../context/index";
import useRequest from "../../../hooks/index";

function NewQuote() {
  const formRef = useRef(null);
  const { postQuote } = useRequest();
  const { books } = useContext(GlobalContext);

  const submitForm = (events: any) => {
    events.preventDefault();

    const { quote, bookName } = events.target;

    postQuote(quote.value, bookName.value);

    // Limpar os campos do formulário individualmente
    quote.value = "";
  };

  return (
    <>
      <form
        ref={formRef}
        action=""
        method="post"
        onSubmit={(e) => submitForm(e)}
      >
        <div>
          <label htmlFor="" className="quote" id="">
            {" "}
            Nova citação{" "}
          </label>
          <input type="text" name="quote" />
        </div>
        <br />

        {/* BOOKS */}
        <div>
          <select name="bookName" id="bookName">
            <option value="">Citação sem livro</option>
            {books.map((book) => {
              return <option value={book.title}>{book.title}</option>;
            })}
          </select>
        </div>
        <br />

        <button>Enviar</button>
      </form>
    </>
  );
}

export default NewQuote;
