import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({
  mix,
  state,
  form,
  viewportWidth,
  formHandler,
  location,
}) => {
  const { savedMoviesState = {} } = state;
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
        form={form}
        viewportWidth={viewportWidth}
        formHandler={formHandler}
        location={location}
        initialValueLocal={initialValue}
        inputValueLocal={inputValue}
        isCheckboxCheckedLocal={isCheckboxChecked}
      />
      <MoviesCardList mix="saved-movies__movies-card-list" />
    </main>
  );
};

export default SavedMovies;
