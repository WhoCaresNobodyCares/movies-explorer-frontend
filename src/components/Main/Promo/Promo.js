import './Promo.css';
import landingPicture from '../../../images/landing-picture.svg';
import { useContext } from 'react';
import AppContext from '../../../contexts/AppContext';

const Promo = ({ mix }) => {
	const { viewportWidth } = useContext(AppContext);

	return (
		<section className={`${mix} promo`}>
			{viewportWidth > 600 ? (
				<h1 className="promo__title">
					Учебный проект студента
					<br />
					факультета веб-разработки.
				</h1>
			) : (
				<h1 className="promo__title">
					Учебный проект
					<br />
					студента факультета
					<br />
					веб-разработки.
				</h1>
			)}
			<img className="promo__background" src={landingPicture} alt="Фоновое изображение секции" />
		</section>
	);
};

export default Promo;
