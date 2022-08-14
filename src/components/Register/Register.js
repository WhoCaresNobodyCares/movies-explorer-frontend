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
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            console.log('register-form');
          }}
        >
          <div className="register__block">
            <span className="register__label" children="Имя" />
            <input
              id="register-form-name-input"
              className="register__input"
              name="register-form-name-input"
              type="text"
              minLength="0"
              maxLength="40"
              placeholder="Имя"
              autoComplete="on"
              autoFocus
              required
              onChange={() => {
                console.log('register-form-name-input');
              }}
            />
          </div>
          <div className="register__separator" />
          <span className="register__error register__error_visible" children="Что-то пошло не так" />
          <div className="register__block">
            <span className="register__label" children="E-mail" />
            <input
              id="register-form-email-input"
              className="register__input"
              name="register-form-email-input"
              type="email"
              minLength="0"
              maxLength="40"
              placeholder="E-mail"
              autoComplete="on"
              required
              onChange={() => {
                console.log('register-form-email-input');
              }}
            />
          </div>
          <div className="register__separator" />
          <span className="register__error register__error_visible" children="Что-то пошло не так" />
          <div className="register__block">
            <span className="register__label" children="Пароль" />
            <input
              id="register-form-password-input"
              className="register__input"
              name="register-form-password-input"
              type="password"
              minLength="0"
              maxLength="40"
              placeholder="Пароль"
              autoComplete="on"
              required
              onChange={() => {
                console.log('register-form-password-input');
              }}
            />
          </div>
          <div className="register__separator" />
          <span className="register__error register__error_visible" children="Что-то пошло не так" />
          <div className="register__bottom">
            <button
              id="register-form-edit"
              className="register__submit"
              name="register-form-edit"
              aria-label="Зарегистрироваться"
              type="submit"
              onClick={() => {}}
              children="Зарегистрироваться"
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
