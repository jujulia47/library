import { useRef } from "react";
import { postVersion } from "../../../actions/versions";

function NewVersion() {
  const formRef = useRef(null);

  const submitForm = async (events: any) => {
    events.preventDefault();

    const { version } = events.target as HTMLFormElement;
    await postVersion(version.value);

    version.value = "";
  };

  return (
    <form ref={formRef} method="post" onSubmit={(e) => submitForm(e)}>
      <div>
        <label htmlFor="version" className="version">
          Versão do Livro
        </label>
        <input
          type="text"
          name="version"
          id="version"
          placeholder="Versão do livro"
          required
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default NewVersion;
