import { Link } from 'react-router-dom';

import './Register.css';

import useFormValidation from '../../utils/customHooks/useFormValidation';

const Register = ({ mix, userLogic }) => {
  const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

  const { values, errors, handleChange, isValid, resetForm } = useFormValidation();

  const { handleSignUp } = userLogic;

  return (
    <main className={`${mix} register`}>
      <section className="register__section">
        <h1 className="register__title" children={CONTENT_CONFIG.Register.title} />
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
            handleSignUp(values.registerFormNameInput, values.registerFormEmailInput, values.registerFormPasswordInput);
            resetForm(
              {
                registerFormNameInput: values.registerFormNameInput,
                registerFormEmailInput: values.registerFormEmailInput,
                registerFormPasswordInput: values.registerFormPasswordInput,
              },
              {},
              false
            );
          }}
        >
          <div className="register__block">
            <span className="register__label" children="Имя" />
            <input
              id="registerFormNameInput"
              className={isValid ? 'register__input' : `${!errors.registerFormNameInput ? 'register__input' : 'register__input register__input_invalid'}`}
              name="registerFormNameInput"
              type="text"
              placeholder="Имя"
              autoComplete="on"
              pattern="^\S*$"
              minLength={2}
              maxLength={30}
              autoFocus
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={isValid ? 'register__separator' : `${!errors.registerFormNameInput ? 'register__separator' : 'register__separator register__separator_error'}`} />
          <span className={isValid ? 'register__error' : 'register__error register__error_visible'} children={errors.registerFormNameInput} />
          <div className="register__block">
            <span className="register__label" children="E-mail" />
            <input
              id="registerFormEmailInput"
              className={isValid ? 'register__input' : `${!errors.registerFormEmailInput ? 'register__input' : 'register__input register__input_invalid'}`}
              name="registerFormEmailInput"
              type="email"
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              placeholder="E-mail"
              autoComplete="on"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={isValid ? 'register__separator' : `${!errors.registerFormEmailInput ? 'register__separator' : 'register__separator register__separator_error'}`} />
          <span className={isValid ? 'register__error' : 'register__error register__error_visible'} children={errors.registerFormEmailInput} />
          <div className="register__block">
            <span className="register__label" children="Password" />
            <input
              id="registerFormPasswordInput"
              className={isValid ? 'register__input' : `${!errors.registerFormPasswordInput ? 'register__input' : 'register__input register__input_invalid'}`}
              name="registerFormPasswordInput"
              type="password"
              placeholder="Пароль"
              autoComplete="on"
              pattern="^\S*$"
              minLength={4}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={isValid ? 'register__separator' : `${!errors.registerFormPasswordInput ? 'register__separator' : 'register__separator register__separator_error'}`} />
          <span className={isValid ? 'register__error' : 'register__error register__error_visible'} children={errors.registerFormPasswordInput} />
          <div className="register__bottom">
            <button
              id="registerFormEdit"
              className={isValid ? 'register__submit' : 'register__submit register__submit_disabled'}
              name="registerFormEdit"
              aria-label="Зарегистрироваться"
              type="submit"
              children={CONTENT_CONFIG.Register.button}
              disabled={isValid ? false : true}
            />
            <div className="register__already">
              <span className="register__description" children={CONTENT_CONFIG.Register.description} />
              <Link className="register__link" to="/signin" children={CONTENT_CONFIG.Register.link} />
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Register;
