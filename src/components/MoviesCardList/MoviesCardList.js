import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import useMoviesLayout from '../../utils/customHooks/useCardsLayout';
import { useEffect, useRef } from 'react';

const MoviesCardList = ({ mix, path, moviesLogic }) => {
  const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

  const isMounted = useRef(false);

  const { isPreloaderVisible, allMoviesPrepared, allSavedMoviesPrepared, savedMoviesIds } = moviesLogic;

  const allMoviesLayout = useMoviesLayout(allMoviesPrepared);
  const allMoviesRenderedSection = allMoviesLayout.renderedSection;
  const allMoviesAddMoreMovies = allMoviesLayout.addMoreMovies;
  const allMoviesResetLayout = allMoviesLayout.resetLayout;
  const allMoviesIsButtonVisible = allMoviesLayout.isButtonVisible;

  const savedMoviesLayout = useMoviesLayout(allSavedMoviesPrepared);
  const allSavedMoviesRenderedSection = savedMoviesLayout.renderedSection;
  const allSavedMoviesAddMoreMovies = savedMoviesLayout.addMoreMovies;
  const allSavedMoviesResetLayout = savedMoviesLayout.resetLayout;
  const allSavedMoviesIsButtonVisible = savedMoviesLayout.isButtonVisible;

  useEffect(() => {
    if (isMounted.current === true) {
    } else {
      allMoviesResetLayout();
      allSavedMoviesResetLayout();
      isMounted.current = true;
    }
  }, []);

  return (
    <section className={`${mix} movies-card-list`}>
      <div
        className={allMoviesIsButtonVisible ? 'movies-card-list__cards' : 'movies-card-list__cards movies-card-list__cards_no-margin'}
        children={
          path === '/movies'
            ? allMoviesRenderedSection.map((item) => <MoviesCard mix="movies-card-list__card" item={item} key={item.nameEN} path={path} moviesLogic={moviesLogic} savedMoviesIds={savedMoviesIds} />)
            : allSavedMoviesRenderedSection.map((item) => (
                <MoviesCard mix="movies-card-list__card" item={item} key={item.nameEN} path={path} moviesLogic={moviesLogic} savedMoviesIds={savedMoviesIds} />
              ))
        }
      />
      {allMoviesIsButtonVisible && allSavedMoviesIsButtonVisible && (
        <button
          id="moviesCardListButton"
          className="movies-card-list__button"
          name="moviesCardListButton"
          aria-label="Добавить карточки"
          type="button"
          onClick={() => {
            path === '/movies' ? allMoviesAddMoreMovies() : allSavedMoviesAddMoreMovies();
          }}
          children={CONTENT_CONFIG.MoviesCardList.button}
        />
      )}
      <Preloader mix="movies-card-list__preloader" mod_visible={isPreloaderVisible ? 'movies-card-list__preloader_visible' : ''} />
      <div
        className={
          path === '/movies'
            ? allMoviesPrepared.length === 0
              ? 'movies-card-list__not-found movies-card-list__not-found_visible'
              : 'movies-card-list__not-found'
            : allSavedMoviesPrepared.length === 0
            ? 'movies-card-list__not-found movies-card-list__not-found_visible'
            : 'movies-card-list__not-found'
        }
        children={<span className="movies-card-list__not-found-message">{CONTENT_CONFIG.MoviesCardList.notFound}</span>}
      />
    </section>
  );
};

export default MoviesCardList;
