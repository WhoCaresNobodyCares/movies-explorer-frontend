import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

const MoviesCardList = ({ mix }) => {
	const { isPreloaderVisible, setIsPreloaderVisible } = useContext(AppContext);

	const cards = [];
	const isButtonVisible = false; // !!!
	const isNotFoundVisible = true;

	return (
		<section className={`${mix} movies-card-list`}>
			<div
				className={
					isButtonVisible // !!!
						? 'movies-card-list__cards'
						: 'movies-card-list__cards movies-card-list__cards_no-margin'
				}
				children={cards.map((item) => (
					<MoviesCard mix={item.mix} key={item.key} />
				))}
			/>
			{isButtonVisible && ( // !!!
				<button
					id="movies-card-list-button"
					className="movies-card-list__button"
					name="movies-card-list-button"
					aria-label="Добавить карточки"
					type="button"
					onClick={() => {
						setIsPreloaderVisible(!isPreloaderVisible);
					}}
					children="Еще"
				/>
			)}
			<Preloader
				mix="movies-card-list__preloader"
				mod_visible={isPreloaderVisible ? 'movies-card-list__preloader_visible' : ''}
			/>
			<div
				className={
					isNotFoundVisible
						? 'movies-card-list__not-found movies-card-list__not-found_visible'
						: 'movies-card-list__not-found'
				}
				children={<span className="movies-card-list__not-found-message">Ничего не найдено</span>}
			/>
		</section>
	);
};

export default MoviesCardList;
