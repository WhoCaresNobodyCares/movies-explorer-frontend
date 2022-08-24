import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({
  mix,
  state,
  formLogic,
  viewportWidth,
  formHandler,
  location,
  token,
  isPreloaderVisible,
  moviesLogic,
  setIsPreloaderVisible
}) => {
  const { savedMoviesState = {}, savedCardsIds = [] } = state;
  const {
    initialValue = { searchFormInput: 'Сохраненные фильмы' },
    inputValue = { searchFormInput: ['Сохраненные', 'фильмы'] },
    isCheckboxChecked = false,
    lastFoundMovies = [],
  } = savedMoviesState;

  return (
    <main className={`${mix} saved-movies`}>
      <SearchForm
        mix="saved-movies__search-form"
        token={token}
        formLogic={formLogic}
        viewportWidth={viewportWidth}
        formHandler={formHandler}
        location={location}
        initialValueLocal={initialValue}
        inputValueLocal={inputValue}
        isCheckboxCheckedLocal={isCheckboxChecked}
        state={state}
        path="/saved-movies"
      />
      <MoviesCardList
        mix="saved-movies__movies-card-list"
        isPreloaderVisible={isPreloaderVisible}
        lastFoundMovies={lastFoundMovies}
        savedCardsIds={savedCardsIds}
        moviesLogic={moviesLogic}
        path="/saved-movies"
        state={state}
        token={token}
        setIsPreloaderVisible={setIsPreloaderVisible}
      />
    </main>
  );
};

export default SavedMovies;
