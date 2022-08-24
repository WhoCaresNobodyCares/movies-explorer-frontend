import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';

const SavedMovies = ({ mix }) => {
  const { email } = useContext(UserContext);

  const [renderedMovies, setRenderedMovies] = useState(
    JSON.parse(localStorage.getItem(`${email}-state`))
      ? JSON.parse(localStorage.getItem(`${email}-state`)).savedMovies
      : []
  );
  const [savedMoviesIds, setSavedMoviesIds] = useState([]);

  useEffect(() => {
    setRenderedMovies(
      JSON.parse(localStorage.getItem(`${email}-state`))
        ? JSON.parse(localStorage.getItem(`${email}-state`)).savedMovies
        : []
    );
  }, []);

  return (
    <main className={`${mix} saved-movies`}>
      <SearchForm
        mix="saved-movies__search-form"
        searchPath="/saved-movies"
        setRenderedMovies={setRenderedMovies}
        setSavedMoviesIds={setSavedMoviesIds}
      />
      <MoviesCardList
        mix="saved-movies__movies-card-list"
        renderedMovies={renderedMovies}
        savedMoviesIds={savedMoviesIds}
        renderPath="/saved-movies"
      />
    </main>
  );
};

export default SavedMovies;
