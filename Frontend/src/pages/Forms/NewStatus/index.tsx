import { useRef } from "react";
import { postStatus } from "../../../actions/status";

function NewStatus() {
  const formRef = useRef(null);

  const submitForm = async (events: any) => {
    events.preventDefault();

    const { status } = events.target as HTMLFormElement;
    await postStatus(status.value);

    status.value = "";
  };

  return (
    <form ref={formRef} method="post" onSubmit={(e) => submitForm(e)}>
      <div>
        <label htmlFor="status" className="status">
          Status
        </label>
        <input
          type="text"
          name="status"
          id="status"
          placeholder="Status do livro"
          required
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default NewStatus;
