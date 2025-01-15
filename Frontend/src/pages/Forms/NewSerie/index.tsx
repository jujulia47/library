// import React, { useContext, useRef } from "react";
// import { GlobalContext } from "../../../context/index";
// import useRequest from "../../../hooks/index";

// function NewSerie() {
//   const formRef = useRef(null);
// //   const { series, flags, collections } = useContext(GlobalContext);
//   const { postSerie } = useRequest();

//   const submitForm = (events: any) => {
//     events.preventDefault();

//     const { serieName, concluded, abandoned } = events.target;

//     postSerie(
//       serieName.value,
//       concluded.value === "true",
//       abandoned.value === "true"
//     );

//     // Limpar os campos do formulário individualmente
//     serieName.value = "";
//     concluded.checked = false;
//     abandoned.checked = false;
//   };

//   return (
//     <>
//       <form
//         ref={formRef}
//         action=""
//         method="post"
//         onSubmit={(e) => submitForm(e)}
//       >
//         {/* SÉRIE */}
//         <div>
//           <label htmlFor="">Título</label>
//           <input
//             type="text"
//             name="serieName"
//             id="serieName"
//             placeholder="serie Name"
//           />
//         </div>
//         <br />

//         {/* CONCLUÍDO */}
//         <div>
//           <label htmlFor="finish" id="finish">
//             Concluído
//           </label>
//           <br />
//           <input
//             type="radio"
//             id="true"
//             name="concluded"
//             value="true"
//             defaultChecked
//           />
//           <label htmlFor="">Sim</label>
//           <br />
//           <input type="radio" id="false" name="concluded" value="false" />
//           <label htmlFor="">Não</label>
//         </div>
//         <br />

//         {/* ABANDONADO */}
//         <div>
//           <label htmlFor="library" id="library">
//             Abandonado
//           </label>
//           <br />
//           <input
//             type="radio"
//             id="true"
//             name="abandoned"
//             value="true"
//             defaultChecked
//           />
//           <label htmlFor="">Sim</label>
//           <br />
//           <input type="radio" id="false" name="abandoned" value="false" />
//           <label htmlFor="">Não</label>
//         </div>
//         <br />

//         <button>Enviar</button>
//       </form>
//     </>
//   );
// }

// export default NewSerie;
export {};
