import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../../utils/customHooks/useFormValidation';

import './Login.css';

const Login = ({ mix, handleSignin }) => {
	const isMounted = useRef(false);
	const { values, handleChange, errors, isValid } = useFormValidation();

	const [defaultButtonState, setDefaultButtonState] = useState(false);

	useEffect(() => {
		if (isMounted.current === true) {
			setDefaultButtonState(true);
		} else {
			isMounted.current = true;
		}
	}, [isValid]);

	return (
		<main className={`${mix} login`}>
			<section className="login__section">
				<h1 className="login__title" children="Рады видеть!" />
				<form
					id="loginForm"
					className="login__form"
					name="loginForm"
					action="#"
					method="post"
					target="_self"
					autoComplete="on"
					onSubmit={(e) => {
						e.preventDefault();
						const { loginFormEmailInput, loginFormPasswordInput } = values;
						handleSignin(loginFormEmailInput, loginFormPasswordInput);
					}}
				>
					<div className="login__block">
						<span className="login__label" children="E-mail" />
						<input
							id="loginFormEmailInput"
							className={
								isValid
									? 'login__input'
									: `${
											!errors.loginFormEmailInput
												? 'login__input'
												: 'login__input login__input_invalid'
									  }`
							}
							name="loginFormEmailInput"
							type="email"
							pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
							placeholder="E-mail"
							autoComplete="on"
							autoFocus
							required
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div
						className={
							isValid
								? 'login__separator'
								: `${
										!errors.loginFormEmailInput
											? 'login__separator'
											: 'login__separator login__separator_error'
								  }`
						}
					/>
					<span
						className={
							isValid ? 'login__error' : 'login__error login__error_visible'
						}
						children={errors.loginFormEmailInput}
					/>
					<div className="login__block">
						<span className="login__label" children="Пароль" />
						<input
							id="loginFormPasswordInput"
							className={
								isValid
									? 'login__input'
									: `${
											!errors.loginFormPasswordInput
												? 'login__input'
												: 'login__input login__input_invalid'
									  }`
							}
							name="loginFormPasswordInput"
							type="password"
							placeholder="Пароль"
							autoComplete="on"
							minLength={4}
							required
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div
						className={
							isValid
								? 'login__separator'
								: `${
										!errors.loginFormPasswordInput
											? 'login__separator'
											: 'login__separator login__separator_error'
								  }`
						}
					/>
					<span
						className={
							isValid ? 'login__error' : 'login__error login__error_visible'
						}
						children={errors.loginFormPasswordInput}
					/>
					<div className="login__bottom">
						<button
							id="loginFormEdit"
							className={
								isValid && defaultButtonState
									? 'login__submit'
									: 'login__submit login__submit_disabled'
							}
							name="loginFormEdit"
							aria-label="Войти"
							type="submit"
							onClick={() => {}}
							children="Войти"
							form="loginForm"
							disabled={isValid && defaultButtonState ? false : true}
						/>
						<div className="login__already">
							<span
								className="login__description"
								children="Ещё не зарегистрированы?"
							/>
							<Link
								className="login__link"
								to="/signup"
								children="Регистрация"
							/>
						</div>
					</div>
				</form>
			</section>
		</main>
	);
};

export default Login;
