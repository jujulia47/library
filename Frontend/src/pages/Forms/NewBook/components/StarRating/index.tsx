import React, { useState } from 'react';
import "../../../../../styles/css/pages/Forms/NewBook/components/StarRating/index.css";

const StarRating = ({ ratingSelected }: any) => {
  // para saber qual está preenchida e alterar o nome da classe
  const [rating, setRating] = useState(0);

  //Clique na estrela, recebe o parâmetro "value" que é o "número" da estrela clicado
  const handleStarClick = (value: any) => {
    setRating(value);
    // Passa o valor como string (de 1 a 5) para o componente pai
    //handleStarClick invoca a função ratingSelected passada pelo pai, enviando o valor da estrela clicada.
    ratingSelected(value.toString());
  };

  const ratingValues = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {ratingValues.map((star) => {
        return (
          <span
            key={star}
            //Quando clicar em uma estrela roda a função "handleStarClick" que passa como parametro "star"
            onClick={() => handleStarClick(star)}
            //star é menor ou igual ao valor de rating? Se sim então adiciona a classe "filled"
            className={`star ${star <= rating ? "filled" : ""}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
