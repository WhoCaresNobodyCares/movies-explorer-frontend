import { useContext, useReducer, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import reduceForm from '../../utils/reducers/reduceForm';
import './Profile.css';
const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const Profile = ({ mix, handleProfileUpdate, handleSignout }) => {
  const userState = useContext(UserContext);

  const [state, dispatch] = useReducer(reduceForm, {
    name: userState.userData.name,
    isNameValid: true,
    nameError: '',
    isNameSame: true,
    email: userState.userData.email,
    isEmailValid: true,
    emailError: '',
    isEmailSame: true,
    isEditMode: false,
    isFormValid: false,
  });

  const {
    name,
    isNameValid,
    nameError,
    isNameSame,
    email,
    isEmailValid,
    emailError,
    isEmailSame,
    isEditMode,
    isFormValid,
  } = state;

  const [apiError, setApiError] = useState('');

  return (
    <main className={`${mix} profile`}>
      <section className='profile__section'>
        <h1
          className='profile__title'
          children={`Привет, ${userState.userData.name}!`}
        />
        <form
          id='profileForm'
          className='profile__form'
          name='form'
          action='#'
          method='post'
          target='_self'
          autoComplete='off'
          onSubmit={e =>
            handleProfileUpdate(e, name, email, dispatch, setApiError)
          }>
          <span className='profile__label' children='Имя' />
          <input
            id='profileFormNameInput'
            className={
              !isEditMode
                ? 'profile__input'
                : `${
                    isNameValid
                      ? 'profile__input profile__input_enabled'
                      : `profile__input profile__input_enabled profile__input_invalid`
                  }`
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
            onChange={e => {
              dispatch({
                type: 'HANDLE_SAME',
                payload: {
                  name: e.target.name,
                  value: e.target.value,
                  currentName: userState.userData.name,
                },
              });
              dispatch({
                type: 'HANDLE_INPUT',
                payload: {
                  name: e.target.name,
                  value: e.target.value,
                  error: e.target.validationMessage,
                  isValid: e.target.closest('form').checkValidity(),
                },
              });
            }}
          />
          <div
            className={
              isNameValid && isEmailValid
                ? 'profile__separator'
                : 'profile__separator profile__separator_error'
            }
          />
          <span className='profile__label' children='E-mail' />
          <input
            id='profileFormEmailInput'
            className={
              !isEditMode
                ? 'profile__input'
                : `${
                    isEmailValid
                      ? 'profile__input profile__input_enabled'
                      : 'profile__input profile__input_enabled profile__input_invalid'
                  }`
            }
            name='email'
            type='email'
            autoComplete='off'
            placeholder='E-mail'
            pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            required
            value={email}
            onChange={e => {
              dispatch({
                type: 'HANDLE_SAME',
                payload: {
                  name: e.target.name,
                  value: e.target.value,
                  currentName: userState.userData.email,
                },
              });
              dispatch({
                type: 'HANDLE_INPUT',
                payload: {
                  name: e.target.name,
                  value: e.target.value,
                  error: e.target.validationMessage,
                  isValid: e.target.closest('form').checkValidity(),
                },
              });
            }}
          />
          <div className='profile__bottom'>
            {!isEditMode && (
              <>
                <button
                  id='profileFormEdit'
                  className='profile__edit'
                  name='unlock'
                  aria-label='Разблокировать форму'
                  type='button'
                  onClick={() =>
                    dispatch({
                      type: 'UNLOCK_INPUTS',
                      payload: { value: true },
                    })
                  }
                  children={CONTENT_CONFIG.Profile.editButton}
                />
                <button
                  id='profileFormLogout'
                  className='profile__logout'
                  name='logout'
                  aria-label='Выйти из профиля'
                  type='button'
                  onClick={() => handleSignout()}
                  children={CONTENT_CONFIG.Profile.logoutButton}
                />
              </>
            )}
            {isEditMode && (
              <>
                <span
                  className={
                    nameError && emailError
                      ? 'profile__error'
                      : 'profile__error profile__error_visible'
                  }
                  children={nameError || emailError || apiError}
                />
                <button
                  id='profileFormSubmit'
                  className={
                    isFormValid && (!isNameSame || !isEmailSame)
                      ? 'profile__submit'
                      : 'profile__submit profile__submit_disabled'
                  }
                  name='submit'
                  aria-label='Подтвердить изменения'
                  formMethod='post'
                  type='submit'
                  form='profileForm'
                  children={CONTENT_CONFIG.Profile.saveButton}
                  disabled={
                    isFormValid && (!isNameSame || !isEmailSame) ? false : true
                  }
                />
                <button
                  id='profileFormDiscard'
                  className='profile__discard'
                  name='discard'
                  aria-label='Отменить изменения'
                  type='button'
                  onClick={() =>
                    dispatch({
                      type: 'HANDLE_DISCARD',
                      payload: {
                        name: userState.userData.name,
                        email: userState.userData.email,
                      },
                    })
                  }
                  children={
                    !isNameSame || !isEmailSame
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
