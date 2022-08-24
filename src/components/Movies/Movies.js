import { useContext, useEffect, useState } from 'react';
import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import UserContext from '../../contexts/UserContext';

const Movies = ({ mix }) => {
  const { email } = useContext(UserContext);

  const [renderedMovies, setRenderedMovies] = useState(
    JSON.parse(localStorage.getItem(`${email}-state`))
      ? JSON.parse(localStorage.getItem(`${email}-state`)).moviesState
          .foundMovies
      : []
  );
  const [savedMoviesIds, setSavedMoviesIds] = useState([]);

  useEffect(() => {
    setRenderedMovies(
      JSON.parse(localStorage.getItem(`${email}-state`))
        ? JSON.parse(localStorage.getItem(`${email}-state`)).moviesState
            .foundMovies
        : []
    );
  }, []);

  return (
    <main className={`${mix} movies`}>
      <SearchForm
        mix="movies__search-form"
        searchPath="/movies"
        setRenderedMovies={setRenderedMovies}
        setSavedMoviesIds={setSavedMoviesIds}
      />
      <MoviesCardList
        mix="movies__movies-card-list"
        renderedMovies={renderedMovies}
        savedMoviesIds={savedMoviesIds}
        renderPath="/movies"
      />
    </main>
  );
};

export default Movies;
