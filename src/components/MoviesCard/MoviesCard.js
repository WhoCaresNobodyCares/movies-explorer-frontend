import { useContext, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import './MoviesCard.css';

const MoviesCard = ({ mix }) => {
	const { allowedPaths } = useContext(AppContext);
	const [isCardLiked, setIsCardLiked] = useState(false);

	return (
		<div className={`${mix} movies-card`}>
			<img
				className="movies-card__image"
				src="https://hddesktopwallpapers.in/wp-content/uploads/2015/09/kitty-cat-wallpaper.jpg"
				alt="Изображение карточки"
			/>
			<div className="movies-card__description">
				<h2 className="movies-card__title" children="33 слова о дизайне" />
				<button
					id="movies-card-button"
					className={
						allowedPaths.moviesCard
							? `movies-card__movies-button${
									isCardLiked ? ' movies-card__movies-button_active' : ''
							  }`
							: 'movies-card__saved-movies-button'
					}
					name="movies-card-button"
					aria-label="Совершить действие с карточкой"
					type="button"
					onClick={allowedPaths.moviesCard ? () => setIsCardLiked(!isCardLiked) : () => {}}
				/>
				<span className="movies-card__length" children="1ч 3м" />
			</div>
		</div>
	);
};

export default MoviesCard;
