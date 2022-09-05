import { useEffect, useState } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import moviesApi from '../../utils/apis/MoviesApi';
import mainApi from '../../utils/apis/MainApi';
import { getSavedMoviesIds, searchMovies, validateMovies } from '../../utils/functions/handleMovies';
import LikedMoviesContext from '../../contexts/LikedMoviesContext';
const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const Movies = ({ mix, setPopupState }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [moviesState, setMoviesState] = useState({
    movies: [],
    savedMovies: [],
    savedMoviesIds: [],
    foundMovies: [],
  });

  const { movies, savedMoviesIds, foundMovies } = moviesState;

  const handleSearch = (e, value, isCheckboxChecked) => {
    e !== null && e.preventDefault();
    setIsPreloaderVisible(true);
    if (movies.length === 0 && value.length !== 0) {
      Promise.all([moviesApi.getMovies(), mainApi.getMovies(localStorage.getItem('token'))])
        .then(([movies, savedMovies]) => ({
          movies: validateMovies(movies),
          savedMovies,
          savedMoviesIds: getSavedMoviesIds(validateMovies(movies), savedMovies),
          foundMovies: searchMovies(validateMovies(movies), value, isCheckboxChecked),
        }))
        .then(({ movies, savedMovies, savedMoviesIds, foundMovies }) => {
          localStorage.setItem('moviesState', JSON.stringify({ movies, savedMovies, savedMoviesIds, foundMovies }));
          return { movies, savedMovies, savedMoviesIds, foundMovies };
        })
        .then(({ movies, savedMovies, savedMoviesIds, foundMovies }) =>
          setMoviesState({ movies, savedMovies, savedMoviesIds, foundMovies })
        )
        .then(() => setIsPreloaderVisible(false))
        .catch(err => err.status === 500 && setPopupState(CONTENT_CONFIG.InfoPopup.movies.err500));
    } else if (movies.length !== 0 && value.length !== 0) {
      localStorage.setItem(
        'moviesState',
        JSON.stringify({
          ...JSON.parse(localStorage.getItem('moviesState')),
          foundMovies: searchMovies(movies, value, isCheckboxChecked),
        })
      );
      setMoviesState({ ...moviesState, foundMovies: searchMovies(movies, value, isCheckboxChecked) });
      setIsPreloaderVisible(false);
    } else {
      setIsPreloaderVisible(false);
      setPopupState(CONTENT_CONFIG.InfoPopup.movies.emptyValue);
    }
  };

  const handleLike = (card, setIsCardLiked) => {
    const { country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN } = card;
    mainApi
      .addMovie(
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
        localStorage.getItem('token')
      )
      .then(res => {
        localStorage.setItem(
          'moviesState',
          JSON.stringify({
            ...moviesState,
            savedMovies: moviesState.savedMovies.concat(res),
            savedMoviesIds: moviesState.savedMoviesIds.concat(movieId),
          })
        );
      })
      .then(() => setMoviesState(JSON.parse(localStorage.getItem('moviesState'))))
      .then(() => setIsCardLiked(true))
      .catch(err => {
        err.status === 400 && setPopupState(CONTENT_CONFIG.InfoPopup.searchForm.err400);
        err.status === 500 && setPopupState(CONTENT_CONFIG.InfoPopup.searchForm.err500);
      });
  };

  const handleDelete = (movieId, setIsCardLiked) => {
    let mongoId;
    let indexToRemoveFromSavedMovies;
    let indexToRemoveFromSavedMoviesIds;

    for (let i = 0; i < moviesState.savedMovies.length; i++) {
      const elm = moviesState.savedMovies[i];
      if (elm.movieId === movieId) {
        mongoId = elm._id;
        indexToRemoveFromSavedMovies = moviesState.savedMovies.indexOf(elm);
        indexToRemoveFromSavedMoviesIds = moviesState.savedMoviesIds.indexOf(elm.movieId);
      }
    }

    mainApi
      .deleteMovie(mongoId, localStorage.getItem('token'))
      .then(() => {
        let newSavedMovies = [...moviesState.savedMovies];
        newSavedMovies.splice(indexToRemoveFromSavedMovies, 1);

        let newSavedMoviesIds = [...moviesState.savedMoviesIds];
        newSavedMoviesIds.splice(indexToRemoveFromSavedMoviesIds, 1);

        localStorage.setItem(
          'moviesState',
          JSON.stringify({
            ...moviesState,
            savedMovies: newSavedMovies,
            savedMoviesIds: newSavedMoviesIds,
          })
        );
      })
      .then(() => setMoviesState(JSON.parse(localStorage.getItem('moviesState'))))
      .then(() => setIsCardLiked(false))
      .catch(err => {
        err.status === 403 && setPopupState(CONTENT_CONFIG.InfoPopup.searchForm.err403);
        err.status === 404 && setPopupState(CONTENT_CONFIG.InfoPopup.searchForm.err404);
        err.status === 500 && setPopupState(CONTENT_CONFIG.InfoPopup.searchForm.err500);
      });
  };

  useEffect(() => {
    const data = localStorage.getItem('moviesState');
    data && setMoviesState(JSON.parse(data));
  }, []);

  return (
    <LikedMoviesContext.Provider value={savedMoviesIds}>
      <main className={`${mix} movies`}>
        <SearchForm handleSearch={handleSearch} />
        <MoviesCardList
          isPreloaderVisible={isPreloaderVisible}
          renderedMovies={foundMovies}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      </main>
    </LikedMoviesContext.Provider>
  );
};

export default Movies;
