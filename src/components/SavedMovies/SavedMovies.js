import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useState } from 'react';

const SavedMovies = ({ mix }) => {
  const [renderedMovies, setRenderedMovies] = useState([])

  return (
    <main className={`${mix} saved-movies`}>
      <SearchForm mix="saved-movies__search-form" searchPath="/saved-movies" setRenderedMovies={setRenderedMovies} />
      <MoviesCardList mix="saved-movies__movies-card-list" renderedMovies={renderedMovies} />
    </main>
  );
};

export default SavedMovies;
