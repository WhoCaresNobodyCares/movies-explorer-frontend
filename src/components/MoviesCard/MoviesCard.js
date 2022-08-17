import { useState } from 'react';

import useAllowedPaths from '../../utils/customHooks/useAllowedPaths';

import './MoviesCard.css';

const MoviesCard = ({ mix, item }) => {
  const [moviesCard] = useAllowedPaths(['/movies']);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={`${mix} movies-card`}>
      <img className="movies-card__image" src={`https://api.nomoreparties.co/${item.image.url}`} alt="Изображение карточки" />
      <div className="movies-card__description">
        <h2 className="movies-card__title" children={item.nameRU} />
        <button
          id="movies-card-button"
          className={
            moviesCard
              ? `movies-card__movies-button${isLiked ? ' movies-card__movies-button_active' : ''}`
              : 'movies-card__saved-movies-button'
          }
          name="movies-card-button"
          aria-label="Совершить действие с карточкой"
          type="button"
          onClick={moviesCard ? () => setIsLiked(!isLiked) : () => {}}
        />
        <span className="movies-card__length" children="1ч 3м" />
      </div>
    </div>
  );
};

export default MoviesCard;
