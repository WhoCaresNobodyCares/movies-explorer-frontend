import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ mix, path, moviesLogic }) => {
  return (
    <main className={`${mix} saved-movies`}>
      <SearchForm mix="saved-movies__search-form" moviesLogic={moviesLogic} path={path} />
      <MoviesCardList mix="saved-movies__movies-card-list" path={path} moviesLogic={moviesLogic} />
    </main>
  );
};

export default SavedMovies;
