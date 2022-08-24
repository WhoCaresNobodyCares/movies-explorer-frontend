import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ mix, state, form, viewportWidth, formHandler, location }) => {
  const { moviesState = {} } = state;
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
        form={form}
        viewportWidth={viewportWidth}
        formHandler={formHandler}
        location={location}
        initialValueLocal={initialValue}
        inputValueLocal={inputValue}
        isCheckboxCheckedLocal={isCheckboxChecked}
      />
      <MoviesCardList mix="movies__movies-card-list" />
    </main>
  );
};

export default Movies;
