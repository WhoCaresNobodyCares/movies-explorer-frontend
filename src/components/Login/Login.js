import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = ({
  mix,
  formLogic,
  formValidator,
  loginApiError,
  setLoginApiError,
}) => {
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
    <main className={`${mix} login`}>
      <section className="login__section">
        <h1 className="login__title" children={CONTENT_CONFIG.Login.title} />
        <form
          id="loginForm"
          className="login__form"
          name="loginForm"
          action="#"
          method="post"
          target="_self"
          autoComplete="off"
          onSubmit={(e) => formLogic.handleLoginFormSubmit(e, inputValues)}
        >
          <div className="login__block">
            <span className="login__label" children="E-mail" />
            <input
              id="loginFormEmailInput"
              className={
                isFormValid || !inputErrors.loginFormEmailInput
                  ? 'login__input'
                  : 'login__input login__input_invalid'
              }
              name="loginFormEmailInput"
              type="email"
              placeholder="E-mail"
              autoComplete="off"
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              autoFocus
              required
              onChange={(e) => handleInputChange(e, setLoginApiError)}
            />
          </div>
          <div
            className={
              isFormValid || !inputErrors.loginFormEmailInput
                ? 'login__separator'
                : 'login__separator login__separator_error'
            }
          />
          <span
            className={
              isFormValid ? 'login__error' : 'login__error login__error_visible'
            }
            children={inputErrors.loginFormEmailInput}
          />
          <div className="login__block">
            <span className="login__label" children="Пароль" />
            <input
              id="loginFormPasswordInput"
              className={
                isFormValid || !inputErrors.loginFormPasswordInput
                  ? 'login__input'
                  : 'login__input login__input_invalid'
              }
              name="loginFormPasswordInput"
              type="password"
              placeholder="Пароль"
              autoComplete="off"
              pattern="^\S*$"
              minLength={4}
              required
              onChange={(e) => handleInputChange(e, setLoginApiError)}
            />
          </div>
          <div
            className={
              isFormValid || !inputErrors.loginFormPasswordInput
                ? 'login__separator'
                : 'login__separator login__separator_error'
            }
          />
          <span
            className={
              isFormValid ? 'login__error' : 'login__error login__error_visible'
            }
            children={inputErrors.loginFormPasswordInput}
          />
          <div className="login__bottom">
            <span
              className={
                loginApiError
                  ? 'login__apiError login__apiError_visible'
                  : 'login__apiError'
              }
              children={loginApiError}
            />
            <button
              id="loginFormEdit"
              className={
                isFormValid && !loginApiError
                  ? 'login__submit'
                  : 'login__submit login__submit_disabled'
              }
              name="loginFormEdit"
              aria-label="Войти"
              type="submit"
              children={CONTENT_CONFIG.Login.button}
              disabled={isFormValid && !loginApiError ? false : true}
            />
            <div className="login__already">
              <span
                className="login__description"
                children={CONTENT_CONFIG.Login.description}
              />
              <Link
                className="login__link"
                to="/signup"
                children={CONTENT_CONFIG.Login.link}
              />
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
