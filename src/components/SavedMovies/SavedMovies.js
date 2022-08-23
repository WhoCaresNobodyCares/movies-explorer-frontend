import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ mix, viewportWidth }) => {
  return (
    <main className={`${mix} saved-movies`}>
      <SearchForm mix="saved-movies__search-form" viewportWidth={viewportWidth} />
      <MoviesCardList mix="saved-movies__movies-card-list" />
    </main>
  );
};

export default SavedMovies;
