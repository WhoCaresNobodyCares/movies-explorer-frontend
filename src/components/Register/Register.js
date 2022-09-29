import { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import reduceForm from '../../utils/reducers/reduceForm';
import './Register.css';
const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const Register = ({ mix, handleSignup }) => {
  const [state, dispatch] = useReducer(reduceForm, {
    name: '',
    isNameValid: true,
    nameError: '',
    email: '',
    isEmailValid: true,
    emailError: '',
    password: '',
    isPasswordValid: true,
    passwordError: '',
    isFormValid: false,
  });

  const {
    name,
    isNameValid,
    nameError,
    email,
    isEmailValid,
    emailError,
    password,
    isPasswordValid,
    passwordError,
    isFormValid,
  } = state;

  const [apiError, setApiError] = useState('');

  return (
    <main className={`${mix} register`}>
      <section className='register__section'>
        <h1
          className='register__title'
          children={CONTENT_CONFIG.Register.title}
        />
        <form
          id='registerForm'
          className='register__form'
          name='form'
          action='#'
          method='post'
          target='_self'
          autoComplete='off'
          onSubmit={e =>
            handleSignup(
              e,
              name.replace(/^\s+|\s+$/g, ''),
              email,
              password,
              setApiError
            )
          }>
          <div className='register__block'>
            <span className='register__label' children='Имя' />
            <input
              id='registerFormNameInput'
              className={
                isNameValid
                  ? 'register__input'
                  : 'register__input register__input_invalid'
              }
              name='name'
              type='text'
              placeholder='Имя'
              pattern='^([a-zA-Zа-яА-Я]+[\s|\-]?)+$'
              autoComplete='off'
              minLength={2}
              maxLength={30}
              required
              value={name}
              onChange={e =>
                dispatch({
                  type: 'HANDLE_INPUT',
                  payload: {
                    name: e.target.name,
                    value: e.target.value,
                    error: e.target.validationMessage,
                    isValid: e.target.closest('form').checkValidity(),
                  },
                })
              }
            />
          </div>
          <div
            className={
              isNameValid
                ? 'register__separator'
                : 'register__separator register__separator_error'
            }
          />
          <span
            className={
              isNameValid
                ? 'register__error'
                : 'register__error register__error_visible'
            }
            children={nameError}
          />
          <div className='register__block'>
            <span className='register__label' children='E-mail' />
            <input
              id='registerFormEmailInput'
              className={
                isEmailValid
                  ? 'register__input'
                  : 'register__input register__input_invalid'
              }
              name='email'
              type='email'
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              placeholder='E-mail'
              autoComplete='off'
              required
              value={email}
              onChange={e =>
                dispatch({
                  type: 'HANDLE_INPUT',
                  payload: {
                    name: e.target.name,
                    value: e.target.value,
                    error: e.target.validationMessage,
                    isValid: e.target.closest('form').checkValidity(),
                  },
                })
              }
            />
          </div>
          <div
            className={
              isEmailValid
                ? 'register__separator'
                : 'register__separator register__separator_error'
            }
          />
          <span
            className={
              isEmailValid
                ? 'register__error'
                : 'register__error register__error_visible'
            }
            children={emailError}
          />
          <div className='register__block'>
            <span className='register__label' children='Password' />
            <input
              id='registerFormPasswordInput'
              className={
                isPasswordValid
                  ? 'register__input'
                  : 'register__input register__input_invalid'
              }
              name='password'
              type='password'
              placeholder='Пароль'
              pattern='^\S*$'
              autoComplete='off'
              minLength={4}
              required
              value={password}
              onChange={e =>
                dispatch({
                  type: 'HANDLE_INPUT',
                  payload: {
                    name: e.target.name,
                    value: e.target.value,
                    error: e.target.validationMessage,
                    isValid: e.target.closest('form').checkValidity(),
                  },
                })
              }
            />
          </div>
          <div
            className={
              isPasswordValid
                ? 'register__separator'
                : 'register__separator register__separator_error'
            }
          />
          <span
            className={
              isPasswordValid
                ? 'register__error'
                : 'register__error register__error_visible'
            }
            children={passwordError}
          />
          <div className='register__bottom'>
            <span
              className={
                apiError !== ''
                  ? 'register__apiError register__apiError_visible'
                  : 'register__apiError'
              }
              children={apiError}
            />
            <button
              id='registerFormEdit'
              className={
                isFormValid
                  ? 'register__submit'
                  : 'register__submit register__submit_disabled'
              }
              name='submit'
              aria-label='Зарегистрироваться'
              formMethod='post'
              type='submit'
              children={CONTENT_CONFIG.Register.button}
              disabled={!isFormValid}
            />
            <div className='register__already'>
              <span
                className='register__description'
                children={CONTENT_CONFIG.Register.description}
              />
              <Link
                className='register__link'
                to='/signin'
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
