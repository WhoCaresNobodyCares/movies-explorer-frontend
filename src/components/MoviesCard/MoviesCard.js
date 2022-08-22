import { useState } from 'react';

import './MoviesCard.css';

const MoviesCard = ({ mix, path }) => {
  const [isCardLiked, setIsCardLiked] = useState(false);

  return (
    <div className={`${mix} movies-card`}>
      <div className="movies-card__container">
        <a
          href={'https/'}
          target="_blank"
          rel="noreferrer noopener"
          className="movies-card__link"
          children=""
        />
        <img
          className="movies-card__image"
          src="https://hddesktopwallpapers.in/wp-content/uploads/2015/09/kitty-cat-wallpaper.jpg"
          alt="Изображение карточки"
        />
      </div>
      <div className="movies-card__description">
        <h2 className="movies-card__title" children="33 слова о дизайне" />
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
          onClick={path === '/movies' ? () => setIsCardLiked(!isCardLiked) : () => {}}
        />
        <span className="movies-card__length" children="1ч 3м" />
      </div>
    </div>
  );
};

export default MoviesCard;
