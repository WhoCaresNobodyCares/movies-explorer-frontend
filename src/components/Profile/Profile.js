import { useEffect, useState } from 'react';

import './Profile.css';

const Profile = ({ mix, form, user, token, userState, formValidator }) => {
  const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

  const {
    inputValues,
    inputErrors,
    handleInputChange,
    isFormValid,
    resetForm,
  } = formValidator;

  const [isProfileEditMode, setIsProfileEditMode] = useState(false);
  const [isNameSame, setIsNameSame] = useState(true);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    resetForm(
      {
        profileFormNameInput: userState.name,
        profileFormEmailInput: userState.email,
      },
      {},
      false
    );
    setInitialValues({
      profileFormNameInput: userState.name,
      profileFormEmailInput: userState.email,
    });
    return () => {
      resetForm({}, {}, false);
      setInitialValues({});
    };
  }, [userState, isProfileEditMode]);

  return (
    <main className={`${mix} profile`}>
      <section className="profile__section">
        <h1
          className="profile__title"
          children={`Привет, ${userState.name}!`}
        />
        <form
          id="profileForm"
          className="profile__form"
          name="profileForm"
          action="#"
          method="post"
          target="_self"
          autoComplete="off"
          onSubmit={(e) =>
            form.handleProfileFormSubmit(
              e,
              inputValues,
              token,
              setIsProfileEditMode
            )
          }
        >
          <span className="profile__label" children="Имя" />
          <input
            id="profileFormNameInput"
            className={
              !isProfileEditMode
                ? 'profile__input'
                : `${
                    isFormValid || !inputErrors.profileFormNameInput
                      ? 'profile__input profile__input_enabled'
                      : 'profile__input profile__input_enabled profile__input_invalid'
                  }`
            }
            name="profileFormNameInput"
            type="text"
            placeholder="Имя"
            pattern="^\S*$"
            autoComplete="off"
            minLength={2}
            maxLength={30}
            value={inputValues.profileFormNameInput}
            required
            onKeyUp={(e) =>
              form.handleProfileFormSameNames(e, initialValues, setIsNameSame)
            }
            onChange={(e) => handleInputChange(e)}
          />
          <div
            className={
              isFormValid ||
              (!inputErrors.profileFormNameInput &&
                !inputErrors.profileFormEmailInput)
                ? 'profile__separator'
                : 'profile__separator profile__separator_error'
            }
          />
          <span className="profile__label" children="E-mail" />
          <input
            id="profileFormEmailInput"
            className={
              !isProfileEditMode
                ? 'profile__input'
                : `${
                    isFormValid || !inputErrors.profileFormEmailInput
                      ? 'profile__input profile__input_enabled'
                      : 'profile__input profile__input_enabled profile__input_invalid'
                  }`
            }
            name="profileFormEmailInput"
            type="email"
            autoComplete="off"
            placeholder="E-mail"
            pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            value={inputValues.profileFormEmailInput}
            required
            onKeyUp={(e) =>
              form.handleProfileFormSameNames(e, initialValues, setIsNameSame)
            }
            onChange={(e) => handleInputChange(e)}
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
                  onClick={() => setIsProfileEditMode(true)}
                  children={CONTENT_CONFIG.Profile.editButton}
                />
                <button
                  id="profileFormLogout"
                  className="profile__logout"
                  name="profileFormLogout"
                  aria-label="Выйти из профиля"
                  type="button"
                  onClick={() => user.handleSignout()}
                  children={CONTENT_CONFIG.Profile.logoutButton}
                />
              </>
            )}
            {isProfileEditMode && (
              <>
                <span
                  className={
                    !isFormValid
                      ? 'profile__error profile__error_visible'
                      : 'profile__error'
                  }
                  children={
                    inputErrors.profileFormNameInput ||
                    inputErrors.profileFormEmailInput
                  }
                />
                <button
                  id="profileFormSubmit"
                  className={
                    isFormValid && !isNameSame
                      ? 'profile__submit'
                      : 'profile__submit profile__submit_disabled'
                  }
                  name="profileFormSubmit"
                  aria-label="Подтвердить изменения"
                  type="submit"
                  formMethod="post"
                  form="profileForm"
                  children={CONTENT_CONFIG.Profile.saveButton}
                  disabled={isFormValid && !isNameSame ? false : true}
                />
                <button
                  id="profileFormDiscard"
                  className="profile__discard"
                  name="profileFormDiscard"
                  aria-label="Отменить изменения"
                  type="button"
                  onClick={() =>
                    form.handleProfileDiscard(
                      resetForm,
                      userState,
                      setIsProfileEditMode
                    )
                  }
                  children={
                    !isNameSame
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
