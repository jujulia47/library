import { useContext, useRef } from "react";
import { GlobalContext } from "../../../context/index";
import { postQuote } from "../../../actions/quotes";

function NewQuote() {
  const formRef = useRef(null);
  const { books } = useContext(GlobalContext);

  const submitForm = (events: any) => {
    events.preventDefault();

    const { quote, page, book } = events.target;

    postQuote(quote.value, page.value, book.value);

    console.log("Quote:", quote.value);
    console.log("Book Name:", book.value);
    console.log("Page:", page.value);

    quote.value = "";
    page.value = "";
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

        <div>
          <label htmlFor="" className="page" id="">
            {" "}
            Página{" "}
          </label>
          <input type="text" name="page" />
        </div>
        <br />

        {/* BOOKS */}
        <div>
          <select name="book" id="bookName">
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
