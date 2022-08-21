import './SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ mix }) => {
	return (
		<main className={`${mix} saved-movies`}>
			<SearchForm mix="saved-movies__search-form" />
			<MoviesCardList mix="saved-movies__movies-card-list" />
		</main>
	);
};

export default SavedMovies;
