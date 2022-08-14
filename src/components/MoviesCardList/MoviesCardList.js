import { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import './MoviesCardList.css';

const MoviesCardList = ({ mix }) => {
  const cards = [
    { mix: 'movies-card-list__movies-card', key: '1' },
    { mix: 'movies-card-list__movies-card', key: '2' },
    { mix: 'movies-card-list__movies-card', key: '3' },
  ];

  const [preloaderIsVisible, setPreloaderIsVisible] = useState(false);

  return (
    <section className={`${mix} movies-card-list`}>
      <div
        className={
          mix === 'movies__movies-card-list' ? 'movies-card-list__cards' : 'movies-card-list__cards movies-card-list__cards_no-margin'
        }
        children={cards.map((item) => (
          <MoviesCard mix={item.mix} key={item.key} />
        ))}
      />
      {mix === 'movies__movies-card-list' && (
        <button
          id="movies-card-list-button"
          className="movies-card-list__button"
          name="movies-card-list-button"
          aria-label="Добавить карточки"
          type="button"
          onClick={() => {
            setPreloaderIsVisible(!preloaderIsVisible);
          }}
          children="Еще"
        />
      )}
      <Preloader mix="movies-card-list__preloader" mod_visible={preloaderIsVisible ? 'movies-card-list__preloader_visible' : ''} />
    </section>
  );
};

export default MoviesCardList;
