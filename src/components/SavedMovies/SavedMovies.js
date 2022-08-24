import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ mix, form, viewportWidth, formHandler, location }) => {
  return (
    <main className={`${mix} saved-movies`}>
      <SearchForm
        mix="saved-movies__search-form"
        form={form}
        viewportWidth={viewportWidth}
        formHandler={formHandler}
        location={location}
      />
      <MoviesCardList mix="saved-movies__movies-card-list" />
    </main>
  );
};

export default SavedMovies;
