// import React, { useContext, useRef } from "react";
// // import { GlobalContext } from "../../../context/index";
// import useRequest from "../../../hooks/index";

// function NewFlag() {
//   const formRef = useRef(null);
//   const { postFlags } = useRequest();

//   const submitForm = (events: any) => {
//     events.preventDefault();

//     const { flag } = events.target;

//     postFlags(flag.value);

//     // Limpar os campos do formulário individualmente
//     flag.value = "";
//   };

//   return (
//     <>
//       <form
//         ref={formRef}
//         action=""
//         method="post"
//         onSubmit={(e) => submitForm(e)}
//       >
//         <div>
//           <label htmlFor="" className="flag" id="">
//             {" "}
//             Nova flag{" "}
//           </label>
//           <input type="text" name="flag" />
//         </div>
//         <br />

//         <button>Enviar</button>
//       </form>
//     </>
//   );
// }

// export default NewFlag;
export {};
