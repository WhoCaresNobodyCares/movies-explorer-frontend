import { useState } from 'react';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const MoviesCardList = () => {
  // * STATES
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);

  // !!! BULLSHIT
  const renderedMovies = [];
  const isButtonVisible = false; // !!!
  const isNotFoundVisible = true;

  return (
    <section className='movies-card-list'>
      <div
        className={
          isButtonVisible // !!!
            ? 'movies-card-list__cards'
            : 'movies-card-list__cards movies-card-list__cards_no-margin'
        }
        children={renderedMovies.map(item => (
          <MoviesCard card={item} key={item.movieId} />
        ))}
      />
      {isButtonVisible && ( // !!!
        <button
          id='moviesCardListButton'
          className='movies-card-list__button'
          name='moviesCardListButton'
          aria-label='Добавить карточки'
          type='button'
          onClick={() => {
            setIsPreloaderVisible(!isPreloaderVisible);
          }}
          children={CONTENT_CONFIG.MoviesCardList.button}
        />
      )}
      <Preloader
        mix='movies-card-list__preloader'
        mod_visible={isPreloaderVisible ? 'movies-card-list__preloader_visible' : ''}
      />
      <div
        className={
          isNotFoundVisible
            ? 'movies-card-list__not-found movies-card-list__not-found_visible'
            : 'movies-card-list__not-found'
        }
        children={
          <span className='movies-card-list__not-found-message'>
            {CONTENT_CONFIG.MoviesCardList.notFound}
          </span>
        }
      />
    </section>
  );
};

export default MoviesCardList;
