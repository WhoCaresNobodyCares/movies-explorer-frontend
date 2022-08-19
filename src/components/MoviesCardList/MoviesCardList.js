import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import './MoviesCardList.css';

const MoviesCardList = ({ mix }) => {
  const { isPreloaderVisible, renderedCards } = useContext(AppContext);
  return (
    <section className={`${mix} movies-card-list`}>
      <div
        className={
          mix === 'movies__movies-card-list' ? 'movies-card-list__cards' : 'movies-card-list__cards movies-card-list__cards_no-margin'
        }
        children={renderedCards.map((item) => (
          <MoviesCard mix="movies-card-list__movies-card" card={item} key={item.movieId} />
        ))}
      />
      {mix === 'movies__movies-card-list' && (
        <button
          id="movies-card-list-button"
          className="movies-card-list__button"
          name="movies-card-list-button"
          aria-label="Добавить карточки"
          type="button"
          onClick={() => {}}
          children="Еще"
        />
      )}
      <Preloader mix="movies-card-list__preloader" mod_visible={isPreloaderVisible ? 'movies-card-list__preloader_visible' : ''} />
    </section>
  );
};

export default MoviesCardList;
