import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = ({ mix }) => {
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [buttonIsValid, setButtonIsValid] = useState(false);

  useEffect(() => {
    emailIsValid && passwordIsValid ? setButtonIsValid(true) : setButtonIsValid(false);
  }, [emailIsValid, passwordIsValid]);

  return (
    <main className={`${mix} login`}>
      <section className="login__section">
        <h1 className="login__title" children="Рады видеть!" />
        <form
          id="login-form"
          className="login__form"
          name="login-form"
          action="#"
          method="post"
          target="_self"
          autoComplete="on"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('login-form');
          }}
        >
          <div className="login__block">
            <span className="login__label" children="E-mail" />
            <input
              id="login-form-email-input"
              className={emailIsValid ? 'login__input' : 'login__input login__input_invalid'}
              name="login-form-email-input"
              type="email"
              placeholder="E-mail"
              autoComplete="on"
              autoFocus
              required
              onChange={(e) => {
                let value = e.target.value;
                const pattern =
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                setEmailIsValid(pattern.test(value));
              }}
            />
          </div>
          <div className="login__separator" />
          <span
            className={emailIsValid ? 'login__error' : 'login__error login__error_visible'}
            children="Адрес электронной почты"
          />
          <div className="login__block">
            <span className="login__label" children="Пароль" />
            <input
              id="login-form-password-input"
              className={passwordIsValid ? 'login__input' : 'login__input login__input_invalid'}
              name="login-form-password-input"
              type="password"
              placeholder="Пароль"
              autoComplete="on"
              required
              onChange={(e) => {
                e.target.value.length < 4 ? setPasswordIsValid(false) : setPasswordIsValid(true);
              }}
            />
          </div>
          <div className="login__separator" />
          <span
            className={passwordIsValid ? 'login__error' : 'login__error login__error_visible'}
            children="Минимум 4 символа"
          />
          <div className="login__bottom">
            <button
              id="login-form-edit"
              className={emailIsValid && passwordIsValid && buttonIsValid ? 'login__submit' : 'login__submit login__submit_disabled'}
              name="login-form-edit"
              aria-label="Войти"
              type="submit"
              onClick={() => {}}
              children="Войти"
              disabled={!buttonIsValid}
            />
            <div className="login__already">
              <span className="login__description" children="Ещё не зарегистрированы?" />
              <Link className="login__link" to="/signup" children="Регистрация" />
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
