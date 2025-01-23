import { useContext, useRef } from "react";
import { GlobalContext } from "../../../context/index";
import { postSerie } from "../../../actions/series";
import type { Flag, Book, Wishlist } from "../../../typings/index";

function NewSerie() {
  const formRef = useRef(null);
  const { books, wishlist, status, flags } = useContext(GlobalContext);

  const submitForm = (events: any) => {
    events.preventDefault();

    const {
      serieName,
      author,
      rating,
      initDate,
      finishDate,
      comments,
      books,
      flags,
      flagCustom,
      bookStatus,
      wishlist,
    } = events.target;

    const flagsArray: Flag[] = [];
    const booksArray: Book[] = [];
    const wishlistArray: Wishlist[] = [];

    [...flags].map((flag: any) => {
      flag.checked && flagsArray.push(flag.value);
    });

    flagCustom.value && flagsArray.push(flagCustom.value);

    [...books].map((book: any) => {
      book.checked && booksArray.push(book.value);
    });

    [...wishlist].map((booWish: any) => {
      booWish.checked && wishlistArray.push(booWish.value);
    });

    postSerie(
      serieName.value,
      author.value,
      rating.value,
      initDate.value,
      finishDate.value,
      comments.value,
      booksArray,
      flagsArray,
      bookStatus.value,
      wishlistArray
    );
  };

  return (
    <>
      <form
        ref={formRef}
        action=""
        method="post"
        onSubmit={(e) => submitForm(e)}
      >
        {/* SÉRIE */}
        <div>
          <label htmlFor="">Título</label>
          <input
            type="text"
            name="serieName"
            id="serieName"
            placeholder="serie Name"
          />
        </div>
        <br />

        {/* AUTOR */}
        <div>
          <label htmlFor="">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="author Name"
          />
        </div>
        <br />

        {/* rating */}
        <div>
          <label htmlFor="">Rating</label>
          <input type="text" name="rating" id="rating" placeholder="rating" />
        </div>
        <br />

        {/* initDate */}
        <div>
          <label htmlFor="">initDate</label>
          <input
            type="text"
            name="initDate"
            id="initDate"
            placeholder="initDate"
          />
        </div>
        <br />

        {/* finishDate */}
        <div>
          <label htmlFor="">finishDate</label>
          <input
            type="text"
            name="finishDate"
            id="finishDate"
            placeholder="finishDate"
          />
        </div>
        <br />

        {/* comments */}
        <div>
          <label htmlFor="">comments</label>
          <input
            type="text"
            name="comments"
            id="comments"
            placeholder="comments"
          />
        </div>
        <br />

        {/* CONCLUÍDO */}
        {/* <div>
          <label htmlFor="finish" id="finish">
            Concluído
          </label>
          <br />
          <input
            type="radio"
            id="true"
            name="concluded"
            value="true"
            defaultChecked
          />
          <label htmlFor="">Sim</label>
          <br />
          <input type="radio" id="false" name="concluded" value="false" />
          <label htmlFor="">Não</label>
        </div> */}
        <br />

        {/* ABANDONADO */}
        {/* <div>
          <label htmlFor="library" id="library">
            Abandonado
          </label>
          <br />
          <input
            type="radio"
            id="true"
            name="abandoned"
            value="true"
            defaultChecked
          />
          <label htmlFor="">Sim</label>
          <br />
          <input type="radio" id="false" name="abandoned" value="false" />
          <label htmlFor="">Não</label>
        </div> */}
        <br />

        {/* STATUS */}
        <div>
          <select name="bookStatus" id="bookStatus">
            <option value="">Sem status</option>
            {status.map((status) => {
              return (
                <option value={status.bookStatus}>{status.bookStatus}</option>
              );
            })}
          </select>
        </div>
        <br />

        {/* FLAGS */}
        <div>
          {flags.map((flag, index) => {
            return (
              <label
                htmlFor={`flag${index}`}
                className="flag"
                id={`flag${index}`}
              >
                <input type="checkbox" name="flags" value={flag.flag} />
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
        <br />

        {/* LIVROS */}
        <div>
          {books.map((book, index) => {
            return (
              <label
                htmlFor={`book${index}`}
                className="book"
                id={`book${index}`}
              >
                <input type="checkbox" name="books" value={book.title} />
                {book.title}
              </label>
            );
          })}
        </div>
        <br />

        {/* WISHLIST */}
        <div>
          {wishlist.map((bookTitle, index) => {
            return (
              <label
                htmlFor={`bookTitle${index}`}
                className="bookTitle"
                id={`bookTitle${index}`}
              >
                <input
                  type="checkbox"
                  name="wishlist"
                  value={bookTitle.bookTitle}
                />
                {bookTitle.bookTitle}
              </label>
            );
          })}
        </div>
        <br />

        <button>Enviar</button>
      </form>
    </>
  );
}

export default NewSerie;
