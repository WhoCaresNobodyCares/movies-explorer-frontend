import { useEffect, useState } from 'react';

import moviesApi from '../../apis/MoviesApi';

import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ mix }) => {
  const [cards, setCards] = useState([]);
  const [cardListIsRendered, setCardListIsRendered] = useState(false);

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((arr) => setCards(arr))
      .catch((err) => console.log(`MoviesApi error: ${err}`));
  }, []);

  return (
    <main className={`${mix} movies`}>
      <SearchForm mix="movies__search-form" />
      {cardListIsRendered && <MoviesCardList mix="movies__movies-card-list" />}
    </main>
  );
};

export default Movies;
