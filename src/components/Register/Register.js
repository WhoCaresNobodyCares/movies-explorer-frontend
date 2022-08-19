import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../utils/customHooks/useFormValidation';

import './Register.css';

const Register = ({ mix, handleSignup }) => {
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
    <main className={`${mix} register`}>
      <section className="register__section">
        <h1 className="register__title" children="Добро пожаловать!" />
        <form
          id="registerForm"
          className="register__form"
          name="registerForm"
          action="#"
          method="post"
          target="_self"
          autoComplete="on"
          onSubmit={(e) => {
            e.preventDefault();
            const { registerFormNameInput, registerFormEmailInput, registerFormPasswordInput } = values;
            handleSignup(registerFormNameInput, registerFormEmailInput, registerFormPasswordInput);
          }}
        >
          <div className="register__block">
            <span className="register__label" children="Имя" />
            <input
              id="registerFormNameInput"
              className={
                isValid
                  ? 'register__input'
                  : `${!errors.registerFormNameInput ? 'register__input' : 'register__input register__input_invalid'}`
              }
              name="registerFormNameInput"
              type="text"
              placeholder="Имя"
              autoComplete="on"
              minLength={2}
              maxLength={30}
              autoFocus
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div
            className={
              isValid
                ? 'register__separator'
                : `${!errors.registerFormNameInput ? 'register__separator' : 'register__separator register__separator_error'}`
            }
          />
          <span
            className={isValid ? 'register__error' : 'register__error register__error_visible'}
            children={errors.registerFormNameInput}
          />
          <div className="register__block">
            <span className="register__label" children="E-mail" />
            <input
              id="registerFormEmailInput"
              className={
                isValid
                  ? 'register__input'
                  : `${!errors.registerFormEmailInput ? 'register__input' : 'register__input register__input_invalid'}`
              }
              name="registerFormEmailInput"
              type="email"
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              placeholder="E-mail"
              autoComplete="on"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div
            className={
              isValid
                ? 'register__separator'
                : `${!errors.registerFormEmailInput ? 'register__separator' : 'register__separator register__separator_error'}`
            }
          />
          <span
            className={isValid ? 'register__error' : 'register__error register__error_visible'}
            children={errors.registerFormEmailInput}
          />
          <div className="register__block">
            <span className="register__label" children="Пароль" />
            <input
              id="registerFormPasswordInput"
              className={
                isValid
                  ? 'register__input'
                  : `${!errors.registerFormPasswordInput ? 'register__input' : 'register__input register__input_invalid'}`
              }
              name="registerFormPasswordInput"
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
                ? 'register__separator'
                : `${!errors.registerFormPasswordInput ? 'register__separator' : 'register__separator register__separator_error'}`
            }
          />
          <span
            className={isValid ? 'register__error' : 'register__error register__error_visible'}
            children={errors.registerFormPasswordInput}
          />
          <div className="register__bottom">
            <button
              id="registerFormEdit"
              className={isValid && defaultButtonState ? 'register__submit' : 'register__submit register__submit_disabled'}
              name="registerFormEdit"
              aria-label="Зарегистрироваться"
              type="submit"
              onClick={() => {}}
              children="Зарегистрироваться"
              form="registerForm"
              disabled={isValid && defaultButtonState ? false : true}
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
