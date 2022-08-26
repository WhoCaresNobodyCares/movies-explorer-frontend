import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ mix }) => {
  return (
    <main className={`${mix} movies`}>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
};

export default Movies;
