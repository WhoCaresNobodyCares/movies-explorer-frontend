import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import useMoviesLayout from '../../utils/hooks/useMoviesLayout';
import { useEffect, useRef, useState } from 'react';
const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const MoviesCardList = ({ isPreloaderVisible, renderedMovies, handleLike, handleDelete }) => {
  const { renderedSection, addMoreMovies, isButtonVisible } = useMoviesLayout(renderedMovies);

  const initialRender = useRef(true);
  const [isNotFoundDisplayed, setIsNotFoundDisplayed] = useState(false);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setIsNotFoundDisplayed(true);
    }
  }, [renderedMovies]);

  return (
    <section className='movies-card-list'>
      <div
        className={renderedSection.length !== 0 ? 'movies-card-list__cards' : 'movies-card-list__cards movies-card-list__cards_no-margin'}
        children={renderedSection.map(item => (
          <MoviesCard card={item} key={item.movieId} handleLike={handleLike} handleDelete={handleDelete} />
        ))}
      />
      {isButtonVisible && (
        <button
          id='moviesCardListButton'
          className='movies-card-list__button'
          name='add'
          aria-label='Добавить карточки'
          type='button'
          onClick={() => addMoreMovies()}
          children={CONTENT_CONFIG.MoviesCardList.button}
        />
      )}
      <Preloader mix='movies-card-list__preloader' mod_visible={isPreloaderVisible ? 'movies-card-list__preloader_visible' : ''} />
      <div
        className={
          isNotFoundDisplayed && renderedMovies.length === 0
            ? 'movies-card-list__not-found movies-card-list__not-found_visible'
            : 'movies-card-list__not-found'
        }
        children={<span className='movies-card-list__not-found-message'>{CONTENT_CONFIG.MoviesCardList.notFound}</span>}
      />
    </section>
  );
};

export default MoviesCardList;
