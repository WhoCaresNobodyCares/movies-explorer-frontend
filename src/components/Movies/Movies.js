import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({
  mix,
  state,
  token,
  formLogic,
  viewportWidth,
  formHandler,
  location,
  isPreloaderVisible,
  moviesLogic,
  setIsPreloaderVisible

}) => {
  const { moviesState = {}, savedCardsIds = [] } = state;
  const {
    initialValue = { searchFormInput: 'Фильмы' },
    inputValue = { searchFormInput: ['Фильмы'] },
    isCheckboxChecked = false,
    lastFoundMovies = [],
  } = moviesState;

  return (
    <main className={`${mix} movies`}>
      <SearchForm
        mix="movies__search-form"
        token={token}
        formLogic={formLogic}
        viewportWidth={viewportWidth}
        formHandler={formHandler}
        location={location}
        initialValueLocal={initialValue}
        inputValueLocal={inputValue}
        isCheckboxCheckedLocal={isCheckboxChecked}
        state={state}
        path="/movies"
        lastFoundMovies={lastFoundMovies}
      />
      <MoviesCardList
        mix="movies__movies-card-list"
        isPreloaderVisible={isPreloaderVisible}
        lastFoundMovies={lastFoundMovies}
        savedCardsIds={savedCardsIds}
        moviesLogic={moviesLogic}
        path="/movies"
        state={state}
        token={token}
        setIsPreloaderVisible={setIsPreloaderVisible}
      />
    </main>
  );
};

export default Movies;
