import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesBottom from './MoviesBottom/MoviesBottom';

const Movies = ({ mix }) => {
  return (
    <main
      className={`${mix} movies`}
      children={
        <>
          <SearchForm mix="movies__search-form" />
          <MoviesCardList mix="movies__movies-card-list" />
          <MoviesBottom mix="movies__movies-bottom" />
        </>
      }
    />
  );
};

export default Movies;
