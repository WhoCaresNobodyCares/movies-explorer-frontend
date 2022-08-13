import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

const Movies = ({ mix }) => {
  return (
    <main className={`${mix} movies`}>
      <SearchForm mix="movies__search-form" />
    </main>
  );
};

export default Movies;
