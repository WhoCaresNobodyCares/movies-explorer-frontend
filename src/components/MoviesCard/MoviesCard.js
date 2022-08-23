import { useEffect, useState } from 'react';

import './MoviesCard.css';

import useConvertDuration from '../../utils/customHooks/useConvertDuration';

const MoviesCard = ({ mix, item, path, moviesLogic, savedMoviesIds }) => {
  const [isCardLiked, setIsCardLiked] = useState(false);

  const { image, nameRU, duration, trailerLink } = item;
  const { saveMovie } = moviesLogic;

  const convertedDuration = useConvertDuration(duration);

  useEffect(() => {
    path === '/movies' && savedMoviesIds.includes(item.movieId) && setIsCardLiked(true);
  }, [savedMoviesIds]);

  return (
    <div className={`${mix} movies-card`}>
      <div className="movies-card__container">
        <a href={trailerLink} target="_blank" rel="noreferrer noopener" className="movies-card__link" children="" />
        <img className="movies-card__image" src={image} alt="Изображение карточки" />
      </div>
      <div className="movies-card__description">
        <h2 className="movies-card__title" children={nameRU} />
        <button
          id="moviesCardButton"
          className={path === '/movies' ? `movies-card__movies-button${isCardLiked ? ' movies-card__movies-button_active' : ''}` : 'movies-card__saved-movies-button'}
          name="moviesCardButton"
          aria-label="Совершить действие с карточкой"
          type="button"
          onClick={path === '/movies' ? () => saveMovie(item, setIsCardLiked) : () => {}}
        />
        <span className="movies-card__length" children={convertedDuration} />
      </div>
    </div>
  );
};

export default MoviesCard;
