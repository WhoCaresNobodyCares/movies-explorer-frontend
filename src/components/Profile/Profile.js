import { useEffect } from 'react';

import './Profile.css';

import useFormValidation from '../../utils/customHooks/useFormValidation';
import useProfileState from '../../utils/customHooks/useProfileState';

const Profile = ({ mix, userLogic, userState }) => {
  const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

  const { values, errors, handleChange, isValid, resetForm } = useFormValidation();
  const { isProfileNameSame, isProfileEmailSame, handleStateChange, isProfileEditMode, setIsProfileEditMode } = useProfileState(userState);

  const { handleSignOut, handleUpdateUser } = userLogic;

  useEffect(() => {
    resetForm(
      {
        profileFormNameInput: userState.name,
        profileFormEmailInput: userState.email,
      },
      {},
      false
    );
  }, [resetForm]);

  return (
    <main className={`${mix} profile`}>
      <section className="profile__section">
        <h1 className="profile__title" children={`Привет, ${userState.name}!`} />
        <form
          id="profileForm"
          className="profile__form"
          name="profileForm"
          action="#"
          method="post"
          target="_self"
          autoComplete="on"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateUser(values.profileFormNameInput, values.profileFormEmailInput);
            resetForm(
              {
                profileFormNameInput: values.profileFormNameInput,
                profileFormEmailInput: values.profileFormEmailInput,
              },
              {},
              false
            );
            setIsProfileEditMode(false);
          }}
        >
          <span className="profile__label" children="Имя" />
          <input
            id="profileFormNameInput"
            className={
              !isProfileEditMode ? 'profile__input' : `${!errors.profileFormNameInput ? 'profile__input profile__input_enabled' : 'profile__input profile__input_enabled profile__input_invalid'}`
            }
            name="profileFormNameInput"
            type="text"
            placeholder="Имя"
            autoComplete="on"
            pattern="^\S*$"
            minLength={2}
            maxLength={30}
            defaultValue={userState.name}
            required
            onChange={(e) => {
              handleChange(e);
              handleStateChange(e);
            }}
          />
          <div className={errors.profileFormNameInput || errors.profileFormEmailInput ? 'profile__separator profile__separator_error' : 'profile__separator'} />
          <span className="profile__label" children="E-mail" />
          <input
            id="profileFormEmailInput"
            className={
              !isProfileEditMode ? 'profile__input' : `${!errors.profileFormEmailInput ? 'profile__input profile__input_enabled' : 'profile__input profile__input_enabled profile__input_invalid'}`
            }
            name="profileFormEmailInput"
            type="email"
            placeholder="E-mail"
            autoComplete="on"
            defaultValue={userState.email}
            pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            required
            onChange={(e) => {
              handleChange(e);
              handleStateChange(e);
            }}
          />
          <div className="profile__bottom">
            {!isProfileEditMode && (
              <>
                <button
                  id="profileFormEdit"
                  className="profile__edit"
                  name="profileFormEdit"
                  aria-label="Разблокировать форму"
                  type="button"
                  onClick={() => setIsProfileEditMode(!isProfileEditMode)}
                  children={CONTENT_CONFIG.Profile.editButton}
                />
                <button
                  id="profileFormLogout"
                  className="profile__logout"
                  name="profileFormLogout"
                  aria-label="Выйти из профиля"
                  type="button"
                  onClick={() => handleSignOut()}
                  children={CONTENT_CONFIG.Profile.logoutButton}
                />
              </>
            )}
            {isProfileEditMode && (
              <>
                <span className={!isValid ? 'profile__error profile__error_visible' : 'profile__error'} children={errors.profileFormNameInput || errors.profileFormEmailInput} />
                <button
                  id="profileFormSubmit"
                  className={isValid && isProfileNameSame && isProfileEmailSame ? 'profile__submit' : 'profile__submit profile__submit_disabled'}
                  name="profileFormSubmit"
                  aria-label="Подтвердить изменения"
                  type="submit"
                  formMethod="post"
                  form="profileForm"
                  children={CONTENT_CONFIG.Profile.saveButton}
                  disabled={isValid && isProfileNameSame && isProfileEmailSame ? false : true}
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
