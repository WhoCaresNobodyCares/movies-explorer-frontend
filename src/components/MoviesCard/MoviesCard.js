import { useState } from 'react';

import useAllowedPaths from '../../utils/customHooks/useAllowedPaths';

import './MoviesCard.css';

const MoviesCard = ({ mix }) => {
  const [moviesCard] = useAllowedPaths(['/movies']);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={`${mix} movies-card`}>
      <img
        className="movies-card__image"
        src="https://hddesktopwallpapers.in/wp-content/uploads/2015/09/kitty-cat-wallpaper.jpg"
        alt="Изображение карточки"
      />
      <div className="movies-card__description">
        <h2 className="movies-card__title" children="33 слова о дизайне" />
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
