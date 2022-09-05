import { useEffect, useState } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import mainApi from '../../utils/apis/MainApi';
import { searchMovies } from '../../utils/functions/handleMovies';
const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const SavedMovies = ({ mix, setPopupState }) => {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [savedMoviesState, setSavedMoviesState] = useState({
    savedMovies: [],
    foundMovies: [],
  });
  const { savedMovies, foundMovies } = savedMoviesState;

  const handleSearch = (e, value, isCheckboxChecked) => {
    e !== null && e.preventDefault();
    setIsPreloaderVisible(true);
    localStorage.setItem(
      'savedMoviesState',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('savedMoviesState')),
        foundMovies: searchMovies(savedMovies, value, isCheckboxChecked),
      })
    );
    setSavedMoviesState({ ...savedMoviesState, foundMovies: searchMovies(savedMovies, value, isCheckboxChecked) });
    setIsPreloaderVisible(false);
  };

  const handleDelete = mongoId => {
    mainApi
      .deleteMovie(mongoId, localStorage.getItem('token'))
      .then(res => {
        if (JSON.parse(localStorage.getItem('moviesState')) !== null) {
          const moviesState = JSON.parse(localStorage.getItem('moviesState'));

          let movieId = res.movieId;
          let indexToRemoveFromSavedMovies;
          let indexToRemoveFromSavedMoviesIds;

          for (let i = 0; i < moviesState.savedMovies.length; i++) {
            const elm = moviesState.savedMovies[i];
            if (elm.movieId === movieId) {
              indexToRemoveFromSavedMovies = moviesState.savedMovies.indexOf(elm);
              indexToRemoveFromSavedMoviesIds = moviesState.savedMoviesIds.indexOf(elm.movieId);
            }
          }

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

          const { value, isCheckboxChecked } = JSON.parse(localStorage.getItem('savedMoviesSearchState'));

          localStorage.setItem(
            'savedMoviesState',
            JSON.stringify({
              foundMovies: searchMovies(
                newSavedMovies,
                value
                  .replace(/\s+/g, ' ')
                  .split(' ')
                  .map(item => item !== '' && item)
                  .filter(Boolean),
                isCheckboxChecked
              ),
              savedMovies: newSavedMovies,
            })
          );
        } else {
          let movieId = res.movieId;
          let indexToRemoveFromSavedMovies;

          for (let i = 0; i < savedMovies.length; i++) {
            const elm = savedMovies[i];
            if (elm.movieId === movieId) {
              indexToRemoveFromSavedMovies = savedMovies.indexOf(elm);
            }
          }

          let newSavedMovies = [...savedMovies];
          newSavedMovies.splice(indexToRemoveFromSavedMovies, 1);

          const { value, isCheckboxChecked } = JSON.parse(localStorage.getItem('savedMoviesSearchState'));

          localStorage.setItem(
            'savedMoviesState',
            JSON.stringify({
              foundMovies: searchMovies(
                newSavedMovies,
                value
                  .replace(/\s+/g, ' ')
                  .split(' ')
                  .map(item => item !== '' && item)
                  .filter(Boolean),
                isCheckboxChecked
              ),
              savedMovies: newSavedMovies,
            })
          );
        }
      })
      .then(() => {
        setSavedMoviesState(JSON.parse(localStorage.getItem('savedMoviesState')));
      })
      .catch(err => {
        err.status === 403 && setPopupState(CONTENT_CONFIG.InfoPopup.savedMovies.err403);
        err.status === 404 && setPopupState(CONTENT_CONFIG.InfoPopup.savedMovies.err404);
        err.status === 500 && setPopupState(CONTENT_CONFIG.InfoPopup.savedMovies.err500);
      });
  };

  useEffect(() => {
    setIsPreloaderVisible(true);
    mainApi
      .getMovies(localStorage.getItem('token'))
      .then(savedMovies => {
        const { value, isCheckboxChecked } = JSON.parse(localStorage.getItem('savedMoviesSearchState'));

        localStorage.setItem(
          'savedMoviesState',
          JSON.stringify({
            savedMovies,
            foundMovies: searchMovies(
              savedMovies,
              value
                .replace(/\s+/g, ' ')
                .split(' ')
                .map(item => item !== '' && item)
                .filter(Boolean),
              isCheckboxChecked
            ),
          })
        );
      })
      .then(() => setSavedMoviesState(JSON.parse(localStorage.getItem('savedMoviesState'))))
      .then(() => setIsPreloaderVisible(false))
      .catch(err => err.status === 500 && setPopupState(CONTENT_CONFIG.InfoPopup.savedMovies.err500));
  }, []);

  return (
    <main className={`${mix} saved-movies`}>
      <SearchForm handleSearch={handleSearch} />
      <MoviesCardList isPreloaderVisible={isPreloaderVisible} renderedMovies={foundMovies} handleDelete={handleDelete} />
    </main>
  );
};

export default SavedMovies;
