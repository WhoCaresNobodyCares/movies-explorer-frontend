import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

const Register = ({ mix }) => {
  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [buttonIsValid, setButtonIsValid] = useState(false);

  useEffect(() => {
    nameIsValid && emailIsValid && passwordIsValid ? setButtonIsValid(true) : setButtonIsValid(false);
  }, [nameIsValid, emailIsValid, passwordIsValid]);

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
              className={nameIsValid ? 'register__input' : 'register__input register__input_invalid'}
              name="register-form-name-input"
              type="text"
              placeholder="Имя"
              autoComplete="on"
              autoFocus
              required
              onChange={(e) => {
                e.target.value.length >= 2 && e.target.value.length <= 30 ? setNameIsValid(true) : setNameIsValid(false);
              }}
            />
          </div>
          <div className="register__separator" />
          <span
            className={nameIsValid ? 'register__error' : 'register__error register__error_visible'}
            children="Поле должно содержать от двух до тридцати символов"
          />
          <div className="register__block">
            <span className="register__label" children="E-mail" />
            <input
              id="register-form-email-input"
              className={emailIsValid ? 'register__input' : 'register__input register__input_invalid'}
              name="register-form-email-input"
              type="email"
              placeholder="E-mail"
              autoComplete="on"
              required
              onChange={(e) => {
                let value = e.target.value;
                const pattern =
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                setEmailIsValid(pattern.test(value));
              }}
            />
          </div>
          <div className="register__separator" />
          <span
            className={emailIsValid ? 'register__error' : 'register__error register__error_visible'}
            children="Данное поле должно содержать адрес электронной почты"
          />
          <div className="register__block">
            <span className="register__label" children="Пароль" />
            <input
              id="register-form-password-input"
              className={passwordIsValid ? 'register__input' : 'register__input register__input_invalid'}
              name="register-form-password-input"
              type="password"
              placeholder="Пароль"
              autoComplete="on"
              required
              onChange={(e) => {
                e.target.value.length < 4 ? setPasswordIsValid(false) : setPasswordIsValid(true);
              }}
            />
          </div>
          <div className="register__separator" />
          <span
            className={passwordIsValid ? 'register__error' : 'register__error register__error_visible'}
            children="Пароль должен содержать минимум 4 символа"
          />
          <div className="register__bottom">
            <button
              id="register-form-edit"
              className={
                nameIsValid && emailIsValid && passwordIsValid && buttonIsValid
                  ? 'register__submit'
                  : 'register__submit register__submit_disabled'
              }
              name="register-form-edit"
              aria-label="Зарегистрироваться"
              type="submit"
              onClick={() => {}}
              children="Зарегистрироваться"
              disabled={!buttonIsValid}
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
