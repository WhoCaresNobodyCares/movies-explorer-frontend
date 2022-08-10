import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ mix }) => {
  return (
    <main
      className={`${mix} saved-movies`}
      children={
        <>
          <SearchForm mix="saved-movies__search-form" />
          <MoviesCardList mix="saved-movies__movies-card-list" />
        </>
      }
    />
  );
};

export default SavedMovies;
