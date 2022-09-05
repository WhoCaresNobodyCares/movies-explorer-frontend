import { useEffect, useState } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import moviesApi from '../../utils/apis/MoviesApi';
import mainApi from '../../utils/apis/MainApi';
import useMoviesOperations from '../../utils/hooks/useMoviesOperations';
import LikedMoviesContext from '../../contexts/LikedMoviesContext';
const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const Movies = ({ mix, setPopupState }) => {
  const { getSavedMoviesIds, searchMovies, validateMovies } =
    useMoviesOperations();

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
      Promise.all([
        moviesApi.getMovies(),
        mainApi.getMovies(localStorage.getItem('token')),
      ])
        .then(([movies, savedMovies]) => ({
          movies: validateMovies(movies),
          savedMovies,
          savedMoviesIds: getSavedMoviesIds(
            validateMovies(movies),
            savedMovies
          ),
          foundMovies: searchMovies(
            validateMovies(movies),
            value,
            isCheckboxChecked
          ),
        }))
        .then(({ movies, savedMovies, savedMoviesIds, foundMovies }) => {
          localStorage.setItem(
            'moviesState',
            JSON.stringify({ movies, savedMovies, savedMoviesIds, foundMovies })
          );
          return { movies, savedMovies, savedMoviesIds, foundMovies };
        })
        .then(({ movies, savedMovies, savedMoviesIds, foundMovies }) =>
          setMoviesState({ movies, savedMovies, savedMoviesIds, foundMovies })
        )
        .then(() => setIsPreloaderVisible(false))
        .catch(
          err =>
            err.status === 500 &&
            setPopupState(CONTENT_CONFIG.InfoPopup.movies.err500)
        );
    } else if (movies.length !== 0 && value.length !== 0) {
      localStorage.setItem(
        'moviesState',
        JSON.stringify({
          ...moviesState,
          foundMovies: searchMovies(movies, value, isCheckboxChecked),
        })
      );
      setMoviesState({
        ...moviesState,
        foundMovies: searchMovies(movies, value, isCheckboxChecked),
      });
      setIsPreloaderVisible(false);
    } else {
      setIsPreloaderVisible(false);
      setPopupState(CONTENT_CONFIG.InfoPopup.movies.emptyValue);
    }
  };

  const handleLike = (card, setIsCardLiked) => {
    const {
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
    } = card;
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
      .then(() =>
        setMoviesState(JSON.parse(localStorage.getItem('moviesState')))
      )
      .then(() => setIsCardLiked(true))
      .catch(err => {
        err.status === 400 &&
          setPopupState(CONTENT_CONFIG.InfoPopup.searchForm.err400);
        err.status === 500 &&
          setPopupState(CONTENT_CONFIG.InfoPopup.searchForm.err500);
      });
  };

  const handleDelete = (movieId, setIsCardLiked) => {
    let mongoId;
    let indexToRemoveFromSavedMovies;
    let indexToRemoveFromSavedMoviesIds;
    const { savedMovies, savedMoviesIds } = moviesState;

    for (let i = 0; i < savedMovies.length; i++) {
      const elm = savedMovies[i];
      if (elm.movieId === movieId) {
        [
          mongoId,
          indexToRemoveFromSavedMovies,
          indexToRemoveFromSavedMoviesIds,
        ] = [
          elm._id,
          savedMovies.indexOf(elm),
          savedMoviesIds.indexOf(elm.movieId),
        ];
      }
    }

    mainApi
      .deleteMovie(mongoId, localStorage.getItem('token'))
      .then(() => {
        const [newSavedMovies, newSavedMoviesIds] = [
          [...savedMovies],
          [...savedMoviesIds],
        ];
        newSavedMovies.splice(indexToRemoveFromSavedMovies, 1);
        newSavedMoviesIds.splice(indexToRemoveFromSavedMoviesIds, 1);
        return { newSavedMovies, newSavedMoviesIds };
      })
      .then(({ newSavedMovies, newSavedMoviesIds }) =>
        localStorage.setItem(
          'moviesState',
          JSON.stringify({
            ...moviesState,
            savedMovies: newSavedMovies,
            savedMoviesIds: newSavedMoviesIds,
          })
        )
      )
      .then(() =>
        setMoviesState(JSON.parse(localStorage.getItem('moviesState')))
      )
      .then(() => setIsCardLiked(false))
      .catch(err => {
        err.status === 403 &&
          setPopupState(CONTENT_CONFIG.InfoPopup.searchForm.err403);
        err.status === 404 &&
          setPopupState(CONTENT_CONFIG.InfoPopup.searchForm.err404);
        err.status === 500 &&
          setPopupState(CONTENT_CONFIG.InfoPopup.searchForm.err500);
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
