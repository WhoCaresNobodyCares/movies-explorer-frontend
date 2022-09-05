import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LikedMoviesContext from '../../contexts/LikedMoviesContext';
import './MoviesCard.css';

const MoviesCard = ({ card, handleLike, handleDelete }) => {
  const location = useLocation().pathname;
  const savedMoviesIds = useContext(LikedMoviesContext);

  const { image, nameRU, duration, trailerLink, movieId } = card;

  const [isCardLiked, setIsCardLiked] = useState(false);

  const convertMinutes = totalMinutes => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${hours}ч ${minutes}м`;
  };

  useEffect(() => {
    location === '/movies' &&
      savedMoviesIds.some(
        item => item === card.movieId && setIsCardLiked(true)
      );
  }, [savedMoviesIds]);

  return (
    <div className='movies-card'>
      <div className='movies-card__container'>
        <a
          href={trailerLink}
          target='_blank'
          rel='noreferrer noopener'
          className='movies-card__link'
          children=''
        />
        <img
          className='movies-card__image'
          src={image}
          alt='Изображение карточки'
        />
      </div>
      <div className='movies-card__description'>
        <h2 className='movies-card__title' children={nameRU} />
        <button
          id='moviesCardButton'
          className={
            location === '/movies'
              ? `movies-card__movies-button${
                  isCardLiked ? ' movies-card__movies-button_active' : ''
                }`
              : 'movies-card__saved-movies-button'
          }
          name='action'
          aria-label='Совершить действие с карточкой'
          type='button'
          onClick={
            location === '/movies'
              ? () =>
                  isCardLiked
                    ? handleDelete(movieId, setIsCardLiked)
                    : handleLike(card, setIsCardLiked)
              : () => handleDelete(card._id)
          }
        />
        <span
          className='movies-card__length'
          children={convertMinutes(duration)}
        />
      </div>
    </div>
  );
};

export default MoviesCard;
