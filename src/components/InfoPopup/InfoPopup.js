import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import './InfoPopup.css';

const InfoPopup = ({ mix, popupState, setPopupState }) => {
	const { user } = useContext(UserContext);

	return (
		<div className={`${mix} info-popup`}>
			<div
				className={
					popupState.isOpened
						? 'info-popup__shadow info-popup__shadow_visible'
						: 'info-popup__shadow'
				}
				onClick={() =>
					setPopupState({
						isOpened: !popupState.isOpened,
						title: '',
						button: '',
					})
				}
			/>
			<div
				className={
					popupState.isOpened
						? 'info-popup__content info-popup__content_visible'
						: 'info-popup__content'
				}
			>
				<h2 className="info-popup__title">
					{popupState.title === 'Добро пожаловать,'
						? `${popupState.title} ${user.name}`
						: popupState.title}
				</h2>
				<button
					id="info-popup-button"
					className="info-popup__button"
					name="info-popup-button"
					aria-label="Подтвердить"
					type="button"
					onClick={() =>
						setPopupState({
							isOpened: !popupState.isOpened,
							title: '',
							button: '',
						})
					}
					children={popupState.button}
				/>
			</div>
		</div>
	);
};

export default InfoPopup;
