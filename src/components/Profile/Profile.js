import { useState } from 'react';

import './Profile.css';

const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const Profile = ({ mix, userState }) => {
  // * STATES
  const [isProfileEditMode, setIsProfileEditMode] = useState(false);

  return (
    <main className={`${mix} profile`}>
      <section className='profile__section'>
        <h1 className='profile__title' children={`Привет, ${userState.userData.name}!`} />
        <form
          id='profileForm'
          className='profile__form'
          name='profileForm'
          action='#'
          method='post'
          target='_self'
          autoComplete='off'
          onSubmit={e => e.preventDefault()}>
          <span className='profile__label' children='Имя' />
          <input
            id='profileFormNameInput'
            className={
              !isProfileEditMode
                ? 'profile__input'
                : `${
                    false
                      ? 'profile__input profile__input_enabled'
                      : 'profile__input profile__input_enabled profile__input_invalid'
                  }`
            }
            name='profileFormNameInput'
            type='text'
            placeholder='Имя'
            pattern='[A-Za-zА-Яа-я]+([\s\-])?'
            autoComplete='off'
            minLength={2}
            maxLength={30}
            required
            onKeyUp={e => {}}
            onChange={e => {}}
          />
          <div
            className={false ? 'profile__separator' : 'profile__separator profile__separator_error'}
          />
          <span className='profile__label' children='E-mail' />
          <input
            id='profileFormEmailInput'
            className={
              !isProfileEditMode
                ? 'profile__input'
                : `${
                    false
                      ? 'profile__input profile__input_enabled'
                      : 'profile__input profile__input_enabled profile__input_invalid'
                  }`
            }
            name='profileFormEmailInput'
            type='email'
            autoComplete='off'
            placeholder='E-mail'
            pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            required
            onKeyUp={e => {}}
            onChange={e => {}}
          />
          <div className='profile__bottom'>
            {!isProfileEditMode && (
              <>
                <button
                  id='profileFormEdit'
                  className='profile__edit'
                  name='profileFormEdit'
                  aria-label='Разблокировать форму'
                  type='button'
                  onClick={() => setIsProfileEditMode(true)}
                  children={CONTENT_CONFIG.Profile.editButton}
                />
                <button
                  id='profileFormLogout'
                  className='profile__logout'
                  name='profileFormLogout'
                  aria-label='Выйти из профиля'
                  type='button'
                  onClick={() => {}}
                  children={CONTENT_CONFIG.Profile.logoutButton}
                />
              </>
            )}
            {isProfileEditMode && (
              <>
                <span
                  className={false ? 'profile__error' : 'profile__error profile__error_visible'}
                  children={'profile error'}
                />
                <button
                  id='profileFormSubmit'
                  className={false ? 'profile__submit' : 'profile__submit profile__submit_disabled'}
                  name='profileFormSubmit'
                  aria-label='Подтвердить изменения'
                  formMethod='post'
                  type='submit'
                  form='profileForm'
                  children={CONTENT_CONFIG.Profile.saveButton}
                  disabled={true}
                />
                <button
                  id='profileFormDiscard'
                  className='profile__discard'
                  name='profileFormDiscard'
                  aria-label='Отменить изменения'
                  type='button'
                  onClick={() => {}}
                  children={
                    false
                      ? CONTENT_CONFIG.Profile.discardButtonCancel
                      : CONTENT_CONFIG.Profile.discardButtonReturn
                  }
                />
              </>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default Profile;
