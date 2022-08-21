import { Link } from 'react-router-dom';
import './Register.css';

const Register = ({ mix }) => {
	return (
		<main className={`${mix} register`}>
			<section className="register__section">
				<h1 className="register__title" children="Добро пожаловать!" />
				<form
					id="register-form"
					className="register__form"
					name="register-form"
					action="#"
					method="post"
					target="_self"
					autoComplete="on"
					onSubmit={(e) => {
						e.preventDefault();
						console.log('works');
					}}
				>
					<div className="register__block">
						<span className="register__label" children="Имя" />
						<input
							id="register-form-name-input"
							className={'' ? 'register__input' : 'register__input register__input_invalid'}
							name="register-form-name-input"
							type="text"
							placeholder="Имя"
							autoComplete="on"
							autoFocus
							required
							onChange={(e) => {}}
						/>
					</div>
					<div className="register__separator" />
					<span
						className={'' ? 'register__error' : 'register__error register__error_visible'}
						children="От двух до тридцати символов"
					/>
					<div className="register__block">
						<span className="register__label" children="E-mail" />
						<input
							id="register-form-email-input"
							className={'' ? 'register__input' : 'register__input register__input_invalid'}
							name="register-form-email-input"
							type="email"
							placeholder="E-mail"
							autoComplete="on"
							required
							onChange={(e) => {}}
						/>
					</div>
					<div className="register__separator" />
					<span
						className={'' ? 'register__error' : 'register__error register__error_visible'}
						children="Адрес электронной почты"
					/>
					<div className="register__block">
						<span className="register__label" children="Пароль" />
						<input
							id="register-form-password-input"
							className={'' ? 'register__input' : 'register__input register__input_invalid'}
							name="register-form-password-input"
							type="password"
							placeholder="Пароль"
							autoComplete="on"
							required
							onChange={(e) => {}}
						/>
					</div>
					<div className="register__separator" />
					<span
						className={'' ? 'register__error' : 'register__error register__error_visible'}
						children="Минимум 4 символа"
					/>
					<div className="register__bottom">
						<button
							id="register-form-edit"
							className={'' ? 'register__submit' : 'register__submit register__submit_disabled'}
							name="register-form-edit"
							aria-label="Зарегистрироваться"
							type="submit"
							onClick={() => {}}
							children="Зарегистрироваться"
							disabled={true}
						/>
						<div className="register__already">
							<span className="register__description" children="Уже зарегистрированы?" />
							<Link className="register__link" to="/signin" children="Войти" />
						</div>
					</div>
				</form>
			</section>
		</main>
	);
};

export default Register;
