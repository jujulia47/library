import { useRef } from "react";
import { postFlags } from "../../../actions/flags";

function NewFlag() {
  const formRef = useRef(null);

  const submitForm = async (events: any) => {
    events.preventDefault();

    const { flag } = events.target;

    postFlags(flag.value);

    // Limpar os campos do formulário individualmente
    flag.value = "";
  };

  return (
    <>
      <form ref={formRef} method="post" onSubmit={(e) => submitForm(e)}>
        <div>
          <label htmlFor="flag" className="flag" id="">
            Flag
          </label>
          <input type="text" name="flag" placeholder="flag" required />
        </div>
        <button>Enviar</button>
      </form>
    </>
  );
}

export default NewFlag;
