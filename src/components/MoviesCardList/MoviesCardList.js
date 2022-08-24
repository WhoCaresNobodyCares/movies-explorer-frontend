import { useEffect, useState } from 'react';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ mix, isPreloaderVisible, setIsPreloaderVisible, lastFoundMovies, savedCardsIds, moviesLogic, path, state, token }) => {
  const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

  const [renderedMovies, setRenderedMovies] = useState([])

  const isButtonVisible = false; // !!!
  const isNotFoundVisible = true;

  useEffect(() => {
    setRenderedMovies(lastFoundMovies)
  }, [isPreloaderVisible])

  return (
    <section className={`${mix} movies-card-list`}>
      <div
        className={
          isButtonVisible // !!!
            ? 'movies-card-list__cards'
            : 'movies-card-list__cards movies-card-list__cards_no-margin'
        }
        children={renderedMovies.map((item) => (
          <MoviesCard
            mix="movies-card-list__movies-card"
            card={item}
            key={item.movieId}
            savedCardsIds={savedCardsIds}
            moviesLogic={moviesLogic}
            path={path}
            state={state}
            token={token}
            setIsPreloaderVisible={setIsPreloaderVisible}
          />
        ))}
      />
      {isButtonVisible && ( // !!!
        <button
          id="moviesCardListButton"
          className="movies-card-list__button"
          name="moviesCardListButton"
          aria-label="Добавить карточки"
          type="button"
          onClick={() => {
            // setIsPreloaderVisible(!isPreloaderVisible);
          }}
          children={CONTENT_CONFIG.MoviesCardList.button}
        />
      )}
      <Preloader
        mix="movies-card-list__preloader"
        mod_visible={
          isPreloaderVisible ? 'movies-card-list__preloader_visible' : ''
        }
      />
      <div
        className={
          isNotFoundVisible
            ? 'movies-card-list__not-found movies-card-list__not-found_visible'
            : 'movies-card-list__not-found'
        }
        children={
          <span className="movies-card-list__not-found-message">
            {CONTENT_CONFIG.MoviesCardList.notFound}
          </span>
        }
      />
    </section>
  );
};

export default MoviesCardList;
