import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ mix, form, viewportWidth, formHandler, location }) => {
  return (
    <main className={`${mix} movies`}>
      <SearchForm
        mix="movies__search-form"
        form={form}
        viewportWidth={viewportWidth}
        formHandler={formHandler}
        location={location}
      />
      <MoviesCardList mix="movies__movies-card-list" />
    </main>
  );
};

export default Movies;
