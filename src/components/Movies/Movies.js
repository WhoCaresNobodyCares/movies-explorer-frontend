import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ mix, viewportWidth }) => {
  return (
    <main className={`${mix} movies`}>
      <SearchForm mix="movies__search-form" viewportWidth={viewportWidth} />
      <MoviesCardList mix="movies__movies-card-list" />
    </main>
  );
};

export default Movies;
