import React, { useContext, useRef } from "react";
// import { GlobalContext } from "../../../context/index";
import useRequest from "../../../hooks/index";

function NewCollection() {
  const formRef = useRef(null);
  const { postCollection } = useRequest();

  const submitForm = (events: any) => {
    events.preventDefault();

    const { collection } = events.target;

    postCollection(collection.value);

    // Limpar os campos do formulário individualmente
    collection.value = "";
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
          <input type="text" name="collection" />
        </div>
        <br />

        <button>Enviar</button>
      </form>
    </>
  );
}

export default NewCollection;
