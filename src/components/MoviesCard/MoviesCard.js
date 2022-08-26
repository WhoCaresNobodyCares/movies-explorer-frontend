import { useState } from 'react';

import './MoviesCard.css';

const MoviesCard = () => {
  // * STATES
  const [isCardLiked, setIsCardLiked] = useState(false);

  return (
    <div className='movies-card'>
      <div className='movies-card__container'>
        <a
          href={'link'}
          target='_blank'
          rel='noreferrer noopener'
          className='movies-card__link'
          children=''
        />
        <img className='movies-card__image' src={'link'} alt='Изображение карточки' />
      </div>
      <div className='movies-card__description'>
        <h2 className='movies-card__title' children={'text'} />
        <button
          id='moviesCardButton'
          className={
            true
              ? `movies-card__movies-button${
                  isCardLiked ? ' movies-card__movies-button_active' : ''
                }`
              : 'movies-card__saved-movies-button'
          }
          name='moviesCardButton'
          aria-label='Совершить действие с карточкой'
          type='button'
          onClick={true ? () => {} : () => {}}
        />
        <span className='movies-card__length' children={'25'} />
      </div>
    </div>
  );
};

export default MoviesCard;
