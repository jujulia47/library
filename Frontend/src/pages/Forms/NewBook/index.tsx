import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../../context/index";
import { postBooks } from "../../../actions/books";
import type { Flag, Collection, Quote } from "../../../typings/index";

function NewBook() {
  const formRef = useRef(null);
  const { series, collections, flags, status, versions } =
    useContext(GlobalContext);

  // Estado para gerenciar as citações
  const [quoteInputs, setQuoteInputs] = useState<any[]>([]);
  const [currentQuote, setCurrentQuote] = useState<any>("");

  const handleAddQuote = () => {
    if (
      currentQuote.trim() !== "" &&
      !quoteInputs.includes(currentQuote.trim())
    ) {
      // Adiciona a citação ao estado e limpa o input
      setQuoteInputs((prev) => [...prev, currentQuote.trim()]);
      setCurrentQuote("");
    } else if (quoteInputs.includes(currentQuote.trim())) {
      alert("Essa citação já foi adicionada.");
    }
  };

  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuote(e.target.value);
  };

  const submitForm = (events: any) => {
    events.preventDefault();

    const {
      image,
      title,
      serieName,
      serieCustom,
      author,
      category,
      language,
      library,
      initDate,
      finishDate,
      bookStatus,
      rating,
      comments,
      pages,
      flags,
      flagCustom,
      bookVersion,
      quotes,
      collections,
      collectionCustom,
    } = events.target;

    const flagsArray: Flag[] = [];
    const collectionsArray: Collection[] = [];
    const quotesArray: Quote[] = quoteInputs;

    [...(Array.isArray(flags) ? flags : [flags])].map((flag) => {
      if (flag.checked) {
        flagsArray.push(flag.value);
      }
    });

    flagCustom.value && flagsArray.push(flagCustom.value);

    [...(Array.isArray(collections) ? collections : [collections])].map(
      (collection) => {
        if (collection.checked) {
          collectionsArray.push(collection.value);
        }
      }
    );

    collectionCustom.value && collectionsArray.push(collectionCustom.value);

    let serie = serieName.value;
    if (serie === "") {
      serie = serieCustom.value;
    }

    postBooks(
      image.value,
      title.value,
      serie,
      author.value,
      category.value,
      language.value,
      library.value === "true",
      initDate.value,
      finishDate.value,
      bookStatus.value,
      rating.value,
      comments.value,
      pages.value,
      bookVersion.value,
      flagsArray,
      quotesArray,
      collectionsArray
    );

    // Limpar os campos do formulário individualmente
    image.value = "";
    title.value = "";
    serieName.value = "";
    author.value = "";
    category.value = "";
    language.value = "";
    library.checked = false;
    initDate.value = "";
    finishDate.value = "";
    rating.value = "";
    quotes.value = "";
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
            <option value="">Livro Unico</option>
            {series.map((serie) => {
              return <option value={serie.serieName}>{serie.serieName}</option>;
            })}
          </select>
          <label htmlFor="" className="serie" id="">
            {" "}
            Nova Serie{" "}
          </label>
          <input type="text" name="serieCustom" />
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
            type="text"
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
            type="text"
            name="finishDate"
            id="finishDate"
            placeholder="finishDate"
          />
        </div>
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

        {/* VERSÃO */}
        <div>
          <select name="bookVersion" id="bookVersion">
            <option value="">Sem versão</option>
            {versions.map((version) => {
              return (
                <option value={version.bookVersion}>
                  {version.bookVersion}
                </option>
              );
            })}
          </select>
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

        {/* COMENTÁRIOS */}
        <div>
          <label htmlFor="">Comentários</label>
          <input
            type="text"
            name="comments"
            id="comments"
            placeholder="comments"
          />
        </div>
        <br />

        {/*  PAGES */}
        <div>
          <label htmlFor="">Páginas</label>
          <input type="text" name="pages" id="pages" placeholder="pages" />
        </div>
        <br />

        {/* FLAGS */}
        <div>
          {(Array.isArray(flags) ? flags : [flags]).map((flag, index) => {
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
            Nova Flag{" "}
          </label>
          <input type="text" name="flagCustom" />
        </div>

        {/* CITAÇÕES */}
        <div>
          <label htmlFor="quotes">Book Quotes</label>
          <div>
            <input
              type="text"
              name="quotes"
              id="quotes"
              placeholder="Digite a citação"
              value={currentQuote}
              onChange={handleQuoteChange}
            />
            <button type="button" onClick={handleAddQuote}>
              Adicionar
            </button>
          </div>
          <div>
            {quoteInputs.map((quote, index) => (
              <p key={index}>{quote}</p>
            ))}
          </div>
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

export default NewBook;
