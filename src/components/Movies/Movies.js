import { useEffect, useState } from 'react';
import moviesApi from '../../apis/MoviesApi';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useLocation } from 'react-router-dom';

const Movies = ({ mix }) => {
  const location = useLocation().pathname;

  const [cards, setCards] = useState([]);
  const [cardListIsRendered, setCardListIsRendered] = useState(false);

  const renderer = (data) => {
    setCards(data);
  };

  return (
    <main className={`${mix} movies`}>
      <SearchForm mix="movies__search-form" location={location} renderer={renderer} />
      {true && <MoviesCardList mix="movies__movies-card-list" cards={cards} />}
    </main>
  );
};

export default Movies;
