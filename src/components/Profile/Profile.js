import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import './Profile.css';

const Profile = ({ mix }) => {
	const { isProfileEditMode, setIsProfileEditMode } = useContext(AppContext);

	return (
		<main className={`${mix} profile`}>
			<section className="profile__section">
				<h1 className="profile__title" children={`Привет, ${`NAME`}!`} />
				<form
					id="profile-form"
					className="profile__form"
					name="profile-form"
					action="#"
					method="post"
					target="_self"
					autoComplete="on"
					onSubmit={(e) => {
						e.preventDefault();
						console.log('profile-form');
						setIsProfileEditMode(false);
					}}
				>
					<span className="profile__label" children="Имя" />
					<input
						id="profile-form-name-input"
						className={
							!isProfileEditMode
								? 'profile__input'
								: `profile__input profile__input_enabled ${!'' && 'profile__input_invalid'}`
						}
						name="profile-form-name-input"
						type="text"
						placeholder="Имя"
						autoComplete="on"
						required
						onChange={(e) => {}}
					/>
					<div
						className={'' ? 'profile__separator' : 'profile__separator profile__separator_error'}
					/>
					<span className="profile__label" children="E-mail" />
					<input
						id="profile-form-email-input"
						className={
							!isProfileEditMode
								? 'profile__input'
								: `profile__input profile__input_enabled ${!'' && 'profile__input_invalid'}`
						}
						name="profile-form-email-input"
						type="email"
						placeholder="E-mail"
						autoComplete="on"
						required
						onChange={(e) => {}}
					/>
					<div className="profile__bottom">
						{!isProfileEditMode && (
							<>
								<button
									id="profile-form-edit"
									className="profile__edit"
									name="profile-form-edit"
									aria-label="Разблокировать форму"
									type="button"
									onClick={() => setIsProfileEditMode(!isProfileEditMode)}
									children="Редактировать"
								/>
								<button
									id="profile-form-logout"
									className="profile__logout"
									name="profile-form-logout"
									aria-label="Выйти из профиля"
									type="button"
									onClick={() => {}}
									children="Выйти из аккаунта"
								/>
							</>
						)}
						{isProfileEditMode && (
							<>
								<span
									className={!'' ? 'profile__error profile__error_visible' : 'profile__error'}
									children={
										!''
											? 'Имя пользователя должно содержать от двух до тридцати символов'
											: 'Данное поле должно содержать e-mail'
									}
								/>
								<button
									id="profile-form-submit"
									className={'' ? 'profile__submit' : 'profile__submit profile__submit_disabled'}
									name="profile-form-submit"
									aria-label="Подтвердить изменения"
									type="submit"
									formMethod="post"
									form="profile-form"
									children="Сохранить"
									disabled={true}
								/>
							</>
						)}
					</div>
				</form>
			</section>
		</main>
	);
};

export default Profile;
