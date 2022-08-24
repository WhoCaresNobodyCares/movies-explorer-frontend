import { useEffect, useState } from 'react';
import useConvertMinutes from '../../utils/customHooks/useConvertMinutes';

import './MoviesCard.css';

const MoviesCard = ({ mix, card, savedCardsIds, moviesLogic, path, state, token, setIsPreloaderVisible }) => {
  const [isCardLiked, setIsCardLiked] = useState(false);

  const { image, nameRU, duration, trailerLink } = card;

  const length = useConvertMinutes(duration);

  // !!! moviesLogic

  useEffect(() => {
    if (savedCardsIds) {
      savedCardsIds.includes(card.movieId) && setIsCardLiked(true)
    }
  }, [setIsCardLiked])

  return (
    <div className={`${mix} movies-card`}>
      <div className="movies-card__container">
        <a
          href={trailerLink}
          target="_blank"
          rel="noreferrer noopener"
          className="movies-card__link"
          children=""
        />
        <img
          className="movies-card__image"
          src={image}
          alt="Изображение карточки"
        />
      </div>
      <div className="movies-card__description">
        <h2 className="movies-card__title" children={nameRU} />
        <button
          id="moviesCardButton"
          className={
            path === '/movies'
              ? `movies-card__movies-button${
                  isCardLiked ? ' movies-card__movies-button_active' : ''
                }`
              : 'movies-card__saved-movies-button'
          }
          name="moviesCardButton"
          aria-label="Совершить действие с карточкой"
          type="button"
          onClick={path === '/movies' ? () => moviesLogic.handleLike(card, isCardLiked, setIsCardLiked, state, token, setIsPreloaderVisible) : () => {}}
        />
        <span className="movies-card__length" children={length} />
      </div>
    </div>
  );
};

export default MoviesCard;
