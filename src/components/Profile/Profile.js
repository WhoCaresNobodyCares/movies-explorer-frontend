import { useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import useFormValidator from '../../utils/customHooks/useFormValidator';
import './Profile.css';
const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const Profile = ({ mix }) => {
  // * HOOKS
  const { userState, profileApiError, setProfileApiError, formLogic, userLogic } =
    useContext(AppContext);

  const { inputValues, inputErrors, handleInputChange, isFormValid, resetForm } =
    useFormValidator();

  // * STATES
  const [isProfileEditMode, setIsProfileEditMode] = useState(false);
  const [isNameSame, setIsNameSame] = useState(true);
  const [initialValues, setInitialValues] = useState({});

  // * EFFECTS
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
      setProfileApiError('');
    };
  }, []);

  return (
    <main className={`${mix} profile`}>
      <section className="profile__section">
        <AppContext.Consumer>
          {({ userState }) => (
            <h1 className="profile__title" children={`Привет, ${userState.name}!`} />
          )}
        </AppContext.Consumer>
        <form
          id="profileForm"
          className="profile__form"
          name="profileForm"
          action="#"
          method="post"
          target="_self"
          autoComplete="off"
          onSubmit={(e) =>
            formLogic.handleProfileFormSubmit(
              e,
              inputValues,
              setIsProfileEditMode,
              resetForm,
              setInitialValues,
              userState
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
            pattern="^[a-zа-я|А-ЯA-Z\-]+(?: [a-zа-я|А-ЯA-Z\-]+)*$"
            autoComplete="off"
            minLength={2}
            maxLength={30}
            value={inputValues.profileFormNameInput}
            required
            onKeyUp={(e) =>
              formLogic.handleProfileFormSameNames(e, initialValues, setIsNameSame)
            }
            onChange={(e) => handleInputChange(e, setProfileApiError)}
          />
          <div
            className={
              isFormValid ||
              (!inputErrors.profileFormNameInput && !inputErrors.profileFormEmailInput)
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
              formLogic.handleProfileFormSameNames(e, initialValues, setIsNameSame)
            }
            onChange={(e) => handleInputChange(e, setProfileApiError)}
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
                  onClick={() => userLogic.handleSignout()}
                  children={CONTENT_CONFIG.Profile.logoutButton}
                />
              </>
            )}
            {isProfileEditMode && (
              <>
                <span
                  className={
                    !isFormValid || profileApiError
                      ? 'profile__error profile__error_visible'
                      : 'profile__error'
                  }
                  children={
                    inputErrors.profileFormNameInput ||
                    inputErrors.profileFormEmailInput ||
                    profileApiError
                  }
                />
                <button
                  id="profileFormSubmit"
                  className={
                    isFormValid && !isNameSame && !profileApiError
                      ? 'profile__submit'
                      : 'profile__submit profile__submit_disabled'
                  }
                  name="profileFormSubmit"
                  aria-label="Подтвердить изменения"
                  type="submit"
                  formMethod="post"
                  form="profileForm"
                  children={CONTENT_CONFIG.Profile.saveButton}
                  disabled={isFormValid && !isNameSame && !profileApiError ? false : true}
                />
                <button
                  id="profileFormDiscard"
                  className="profile__discard"
                  name="profileFormDiscard"
                  aria-label="Отменить изменения"
                  type="button"
                  onClick={() =>
                    formLogic.handleProfileDiscard(
                      resetForm,
                      userState,
                      setProfileApiError,
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
