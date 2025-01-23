import { useContext, useRef } from "react";
import { GlobalContext } from "../../../context/index";
import { postWishlist } from "../../../actions/wishlist";

function NewWishlist() {
  const formRef = useRef(null);
  const { collections, series } = useContext(GlobalContext);

  const submitForm = (events: any) => {
    events.preventDefault();

    const {
      bookTitle,
      bookImage,
      link,
      collections,
      collectionCustom,
      serieName,
    } = events.target;

    const collectionsArray = [];

    [...collections].map((collection: any) => {
      collection.checked && collectionsArray.push(collection.value);
    });

    collectionCustom.value && collectionsArray.push(collectionCustom.value);

    postWishlist(
      bookTitle.value,
      bookImage.value,
      link.value,
      collectionsArray,
      serieName.value
    );

    // Limpar os campos do formulário individualmente
    bookTitle.value = "";
    bookImage.value = "";
    link.value = "";
    collectionCustom.value = "";
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
          <label htmlFor="">bookTitle</label>
          <input
            type="text"
            name="bookTitle"
            id="bookTitle"
            placeholder="bookTitle"
          />
        </div>
        <br />

        <div>
          <label htmlFor="">bookImage</label>
          <input
            type="text"
            name="bookImage"
            id="bookImage"
            placeholder="Imagem do Livro"
          />
        </div>
        <br />

        <div>
          <label htmlFor="">link</label>
          <input type="text" name="link" id="link" placeholder="link" />
        </div>
        <br />

        {/* COLEÇÕES */}
        <div>
          {collections.map((collection, index) => {
            return (
              <label
                htmlFor={`collections${index}`}
                className="collections"
                id={`collections${index}`}
              >
                <input
                  type="checkbox"
                  name="collections"
                  value={collection.collectionName}
                />
                {collection.collectionName}
              </label>
            );
          })}
          <label htmlFor="" className="collection" id="">
            {" "}
            Nova coleção{" "}
          </label>
          <input type="text" name="collectionCustom" />
        </div>

        {/* SERIE */}
        <div>
          <select name="serieName" id="bookName">
            <option value="">Não pensei</option>
            {series.map((serie) => {
              return <option value={serie.serieName}>{serie.serieName}</option>;
            })}
          </select>
        </div>

        <button>Enviar</button>
      </form>
    </>
  );
}

export default NewWishlist;
