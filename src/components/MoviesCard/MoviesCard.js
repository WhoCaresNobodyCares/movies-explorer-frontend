import { useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import useConvertMinutes from '../../utils/customHooks/useConvertMinutes';

import './MoviesCard.css';

const MoviesCard = ({ mix, card, savedMoviesIds, renderPath }) => {
  // * PROPS
  const { image, nameRU, duration, trailerLink } = card;

  // * HOOKS
  const { userState, moviesLogic } = useContext(AppContext);
  const length = useConvertMinutes(duration);

  // * STATES
  const [isCardLiked, setIsCardLiked] = useState(false);

  // * EFFECTS
  useEffect(() => {
    savedMoviesIds.some(item => item === card.movieId && setIsCardLiked(true));
  }, []);

  return (
    <div className={`${mix} movies-card`}>
      <div className='movies-card__container'>
        <a
          href={trailerLink}
          target='_blank'
          rel='noreferrer noopener'
          className='movies-card__link'
          children=''
        />
        <img className='movies-card__image' src={image} alt='Изображение карточки' />
      </div>
      <div className='movies-card__description'>
        <h2 className='movies-card__title' children={nameRU} />
        <button
          id='moviesCardButton'
          className={
            renderPath === '/movies'
              ? `movies-card__movies-button${
                  isCardLiked ? ' movies-card__movies-button_active' : ''
                }`
              : 'movies-card__saved-movies-button'
          }
          name='moviesCardButton'
          aria-label='Совершить действие с карточкой'
          type='button'
          onClick={
            renderPath === '/movies'
              ? () => moviesLogic.handleLike(card, savedMoviesIds, setIsCardLiked, userState)
              : () => moviesLogic.handleDelete(card, savedMoviesIds, userState)
          }
        />
        <span className='movies-card__length' children={length} />
      </div>
    </div>
  );
};

export default MoviesCard;
