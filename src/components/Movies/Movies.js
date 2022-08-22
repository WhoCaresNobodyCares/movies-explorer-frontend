import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ mix, path }) => {
  return (
    <main className={`${mix} movies`}>
      <SearchForm mix="movies__search-form" />
      <MoviesCardList mix="movies__movies-card-list" path={path} />
    </main>
  );
};

export default Movies;
