import { useEffect, useState } from 'react';

import useAllowedPaths from '../../utils/customHooks/useAllowedPaths';

import './MoviesCard.css';

const MoviesCard = ({ mix, item, onClick, liked }) => {
  const [moviesCard] = useAllowedPaths(['/movies']);
  const [isLiked, setIsLiked] = useState(false);

  const convertMinutes = (totalMinutes) => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${hours}ч ${minutes}м`;
  };

  useEffect(() => {
    if (liked === true) {
      setIsLiked(true);
    }
  });

  return (
    <div className={`${mix} movies-card`}>
      <div className="movies-card__container">
        <a
          className="movies-card__overlay"
          href={item.trailerLink}
          target="_blank"
          rel="noreferrer noopener"
          key={item.key}
          children={item.text}
        />
        <img className="movies-card__image" src={mix === 'movies__card' ? `https://api.nomoreparties.co/${item.image.url}` : item.image} alt="Изображение карточки" />
      </div>
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
          onClick={
            moviesCard
              ? () => {
                  onClick(item, setIsLiked, isLiked);
                }
              : () => {}
          }
        />
        <span className="movies-card__length" children={convertMinutes(item.duration)} />
      </div>
    </div>
  );
};

export default MoviesCard;
