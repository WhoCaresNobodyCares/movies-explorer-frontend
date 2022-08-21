import { useContext, useEffect, useRef } from 'react';
import AppContext from '../../contexts/AppContext';
import useCardsLayout from '../../utils/customHooks/useCardsLayout';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

const MoviesCardList = ({ mix }) => {
	const isMounted = useRef(false);
	const { isPreloaderVisible, renderedCards } = useContext(AppContext);
	const { renderedSection, addMoreCards, resetLayout, isButtonVisible } =
		useCardsLayout(renderedCards);

	useEffect(() => {
		if (isMounted.current === true) {
		} else {
			resetLayout();
			isMounted.current = true;
		}
	});

	return (
		<section className={`${mix} movies-card-list`}>
			<div
				className={
					isButtonVisible
						? 'movies-card-list__cards'
						: 'movies-card-list__cards movies-card-list__cards_no-margin'
				}
				children={renderedSection.map((item) => (
					<MoviesCard
						mix="movies-card-list__movies-card"
						card={item}
						key={item.movieId}
					/>
				))}
			/>
			{isButtonVisible && (
				<button
					id="movies-card-list-button"
					className="movies-card-list__button"
					name="movies-card-list-button"
					aria-label="Добавить карточки"
					type="button"
					onClick={() => addMoreCards()}
					children="Еще"
				/>
			)}
			<Preloader
				mix="movies-card-list__preloader"
				mod_visible={
					isPreloaderVisible ? 'movies-card-list__preloader_visible' : ''
				}
			/>
		</section>
	);
};

export default MoviesCardList;
