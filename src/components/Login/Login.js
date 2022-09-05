import { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import reduceForm from '../../utils/reducers/reduceForm';
import './Login.css';
const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const Login = ({ mix, handleSignin }) => {
  const [state, dispatch] = useReducer(reduceForm, {
    email: '',
    isEmailValid: true,
    emailError: '',
    password: '',
    isPasswordValid: true,
    passwordError: '',
    isFormValid: false,
  });

  const { email, isEmailValid, emailError, password, isPasswordValid, passwordError, isFormValid } = state;
  const [apiError, setApiError] = useState('');

  return (
    <main className={`${mix} login`}>
      <section className='login__section'>
        <h1 className='login__title' children={CONTENT_CONFIG.Login.title} />
        <form
          id='loginForm'
          className='login__form'
          name='form'
          action='#'
          method='post'
          target='_self'
          autoComplete='off'
          onSubmit={e => handleSignin(e, email, password, setApiError)}>
          <div className='login__block'>
            <span className='login__label' children='E-mail' />
            <input
              id='loginFormEmailInput'
              className={isEmailValid ? 'login__input' : 'login__input login__input_invalid'}
              name='email'
              type='email'
              placeholder='E-mail'
              autoComplete='off'
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              autoFocus
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
          <div className={isEmailValid ? 'login__separator' : 'login__separator login__separator_error'} />
          <span className={isEmailValid ? 'login__error' : 'login__error login__error_visible'} children={emailError} />
          <div className='login__block'>
            <span className='login__label' children='Пароль' />
            <input
              id='loginFormPasswordInput'
              className={isPasswordValid ? 'login__input' : 'login__input login__input_invalid'}
              name='password'
              type='password'
              placeholder='Пароль'
              autoComplete='off'
              pattern='^\S*$'
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
          <div className={isPasswordValid ? 'login__separator' : 'login__separator login__separator_error'} />
          <span className={isPasswordValid ? 'login__error' : 'login__error login__error_visible'} children={passwordError} />
          <div className='login__bottom'>
            <span className={apiError !== '' ? 'login__apiError login__apiError_visible' : 'login__apiError'} children={apiError} />
            <button
              id='loginFormEdit'
              className={isFormValid ? 'login__submit' : 'login__submit login__submit_disabled'}
              name='submit'
              aria-label='Войти'
              formMethod='post'
              type='submit'
              children={CONTENT_CONFIG.Login.button}
              disabled={!isFormValid}
            />
            <div className='login__already'>
              <span className='login__description' children={CONTENT_CONFIG.Login.description} />
              <Link className='login__link' to='/signup' children={CONTENT_CONFIG.Login.link} />
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
