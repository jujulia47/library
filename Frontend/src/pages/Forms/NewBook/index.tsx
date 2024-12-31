import React, { useContext, useRef } from 'react';
import { useBooks } from '../../../context/index';
// import useRequest from '../../../hooks/index';

function NewBook() {
  const formRef = useRef(null);
  const { series, flags, collections } = useBooks();
  // const { postBooks } = useRequest();//chamar a action de books direto do import

  const submitForm = (events: any) => {
    events.preventDefault();

    const {
      image,
      title,
      serieName,
      author,
      category,
      language,
      library,
      initDate,
      finishDate,
      finish,
      rating,
      flags,
      flagsCustom,
      quotes,
      collections,
      collectionCustom,
    } = events.target;

    const flagsArray = [];
    const collectionsArray = [];

    if (flags && Array.isArray(flags)) {
      flags.forEach((flag) => {
        if (flag.checked) {
          flagsArray.push(flag.value);
        }
      });
    }

    if (collections && Array.isArray(collections)) {
      collections.forEach((collection) => {
        if (collection.checked) {
          collectionsArray.push(collection.value);
        }
      });
    }

    flagsCustom.value && flagsArray.push(flagsCustom.value);
    collectionCustom.value && collectionsArray.push(collectionCustom.value);

    postBooks(
      image.value,
      title.value,
      serieName.value,
      author.value,
      category.value,
      language.value,
      library.value === 'true',
      initDate.value,
      finishDate.value,
      finish.value === 'true',
      rating.value,
      flagsArray,
      quotes.value,
      collectionsArray,
    );

    // Limpar os campos do formulário individualmente
    image.value = '';
    title.value = '';
    serieName.value = '';
    author.value = '';
    category.value = '';
    language.value = '';
    library.checked = false;
    initDate.value = '';
    finishDate.value = '';
    finish.checked = false;
    rating.value = '';
    flagsCustom.value = '';
    quotes.value = '';
    collectionCustom.value = '';
  };

  return (
    <>
      <form
        ref={formRef}
        action=""
        method="post"
        onSubmit={(e) => submitForm(e)}
      >
        {/* IMAGEM */}
        <div>
          <label htmlFor="">Imagem</label>
          <input type="file" name="image" id="image" placeholder="Imagem" />
        </div>
        <br />

        {/* TÍTULO */}
        <div>
          <label htmlFor="">Título</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Titulo do Livro"
          />
        </div>
        <br />

        {/* SÉRIE */}
        <div>
          <select name="serieName" id="serieName">
            <option value="">Livro único</option>
            {series.map((serie) => {
              return <option value={serie.serieName}>{serie.serieName}</option>;
            })}
          </select>
        </div>
        <br />

        {/* AUTOR */}
        <div>
          <label htmlFor="">Autor</label>
          <input type="text" name="author" id="author" placeholder="Autor" />
        </div>
        <br />

        {/* CATEGORIA */}
        <div>
          <label htmlFor="">Categoria</label>
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Categoria"
          />
        </div>
        <br />

        {/* IDIOMA */}
        <div>
          <label htmlFor="">Idioma</label>
          <select name="language" id="language">
            <option value="Português" id="pt-bt">
              Português
            </option>
            <option value="English" id="pt-bt">
              English
            </option>
          </select>
        </div>

        <br />

        {/* BICLIOTECA */}
        <div>
          <label htmlFor="library" id="library">
            Biblioteca
          </label>
          <br />
          <input
            type="radio"
            id="true"
            name="library"
            value="true"
            defaultChecked
          />
          <label htmlFor="">Sim</label>
          <br />
          <input type="radio" id="false" name="library" value="false" />
          <label htmlFor="">Não</label>
        </div>
        <br />

        {/* DATA INÍCIO LEITURA */}
        <div>
          <label htmlFor="">Data início Leitrua</label>
          <input
            type="date"
            name="initDate"
            id="initDate"
            placeholder="initDate"
          />
        </div>
        <br />

        {/* DATA FIM LEITURA */}
        <div>
          <label htmlFor="">Data fim Leitrua</label>
          <input
            type="date"
            name="finishDate"
            id="finishDate"
            placeholder="finishDate"
          />
        </div>
        <br />

        {/* LIDO? */}
        <div>
          <label htmlFor="finish" id="finish">
            Lido
          </label>
          <br />
          <input
            type="radio"
            id="true"
            name="finish"
            value="true"
            defaultChecked
          />
          <label htmlFor="">Sim</label>
          <br />
          <input type="radio" id="false" name="finish" value="false" />
          <label htmlFor="">Não</label>
        </div>
        <br />

        {/* AVALIAÇÃO */}
        <div>
          <label htmlFor="">Avaliação</label>
          <input
            type="text"
            name="rating"
            id="rating"
            placeholder="Avaliação"
          />
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
            {' '}
            Nova flag{' '}
          </label>
          <input type="text" name="flagsCustom" />
        </div>
        <br />

        {/* CITAÇÕES */}
        <div>
          <label htmlFor="">Book Quotes</label>
          <input type="text" name="quotes" id="quotes" placeholder="quotes" />
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
            {' '}
            Nova coleção{' '}
          </label>
          <input type="text" name="collectionCustom" />
        </div>

        <button>Enviar</button>
      </form>
    </>
  );
}

export default NewBook;
