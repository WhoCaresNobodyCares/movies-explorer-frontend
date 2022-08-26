import { Link } from 'react-router-dom';

import './Register.css';

const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const Register = ({ mix }) => {
  return (
    <main className={`${mix} register`}>
      <section className='register__section'>
        <h1 className='register__title' children={CONTENT_CONFIG.Register.title} />
        <form
          id='registerForm'
          className='register__form'
          name='registerForm'
          action='#'
          method='post'
          target='_self'
          autoComplete='off'
          onSubmit={e => e.preventDefault()}>
          <div className='register__block'>
            <span className='register__label' children='Имя' />
            <input
              id='registerFormNameInput'
              className={false ? 'register__input' : 'register__input register__input_invalid'}
              name='registerFormNameInput'
              type='text'
              placeholder='Имя'
              pattern='[A-Za-zА-Яа-я]+([\s\-])?'
              autoComplete='off'
              minLength={2}
              maxLength={30}
              autoFocus
              required
              onChange={e => {}}
            />
          </div>
          <div
            className={
              false ? 'register__separator' : 'register__separator register__separator_error'
            }
          />
          <span
            className={false ? 'register__error' : 'register__error register__error_visible'}
            children={'error'}
          />
          <div className='register__block'>
            <span className='register__label' children='E-mail' />
            <input
              id='registerFormEmailInput'
              className={false ? 'register__input' : 'register__input register__input_invalid'}
              name='registerFormEmailInput'
              type='email'
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              placeholder='E-mail'
              autoComplete='off'
              required
              onChange={e => {}}
            />
          </div>
          <div
            className={
              false ? 'register__separator' : 'register__separator register__separator_error'
            }
          />
          <span
            className={false ? 'register__error' : 'register__error register__error_visible'}
            children={'error'}
          />
          <div className='register__block'>
            <span className='register__label' children='Password' />
            <input
              id='registerFormPasswordInput'
              className={false ? 'register__input' : 'register__input register__input_invalid'}
              name='registerFormPasswordInput'
              type='password'
              placeholder='Пароль'
              pattern='^\S*$'
              autoComplete='off'
              minLength={4}
              required
              onChange={e => {}}
            />
          </div>
          <div
            className={
              false ? 'register__separator' : 'register__separator register__separator_error'
            }
          />
          <span
            className={false ? 'register__error' : 'register__error register__error_visible'}
            children={'error'}
          />
          <div className='register__bottom'>
            <span
              className={
                false ? 'register__apiError' : 'register__apiError register__apiError_visible'
              }
              children={'error'}
            />
            <button
              id='registerFormEdit'
              className={false ? 'register__submit' : 'register__submit register__submit_disabled'}
              name='registerFormEdit'
              aria-label='Зарегистрироваться'
              formMethod='post'
              type='submit'
              children={CONTENT_CONFIG.Register.button}
              disabled={true}
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
