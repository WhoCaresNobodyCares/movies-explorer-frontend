import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ mix, path, moviesLogic }) => {
  return (
    <main className={`${mix} movies`}>
      <SearchForm mix="movies__search-form" moviesLogic={moviesLogic} path={path} />
      <MoviesCardList mix="movies__movies-card-list" path={path} moviesLogic={moviesLogic} />
    </main>
  );
};

export default Movies;
