import { useState } from 'react';
import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ mix }) => {
  const [renderedMovies, setRenderedMovies] = useState([])

  return (
    <main className={`${mix} movies`}>
      <SearchForm mix="movies__search-form" searchPath="/movies" setRenderedMovies={setRenderedMovies} />
      <MoviesCardList mix="movies__movies-card-list" renderedMovies={renderedMovies} />
    </main>
  );
};

export default Movies;
