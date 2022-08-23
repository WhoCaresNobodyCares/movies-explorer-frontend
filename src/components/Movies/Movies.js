import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ mix, viewportWidth, formHandler, location }) => {
  return (
    <main className={`${mix} movies`}>
      <SearchForm
        mix="movies__search-form"
        viewportWidth={viewportWidth}
        formHandler={formHandler}
        location={location}
      />
      <MoviesCardList mix="movies__movies-card-list" />
    </main>
  );
};

export default Movies;
