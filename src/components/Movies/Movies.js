import { useContext, useEffect, useState } from 'react';
import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import AppContext from '../../contexts/AppContext';

const Movies = ({ mix }) => {
  // * HOOKS
  const { userState } = useContext(AppContext);
  const { email } = userState;

  // * STATES
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [savedMoviesIds, setSavedMoviesIds] = useState([]);

  // * EFFECTS
  useEffect(() => {
    const renderedMovies = JSON.parse(localStorage.getItem(`${email}-state`)).moviesState
      .foundMovies;
    renderedMovies && setRenderedMovies(renderedMovies);
  }, []);

  return (
    <main className={`${mix} movies`}>
      <SearchForm
        mix='movies__search-form'
        searchPath='/movies'
        setRenderedMovies={setRenderedMovies}
        setSavedMoviesIds={setSavedMoviesIds}
      />
      <MoviesCardList
        mix='movies__movies-card-list'
        renderedMovies={renderedMovies}
        savedMoviesIds={savedMoviesIds}
        renderPath='/movies'
      />
    </main>
  );
};

export default Movies;
