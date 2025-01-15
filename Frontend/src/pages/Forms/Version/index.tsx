import React, { useRef } from 'react';
import { useGlobalContext } from '../../../hooks/index';
import { postVersion } from '../../../actions/versions';

function Version() {
  const formRef = useRef(null);
  const { versions, setVersions } = useGlobalContext(); // Novo nome do hook

  const submitForm = async (events: React.FormEvent<HTMLFormElement>) => {
    events.preventDefault();
    const form = events.target as HTMLFormElement;
    const versionInput = form.version as HTMLInputElement;

    const newVersion = versionInput.value;

    await postVersion(newVersion);

    setVersions([...versions, { bookVersion: newVersion }]);

    versionInput.value = '';
  };

  return (
    <form ref={formRef} onSubmit={(e) => submitForm(e)}>
      <div>
        <label htmlFor="version">Versões</label>
        <input
          type="text"
          name="version"
          id="version"
          placeholder="Versão do livro"
          required
        />
      </div>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Version;
