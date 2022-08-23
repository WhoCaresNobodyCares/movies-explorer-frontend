import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

import form from '../../classes/Form';

const Register = ({ mix, formValidator }) => {
  const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');
  const {
    inputValues,
    inputErrors,
    handleInputChange,
    isFormValid,
    resetForm,
  } = formValidator;

  useEffect(() => {
    return () => {
      resetForm({}, {}, false);
    };
  }, []);

  return (
    <main className={`${mix} register`}>
      <section className="register__section">
        <h1
          className="register__title"
          children={CONTENT_CONFIG.Register.title}
        />
        <form
          id="registerForm"
          className="register__form"
          name="registerForm"
          action="#"
          method="post"
          target="_self"
          autoComplete="on"
          onSubmit={(e) => form.handleRegisterFormSubmit(e)}
        >
          <div className="register__block">
            <span className="register__label" children="Имя" />
            <input
              id="registerFormNameInput"
              className={
                isFormValid || !inputErrors.registerFormNameInput
                  ? 'register__input'
                  : 'register__input register__input_invalid'
              }
              name="registerFormNameInput"
              type="text"
              placeholder="Имя"
              pattern="^\S*$"
              minLength={2}
              maxLength={30}
              autoFocus
              required
              onChange={(e) => handleInputChange(e, inputValues)}
            />
          </div>
          <div
            className={
              isFormValid || !inputErrors.registerFormNameInput
                ? 'register__separator'
                : 'register__separator register__separator_error'
            }
          />
          <span
            className={
              isFormValid
                ? 'register__error'
                : 'register__error register__error_visible'
            }
            children={inputErrors.registerFormNameInput}
          />
          <div className="register__block">
            <span className="register__label" children="E-mail" />
            <input
              id="registerFormEmailInput"
              className={
                isFormValid || !inputErrors.registerFormEmailInput
                  ? 'register__input'
                  : 'register__input register__input_invalid'
              }
              name="registerFormEmailInput"
              type="email"
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              placeholder="E-mail"
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            className={
              isFormValid || !inputErrors.registerFormEmailInput
                ? 'register__separator'
                : 'register__separator register__separator_error'
            }
          />
          <span
            className={
              isFormValid
                ? 'register__error'
                : 'register__error register__error_visible'
            }
            children={inputErrors.registerFormEmailInput}
          />
          <div className="register__block">
            <span className="register__label" children="Password" />
            <input
              id="registerFormPasswordInput"
              className={
                isFormValid || !inputErrors.registerFormPasswordInput
                  ? 'register__input'
                  : 'register__input register__input_invalid'
              }
              name="registerFormPasswordInput"
              type="password"
              placeholder="Пароль"
              pattern="^\S*$"
              minLength={4}
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div
            className={
              isFormValid || !inputErrors.registerFormPasswordInput
                ? 'register__separator'
                : 'register__separator register__separator_error'
            }
          />
          <span
            className={
              isFormValid
                ? 'register__error'
                : 'register__error register__error_visible'
            }
            children={inputErrors.registerFormPasswordInput}
          />
          <div className="register__bottom">
            <button
              id="registerFormEdit"
              className={
                isFormValid
                  ? 'register__submit'
                  : 'register__submit register__submit_disabled'
              }
              name="registerFormEdit"
              aria-label="Зарегистрироваться"
              type="submit"
              children={CONTENT_CONFIG.Register.button}
              disabled={isFormValid ? false : true}
            />
            <div className="register__already">
              <span
                className="register__description"
                children={CONTENT_CONFIG.Register.description}
              />
              <Link
                className="register__link"
                to="/signin"
                children={CONTENT_CONFIG.Register.link}
              />
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Register;
