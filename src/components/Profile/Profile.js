import { useContext, useEffect, useRef, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import { useFormValidation } from '../../utils/customHooks/useFormValidation';

import './Profile.css';

const Profile = ({ mix, handleSignout, handleUpdateUserInfo }) => {
  const { user } = useContext(UserContext);

  const isMounted = useRef(false);
  const { values, handleChange, errors, isValid } = useFormValidation();

  const [defaultButtonState, setDefaultButtonState] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [isNameSame, setIsNameSame] = useState(false);
  const [isEmailSame, setIsEmailSame] = useState(false);

  const resetState = () => {
    setIsNameSame(false);
    setIsEmailSame(false);
    setEditMode(false);
    setDefaultButtonState(false);
  };

  useEffect(() => {
    if (isMounted.current === true) {
      setDefaultButtonState(true);
    } else {
      values.profileFormNameInput = user.name;
      values.profileFormEmailInput = user.email;
      isMounted.current = true;
    }
  }, [isValid, values]);

  return (
    <main className={`${mix} profile`}>
      <section className="profile__section">
        <h1 className="profile__title" children={`Привет, ${user.name}!`} />
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
            const { profileFormNameInput, profileFormEmailInput } = values;
            handleUpdateUserInfo(profileFormNameInput, profileFormEmailInput, resetState);
          }}
        >
          <span className="profile__label" children="Имя" />
          <input
            id="profileFormNameInput"
            className={
              !editMode
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
            minLength={2}
            maxLength={30}
            defaultValue={user.name}
            required
            onChange={(e) => {
              e.target.value === user.name ? setIsNameSame(false) : setIsNameSame(true);
              handleChange(e);
            }}
          />
          <div className={isValid ? 'profile__separator' : 'profile__separator profile__separator_error'} />
          <span className="profile__label" children="E-mail" />
          <input
            id="profileFormEmailInput"
            className={
              !editMode
                ? 'profile__input'
                : `${
                    !errors.profileFormEmailInput
                      ? 'profile__input profile__input_enabled'
                      : 'profile__input profile__input_enabled profile__input_invalid'
                  }`
            }
            name="profileFormEmailInput"
            type="email"
            pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            placeholder="E-mail"
            autoComplete="on"
            defaultValue={user.email}
            required
            onChange={(e) => {
              e.target.value === user.email ? setIsEmailSame(false) : setIsEmailSame(true);
              handleChange(e);
            }}
          />
          <div className="profile__bottom">
            {!editMode && (
              <>
                <button
                  id="profileFormEdit"
                  className="profile__edit"
                  name="profileFormEdit"
                  aria-label="Разблокировать форму"
                  type="button"
                  onClick={() => setEditMode(!editMode)}
                  children="Редактировать"
                />
                <button
                  id="profileFormLogout"
                  className="profile__logout"
                  name="profileFormLogout"
                  aria-label="Выйти из профиля"
                  type="button"
                  onClick={() => handleSignout()}
                  children="Выйти из аккаунта"
                />
              </>
            )}
            {editMode && (
              <>
                <span
                  className={!isValid ? 'profile__error profile__error_visible' : 'profile__error'}
                  children={errors.profileFormNameInput || errors.profileFormEmailInput}
                />
                <button
                  id="profileFormSubmit"
                  className={
                    isValid && defaultButtonState && (isNameSame || isEmailSame)
                      ? 'profile__submit'
                      : 'profile__submit profile__submit_disabled'
                  }
                  name="profileFormSubmit"
                  aria-label="Подтвердить изменения"
                  type="submit"
                  formMethod="post"
                  form="profileForm"
                  children="Сохранить"
                  disabled={isValid && defaultButtonState && (isNameSame || isEmailSame) ? false : true}
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
