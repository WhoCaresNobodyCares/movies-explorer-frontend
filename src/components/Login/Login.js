import { Link } from 'react-router-dom';

import './Login.css';

const Login = ({ mix }) => {
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
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            console.log('login-form');
          }}
        >
          <div className="login__block">
            <span className="login__label" children="E-mail" />
            <input
              id="login-form-email-input"
              className="login__input"
              name="login-form-name-input"
              type="email"
              minLength="0"
              maxLength="40"
              placeholder="E-mail"
              autoComplete="on"
              autoFocus
              required
              onChange={() => {
                console.log('login-form-email-input');
              }}
            />
          </div>
          <div className="login__separator" />
          <span className="login__error login__error_visible" children="Что-то пошло не так" />
          <div className="login__block">
            <span className="login__label" children="Пароль" />
            <input
              id="login-form-password-input"
              className="login__input"
              name="login-form-password-input"
              type="password"
              minLength="0"
              maxLength="40"
              placeholder="Пароль"
              autoComplete="on"
              required
              onChange={() => {
                console.log('login-form-password-input');
              }}
            />
          </div>
          <div className="login__separator" />
          <span className="login__error login__error_visible" children="Что-то пошло не так" />
          <div className="login__bottom">
            <button
              id="login-form-edit"
              className="login__submit"
              name="login-form-edit"
              aria-label="Войти"
              type="submit"
              onClick={() => {}}
              children="Войти"
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
