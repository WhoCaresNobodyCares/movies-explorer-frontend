import { useState } from 'react';

import useAllowedPaths from '../../utils/customHooks/useAllowedPaths';

import './MoviesCard.css';

const MoviesCard = ({ mix, card }) => {
  const [moviesCard] = useAllowedPaths(['/movies']);
  const [isLiked, setIsLiked] = useState(false);
  const { image, nameRU, duration } = card;

  const convertMinutes = (totalMinutes) => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${hours}ч ${minutes}м`;
  };

  return (
    <div className={`${mix} movies-card`}>
      <img className="movies-card__image" src={image} alt="Изображение карточки" />
      <div className="movies-card__description">
        <h2 className="movies-card__title" children={nameRU} />
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
        <span className="movies-card__length" children={convertMinutes(duration)} />
      </div>
    </div>
  );
};

export default MoviesCard;
