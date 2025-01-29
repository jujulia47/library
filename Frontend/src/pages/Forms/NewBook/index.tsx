import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../../context/index";
import { postBooks } from "../../../actions/books";
import StarRating from "./components/StarRating";
import type { Flag, Collection, Quote } from "../../../typings/index";

import "../../../styles/css/pages/Forms/NewBook/index.css";

function NewBook() {
  const formRef = useRef(null);
  const { series, collections, flags, status, versions } =
    useContext(GlobalContext);

  const [avaliacao, setAvaliacao] = useState("");
  const [quoteInputs, setQuoteInputs] = useState<any[]>([]);
  const [currentQuote, setCurrentQuote] = useState<any>("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [newSerieInput, setNewSerieInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleChangeStatus = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  const handleChangeSerie = (event: any) => {
    setNewSerieInput(event.target.value);
  };

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

  const handleRatingChange = (rating: any) => {
    setAvaliacao(rating);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Cria uma URL temporária
      setSelectedImage(imageUrl);
    }
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
      comments,
      pages,
      flags,
      flagCustom,
      bookVersion,
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
      library.checked,
      initDate.value,
      finishDate.value,
      bookStatus.value,
      avaliacao,
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
    serie = "";
    author.value = "";
    category.value = "";
    language.value = "";
    library.checked = false;
    initDate.value = "";
    finishDate.value = "";
    comments.value = "";
    pages.value = "";
    collectionCustom.value = "";
    image.value = ""

    alert("Livros cadastrado com sucesso")
  };

  return (
    <>
      <form
        ref={formRef}
        action=""
        method="post"
        onSubmit={(e) => submitForm(e)}
        className="newBook-form"
      >
        <main className="newBook">
          <h1 className="newBook__title">New Book</h1>
          <section className="newBook__body">
            <article className="newBook__left">
              {/* IMAGEM */}
              <div className="newBook__field img">
                <label htmlFor="file-upload" className="newBook__label img">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="file-upload"
                  placeholder="Imagem"
                  className="newBook__image"
                  accept="image/*" // Limita o upload a arquivos de imagem
                  onChange={handleImageChange}
                  required
                />
                {/* Pré-visualização da imagem */}
                <div className="newBook__preview">
                  {selectedImage && (
                    <div className="image-preview">
                      <img
                        src={selectedImage}
                        alt="Pré-visualização"
                        className="newBook__image-preview"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* AVALIAÇÃO */}
              <div className="newBook__field">
                {/* <label htmlFor="" className="newBook__label">
                  Avaliação
                </label>
                <input
                  type="text"
                  name="rating"
                  id="rating"
                  placeholder="Avaliação"
                  className="newBook__rating"
                /> */}

                {/* handleRatingChange é uma função passada como props para o componente filho
                  handleRatingChange no pai captura o valor que foi enviado pelo filho e atualiza o estado avaliacao. */}
                <StarRating ratingSelected={handleRatingChange} />
              </div>

              {/*  PAGES */}
              <div className="newBook__field">
                <label htmlFor="" className="newBook__label">
                  Pages
                </label>
                <input
                  type="text"
                  name="pages"
                  id="pages"
                  placeholder="pages"
                  className="newBook__pages"
                />
              </div>

              {/* BICLIOTECA */}

              <div className="newBook__field library">
                <label
                  htmlFor="library"
                  id="library"
                  className="newBook__label"
                >
                  Library
                </label>

                <label className="newBook__toggle">
                  <input
                    type="checkbox"
                    id="library-toggle"
                    name="library"
                    className="newBook__library"
                  />
                  <span className="toggle-switch"></span>
                </label>
              </div>

              {/* IDIOMA */}
              <div className="newBook__field">
                <label htmlFor="" className="newBook__label">
                  Language
                </label>
                <select
                  name="language"
                  id="language"
                  className="newBook__language"
                >
                  <option
                    value="Português"
                    id="pt-br"
                    className="newBook__language__option"
                  >
                    Português
                  </option>
                  <option
                    value="English"
                    id="en-us"
                    className="newBook__language__option"
                  >
                    English
                  </option>
                </select>
              </div>

              {/* COMENTÁRIOS */}
              <div className="newBook__field comments">
                <label htmlFor="" className="newBook__label">
                  Comments
                </label>
                <textarea
                  name="comments"
                  id="comments"
                  placeholder="comments..."
                  className="newBook__comments"
                />
              </div>
            </article>
            <article className="newBook_right">
              <div className="newBook__right__details">
                {/* TÍTULO */}
                <div className="newBook__field">
                  <label htmlFor="" className="newBook__label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Titulo do Livro"
                    className="newBook__name"
                  />
                </div>
                {/* AUTOR */}
                <div className="newBook__field">
                  <label htmlFor="" className="newBook__label">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    placeholder="Autor"
                    className="newBook__author"
                  />
                </div>
                {/* CATEGORIA */}
                <div className="newBook__field">
                  <label htmlFor="" className="newBook__label">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Categoria"
                    className="newBook__category"
                  />
                </div>
                {/* STATUS */}
                <div className="newBook__field">
                  <label htmlFor="" className="newBook__label" id="">
                    Book Status
                  </label>
                  <select
                    name="bookStatus"
                    id="bookStatus"
                    className="newBook__status"
                    value={selectedStatus}
                    onChange={handleChangeStatus}
                  >
                    <option value="" className="newBook__status__option">
                      Select an option
                    </option>
                    {status.map((status) => {
                      return (
                        <option
                          className="newBook__status__option"
                          value={status.bookStatus}
                        >
                          {status.bookStatus}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="newBook__right__date">
                  {/* DATA INÍCIO LEITURA */}
                  <div className="newBook__field init__date">
                    <label htmlFor="" className="newBook__label">
                      Init Date
                    </label>
                    <input
                      type="date"
                      name="initDate"
                      id="initDate"
                      placeholder="initDate"
                      className="newBook__initDate"
                      disabled={
                        selectedStatus === "" || selectedStatus === "TRB"
                      }
                    />
                  </div>
                  {/* DATA FIM LEITURA */}
                  <div className="newBook__field finish__date">
                    <label htmlFor="" className="newBook__label">
                      Finish Date
                    </label>
                    <input
                      type="date"
                      name="finishDate"
                      id="finishDate"
                      placeholder="finishDate"
                      className="newBook__finishDate"
                      disabled={
                        selectedStatus === "Lendo" ||
                        selectedStatus === "TRB" ||
                        selectedStatus === ""
                      }
                    />
                  </div>
                </div>
                {/* SÉRIE*/}
                <div className="newBook__right__serie">
                  <div className="newBook__field">
                    <label htmlFor="" className="newBook__label" id="">
                      Series
                    </label>
                    <select
                      name="serieName"
                      id="serieName"
                      className="newBook__serie"
                    >
                      <option value="" className="newBook__serie__option">
                        Select a serie
                      </option>
                      {series.map((serie) => {
                        return (
                          <option
                            className="newBook__serie__option"
                            value={serie.serieName}
                            disabled={newSerieInput !== ""}
                          >
                            {serie.serieName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* SÉRIE INPUT*/}
                  <div className="newBook__field">
                    <label htmlFor="" className="newBook__label" id="">
                      New Serie
                    </label>
                    <input
                      type="text"
                      name="serieCustom"
                      className="newBook__newSerie"
                      onChange={handleChangeSerie}
                    />
                  </div>
                </div>
              </div>

              {/* VERSÃO */}
              <div className="newBook__field version">
                <label htmlFor="" className="newBook__label" id="">
                  Book Version
                </label>
                <select
                  name="bookVersion"
                  id="bookVersion"
                  className="newBook__version"
                >
                  <option value="" className="newBook__version__option">
                    Selecione uma opção
                  </option>
                  {versions.map((version) => {
                    return (
                      <option
                        className="newBook__version__option"
                        value={version.bookVersion}
                      >
                        {version.bookVersion}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* CITAÇÕES */}
              <div className="newBook__field  quote">
                <label htmlFor="quotes" className="newBook__label">
                  Book Quotes
                </label>
                <div className="newBook__addQuote">
                  <input
                    type="text"
                    name="quotes"
                    id="quotes"
                    placeholder="Digite a citação"
                    value={currentQuote}
                    onChange={handleQuoteChange}
                    className="newBook__quotes"
                  />
                  <button
                    className="newBook__quotes__btn"
                    type="button"
                    onClick={handleAddQuote}
                  >
                    Add
                  </button>
                </div>
                <div className="newBook__addedQuote">
                  <ul>
                    {quoteInputs.map((quote, index) => (
                      <li
                        key={index}
                        className="newBook__addedQuote__paragraph"
                      >
                        {quote}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="newBook__right__end">
                {/* COLEÇÕES */}
                <div className="newBook__field collection">
                  <div className="newBook__collectionsOptions">
                    {collections.map((collection, index) => {
                      const uniqueId = `collection-${index}`;
                      return (
                        <label
                          htmlFor={uniqueId}
                          className="newBook__label collection"
                          key={uniqueId}
                        >
                          <input
                            type="checkbox"
                            name="collections"
                            value={collection.collectionName}
                            className="newBook__collection__check"
                            id={uniqueId}
                          />
                          {collection.collectionName}
                        </label>
                      );
                    })}
                  </div>
                  <div className="newBook__newCollection">
                    <label htmlFor="" className="newBook__label" id="">
                      New Collection
                    </label>
                    <input
                      type="text"
                      name="collectionCustom"
                      className="newBook__collection"
                    />
                  </div>
                </div>
                {/* FLAGS */}
                <div className="newBook__field flags">
                  <div className="newBook__flagsOptions">
                    {(Array.isArray(flags) ? flags : [flags]).map(
                      (flag, index) => {
                        const uniqueId = `flag-${index}`; // Cria um ID único para cada checkbox
                        return (
                          <label
                            htmlFor={uniqueId} // Associa ao ID único
                            className="newBook__label flag"
                            key={uniqueId} // Adiciona uma key única ao elemento
                          >
                            <input
                              type="checkbox"
                              name="flags"
                              id={uniqueId} // Usa o mesmo ID único aqui
                              value={flag.flag}
                              className="newBook__flags__check"
                            />
                            {flag.flag}
                          </label>
                        );
                      }
                    )}
                  </div>
                  <div className="newBook__newFlag">
                    <label htmlFor="" className="newBook__label" id="">
                      {" "}
                      New Flag{" "}
                    </label>
                    <input
                      type="text"
                      name="flagCustom"
                      className="newBook__flags"
                    />
                  </div>
                </div>
              </div>
            </article>
          </section>
          <button className="newBook__submit">Save</button>
        </main>
      </form>
    </>
  );
}

export default NewBook;
