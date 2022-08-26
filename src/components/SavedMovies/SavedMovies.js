import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ mix }) => {
  return (
    <main className={`${mix} saved-movies`}>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
};

export default SavedMovies;
