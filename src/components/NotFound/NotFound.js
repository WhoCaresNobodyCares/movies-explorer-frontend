import { useNavigate } from 'react-router-dom';

import './NotFound.css';

const NotFound = ({ mix }) => {
	const navigate = useNavigate();

	return (
		<main className={`${mix} not-found`}>
			<section className="not-found__section">
				<div className="not-found__wrap">
					<h1 className="not-found__title" children="404" />
					<span
						className="not-found__subtitle"
						children="Страница не найдена"
					/>
				</div>
				<button
					id="navigate-back"
					className="not-found__back"
					name="navigate-back"
					aria-label="Назад"
					type="button"
					onClick={() => {
						navigate(-1);
					}}
					children="Назад"
				/>
			</section>
		</main>
	);
};

export default NotFound;
