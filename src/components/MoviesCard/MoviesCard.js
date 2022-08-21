import { useContext, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import useAllowedPaths from '../../utils/customHooks/useAllowedPaths';
import useConvertMinutes from '../../utils/customHooks/useConvertMinutes';
import './MoviesCard.css';

const MoviesCard = ({ mix, card }) => {
	const { saveMovie } = useContext(AppContext);
	const { image, nameRU, duration } = card;
	const [moviesCard] = useAllowedPaths(['/movies']);
	const [isLiked, setIsLiked] = useState(false);
	const length = useConvertMinutes(duration);

	return (
		<div className={`${mix} movies-card`}>
			<img
				className="movies-card__image"
				src={image}
				alt="Изображение карточки"
			/>
			<div className="movies-card__description">
				<h2 className="movies-card__title" children={nameRU} />
				<button
					id="movies-card-button"
					className={
						moviesCard
							? `movies-card__movies-button${
									isLiked ? ' movies-card__movies-button_active' : ''
							  }`
							: 'movies-card__saved-movies-button'
					}
					name="movies-card-button"
					aria-label="Совершить действие с карточкой"
					type="button"
					onClick={
						moviesCard
							? () => {
									saveMovie(card, setIsLiked);
							  }
							: () => {}
					}
				/>
				<span className="movies-card__length" children={length} />
			</div>
		</div>
	);
};

export default MoviesCard;
