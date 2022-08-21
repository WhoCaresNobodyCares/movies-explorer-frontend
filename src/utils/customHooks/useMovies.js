import { useState } from 'react';
import mainApi from '../../apis/MainApi';
import moviesApi from '../../apis/MoviesApi';
import useSearchCards from './useSearchCards';
const { POPUP_STATES } = require('../../configs/popupConfig.json');

const useMovies = (setPopupState) => {
	const search = useSearchCards();
	const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
	const [renderedCards, setRenderedCards] = useState([]);
	const [beatFilmMovies, setBeatFilmMovies] = useState([]);
	const [savedMovies, setSavedMovies] = useState([]);

	const render = (cards) => setRenderedCards(cards);

	const searchMoviesInitially = (isChecked, words, setIsInitialSearch) => {
		console.log('initial search');
		if (words.length !== 0) {
			setIsPreloaderVisible(true);
			moviesApi
				.getMovies()
				.then((res) => {
					return res.map((item) => {
						const {
							country,
							director,
							duration,
							year,
							description,
							image,
							trailerLink,
							id,
							nameRU,
							nameEN,
						} = item;
						return {
							country: country,
							director: director,
							duration: duration,
							year: year,
							description: description,
							image: `https://api.nomoreparties.co/${item.image.url}`,
							trailerLink: trailerLink,
							thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
							movieId: id,
							nameRU: nameRU,
							nameEN: nameEN,
						};
					});
				})
				.then((cards) => {
					setBeatFilmMovies(cards);
					return cards;
				})
				.then((cards) => search(cards, isChecked, words))
				.then((filteredCards) => {
					localStorage.setItem(
						'movies-state',
						JSON.stringify({
							cards: filteredCards,
							isChecked: isChecked,
							words: [...words],
						}),
					);
					return filteredCards;
				})
				.then((filteredCards) => render(filteredCards))
				.then(() => setIsInitialSearch(false))
				.then(() => setIsPreloaderVisible(false))
				.catch((err) => {
					setIsPreloaderVisible(false);
					err === 500 && setPopupState(POPUP_STATES.movies.err500);
				});
		} else {
			setPopupState(POPUP_STATES.movies.emptyReq);
		}
	};

	const searchMovies = (isChecked, words) => {
		const filteredCards = search(beatFilmMovies, isChecked, words);
		localStorage.setItem(
			'movies-state',
			JSON.stringify({
				cards: filteredCards,
				isChecked: isChecked,
				words: [...words],
			}),
		);
		render(filteredCards);
	};

	const getSavedMovies = () =>
		mainApi
			.getMovies(localStorage.getItem('token'))
			.then((res) => setSavedMovies(res))
			.catch((err) => err === 500 && setPopupState(POPUP_STATES.movies.err500));

	const searchSavedMovies = (isChecked, words) => {
		const filteredCards = search(savedMovies, isChecked, words);
		localStorage.setItem(
			'movies-state',
			JSON.stringify({
				cards: filteredCards,
				isChecked: isChecked,
				words: [...words],
			}),
		);
		render(filteredCards);
	};

	const submitOnCheck = (form) => {
		form.current.dispatchEvent(
			new Event('submit', { cancelable: true, bubbles: true }),
		);
	};

	const saveMovie = (card, setIsLiked) => {
		if (
			(card.country !== null,
			card.director !== null,
			card.duration !== null,
			card.year !== null,
			card.description !== null,
			card.image !== null,
			card.trailerLink !== null,
			card.thumbnail !== null,
			card.movieId !== null,
			card.nameRU !== null,
			card.nameEN !== null)
		) {
			mainApi
				.addMovie({
					country: card.country,
					director: card.director,
					duration: card.duration,
					year: card.year,
					description: card.description,
					image: card.image,
					trailerLink: card.trailerLink,
					thumbnail: card.thumbnail,
					movieId: card.movieId,
					nameRU: card.nameRU,
					nameEN: card.nameEN,
					token: localStorage.getItem('token'),
				})
				.then(() => setIsLiked(true))
				.catch((err) => {
					err === 400 && setPopupState(POPUP_STATES.movies.err400);
					err === 500 && setPopupState(POPUP_STATES.movies.err500);
				});
		} else {
			setPopupState(POPUP_STATES.movies.invalid);
		}
	};

	return {
		isPreloaderVisible,
		renderedCards,
		render,
		searchMovies,
		searchMoviesInitially,
		getSavedMovies,
		submitOnCheck,
		saveMovie,
		searchSavedMovies,
	};
};

export default useMovies;
