import React, { useContext, useRef } from "react";
import { GlobalContext } from "../../../context/index";
import useRequest from "../../../hooks/index";

function NewWishlist() {
  const formRef = useRef(null);
  const { collections } = useContext(GlobalContext);
  const { postWishlist } = useRequest();

  const submitForm = (events: any) => {
    events.preventDefault();

    const { bookTitle, bookImage, link, collections, collectionCustom } =
      events.target;

    const collectionsArray = [];

    // if (collections && Array.isArray(collections)) {
    //   collections.forEach((collection) => {
    //     if (collection.checked) {
    //       collectionsArray.push(collection.value);
    //     }
    //   });
    // }

    [...collections].map((collection: any) => {
      collection.checked && collectionsArray.push(collection.value);
    });

    collectionCustom.value && collectionsArray.push(collectionCustom.value);

    postWishlist(
      bookTitle.value,
      bookImage.value,
      link.value,
      collectionsArray
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

        <button>Enviar</button>
      </form>
    </>
  );
}

export default NewWishlist;
