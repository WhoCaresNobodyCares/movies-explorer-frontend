import { Link } from 'react-router-dom';

import './Login.css';

const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const Login = ({ mix }) => {
  return (
    <main className={`${mix} login`}>
      <section className='login__section'>
        <h1 className='login__title' children={CONTENT_CONFIG.Login.title} />
        <form
          id='loginForm'
          className='login__form'
          name='loginForm'
          action='#'
          method='post'
          target='_self'
          autoComplete='off'
          onSubmit={e => e.preventDefault()}>
          <div className='login__block'>
            <span className='login__label' children='E-mail' />
            <input
              id='loginFormEmailInput'
              className={false ? 'login__input' : 'login__input login__input_invalid'}
              name='loginFormEmailInput'
              type='email'
              placeholder='E-mail'
              autoComplete='off'
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              autoFocus
              required
              onChange={e => {}}
            />
          </div>
          <div className={false ? 'login__separator' : 'login__separator login__separator_error'} />
          <span
            className={false ? 'login__error' : 'login__error login__error_visible'}
            children={'login error'}
          />
          <div className='login__block'>
            <span className='login__label' children='Пароль' />
            <input
              id='loginFormPasswordInput'
              className={false ? 'login__input' : 'login__input login__input_invalid'}
              name='loginFormPasswordInput'
              type='password'
              placeholder='Пароль'
              autoComplete='off'
              pattern='^\S*$'
              minLength={4}
              required
              onChange={e => {}}
            />
          </div>
          <div className={false ? 'login__separator' : 'login__separator login__separator_error'} />
          <span
            className={false ? 'login__error' : 'login__error login__error_visible'}
            children={'login error'}
          />
          <div className='login__bottom'>
            <span
              className={true ? 'login__apiError login__apiError_visible' : 'login__apiError'}
              children={'login error'}
            />
            <button
              id='loginFormEdit'
              className={false ? 'login__submit' : 'login__submit login__submit_disabled'}
              name='loginFormEdit'
              aria-label='Войти'
              formMethod='post'
              type='submit'
              children={CONTENT_CONFIG.Login.button}
              disabled={true}
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
