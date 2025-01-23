import { useContext, useRef } from "react";
import { GlobalContext } from "../../../context/index";
import { postCollection } from "../../../actions/collections";

function NewCollection() {
  const formRef = useRef(null);
  const { books, wishlist } = useContext(GlobalContext);

  const submitForm = (events: any) => {
    events.preventDefault();

    const { collectionName, initDate, finishDate, comments, title, bookTitle } =
      events.target;

    postCollection(
      collectionName.value,
      initDate.value,
      finishDate.value,
      comments.value,
      title.value,
      bookTitle.value
    );

    // Limpar os campos do formulário individualmente
    collectionName.value = "";
    initDate.value = "";
    finishDate.value = "";
    comments.value = "";
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
          <label htmlFor="" className="collection" id="">
            {" "}
            Nova coleção{" "}
          </label>
          <input type="text" name="collectionName" />
        </div>
        <br />

        <div>
          <label htmlFor="" className="collection" id="">
            {" "}
            Início{" "}
          </label>
          <input type="text" name="initDate" />
        </div>
        <br />

        <div>
          <label htmlFor="" className="collection" id="">
            {" "}
            Fim{" "}
          </label>
          <input type="text" name="finishDate" />
        </div>
        <br />

        <div>
          <label htmlFor="" className="collection" id="">
            {" "}
            Descrição{" "}
          </label>
          <input type="text" name="comments" />
        </div>
        <br />

        {/* BOOKS */}
        <div>
          <select name="book" id="bookName">
            <option value="">Não pensei</option>
            {books.map((book) => {
              return <option value={book.title}>{book.title}</option>;
            })}
          </select>
        </div>

        {/* WISHLIST */}
        <div>
          <select name="bookTitle" id="bookName">
            <option value="">Sei lá</option>
            {wishlist.map((bookTitle) => {
              return (
                <option value={bookTitle.bookTitle}>
                  {bookTitle.bookTitle}
                </option>
              );
            })}
          </select>
        </div>

        <button>Enviar</button>
      </form>
    </>
  );
}

export default NewCollection;
