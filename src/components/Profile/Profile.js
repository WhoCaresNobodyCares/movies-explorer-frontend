import { useEffect, useRef, useState } from 'react';

import './Profile.css';

import useFormValidation from '../../utils/customHooks/useFormValidation';

const Profile = ({ mix }) => {
  const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

  const isMounted = useRef(false);

  const { values, errors, handleChange, isValid, resetForm } = useFormValidation();

  const [isProfileEditMode, setIsProfileEditMode] = useState(false);
  const [isProfileNameSame, setIsProfileNameSame] = useState(false);
  const [isProfileEmailSame, setIsProfileEmailSame] = useState(false);
  const [isSubmitButtonDefault, setIsSubmitButtonDefault] = useState(false);

  const resetState = () => {
    setIsProfileNameSame(false);
    setIsProfileEmailSame(false);
    setIsProfileEditMode(false);
    setIsSubmitButtonDefault(false);
  };

  useEffect(() => {
    if (isMounted.current === true) {
      setIsSubmitButtonDefault(true);
    } else {
      // formValidation.values.profileFormNameInput = user.name;
      // formValidation.values.profileFormEmailInput = user.email;
      isMounted.current = true;
    }
  }, [isValid, values]);

  return (
    <main className={`${mix} profile`}>
      <section className="profile__section">
        <h1 className="profile__title" children={`Привет, ${`NAME`}!`} />
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
            resetForm();
            setIsProfileEditMode(false);
          }}
        >
          <span className="profile__label" children="Имя" />
          <input
            id="profileFormNameInput"
            className={
              !isProfileEditMode
                ? 'profile__input'
                : `${
                    !errors.profileFormNameInput
                      ? 'profile__input profile__input_enabled'
                      : 'profile__input profile__input_enabled profile__input_invalid'
                  }`
            }
            name="profileFormNameInput"
            type="text"
            placeholder="Имя"
            autoComplete="on"
            pattern="^\S*$"
            minLength={2}
            maxLength={30}
            defaultValue={'user.name'}
            required
            // onChange={(e) => {
            // 	e.target.value === user.email
            // 		? setIsEmailSame(false)
            // 		: setIsEmailSame(true);
            // 	handleChange(e);
            // }}
          />
          <div
            className={
              isValid ? 'profile__separator' : 'profile__separator profile__separator_error'
            }
          />
          <span className="profile__label" children="E-mail" />
          <input
            id="profileFormEmailInput"
            className={
              !isProfileEditMode
                ? 'profile__input'
                : `${
                    !errors.profileFormEmailInput
                      ? 'profile__input profile__input_enabled'
                      : 'profile__input profile__input_enabled profile__input_invalid'
                  }`
            }
            name="profileFormEmailInput"
            type="email"
            placeholder="E-mail"
            autoComplete="on"
            pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            required
            // onChange={(e) => {
            // 	e.target.value === user.email
            // 		? setIsEmailSame(false)
            // 		: setIsEmailSame(true);
            // 	handleChange(e);
            // }}
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
                  onClick={() => {}}
                  children={CONTENT_CONFIG.Profile.logoutButton}
                />
              </>
            )}
            {isProfileEditMode && (
              <>
                <span
                  className={!isValid ? 'profile__error profile__error_visible' : 'profile__error'}
                  children={errors.profileFormNameInput || errors.profileFormEmailInput}
                />
                <button
                  id="profileF0ormSubmit"
                  className={
                    isValid && isSubmitButtonDefault /*&& (isNameSame || isEmailSame) */
                      ? 'profile__submit'
                      : 'profile__submit profile__submit_disabled'
                  }
                  name="profileF0ormSubmit"
                  aria-label="Подтвердить изменения"
                  type="submit"
                  formMethod="post"
                  form="profile-form"
                  children={CONTENT_CONFIG.Profile.saveButton}
                  disabled={
                    isValid && isSubmitButtonDefault /*&& (isNameSame || isEmailSame) */
                      ? false
                      : true
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
