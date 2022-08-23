import { Link } from 'react-router-dom';

import './Login.css';

import useFormValidation from '../../utils/customHooks/useFormValidation';

const Login = ({ mix, userLogic }) => {
  const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

  const { values, errors, handleChange, isValid, resetForm } = useFormValidation();

  const { handleSignIn } = userLogic;

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
          autoComplete="on"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn(values.loginFormEmailInput, values.loginFormPasswordInput);
            resetForm(
              {
                loginFormEmailInput: values.loginFormEmailInput,
                loginFormPasswordInput: values.loginFormPasswordInput,
              },
              {},
              false
            );
          }}
        >
          <div className="login__block">
            <span className="login__label" children="E-mail" />
            <input
              id="loginFormEmailInput"
              className={isValid ? 'login__input' : `${!errors.loginFormEmailInput ? 'login__input' : 'login__input login__input_invalid'}`}
              name="loginFormEmailInput"
              type="email"
              placeholder="E-mail"
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              autoComplete="on"
              autoFocus
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={isValid ? 'login__separator' : `${!errors.loginFormEmailInput ? 'login__separator' : 'login__separator login__separator_error'}`} />
          <span className={isValid ? 'login__error' : 'login__error login__error_visible'} children={errors.loginFormEmailInput} />
          <div className="login__block">
            <span className="login__label" children="Пароль" />
            <input
              id="loginFormPasswordInput"
              className={isValid ? 'login__input' : `${!errors.loginFormPasswordInput ? 'login__input' : 'login__input login__input_invalid'}`}
              name="loginFormPasswordInput"
              type="password"
              placeholder="Пароль"
              autoComplete="on"
              pattern="^\S*$"
              minLength={4}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={isValid ? 'login__separator' : `${!errors.loginFormPasswordInput ? 'login__separator' : 'login__separator login__separator_error'}`} />
          <span className={isValid ? 'login__error' : 'login__error login__error_visible'} children={errors.loginFormPasswordInput} />
          <div className="login__bottom">
            <button
              id="loginFormEdit"
              className={isValid ? 'login__submit' : 'login__submit login__submit_disabled'}
              name="loginFormEdit"
              aria-label="Войти"
              type="submit"
              children={CONTENT_CONFIG.Login.button}
              disabled={isValid ? false : true}
            />
            <div className="login__already">
              <span className="login__description" children={CONTENT_CONFIG.Login.description} />
              <Link className="login__link" to="/signup" children={CONTENT_CONFIG.Login.link} />
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
