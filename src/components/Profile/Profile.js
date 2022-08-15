import { useEffect, useState } from 'react';

import './Profile.css';

const Profile = ({ mix }) => {
  const [editMode, setEditMode] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [buttonIsValid, setButtonIsValid] = useState(false);

  useEffect(() => {
    nameIsValid && emailIsValid ? setButtonIsValid(true) : setButtonIsValid(false);
  }, [nameIsValid, emailIsValid]);

  return (
    <main className={`${mix} profile`}>
      <section className="profile__section">
        <h1 className="profile__title" children={`Привет, ${`NAME`}!`} />
        <form
          id="profile-form"
          className="profile__form"
          name="profile-form"
          action="#"
          method="post"
          target="_self"
          autoComplete="on"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('profile-form');
            setEditMode(false);
          }}
        >
          <span className="profile__label" children="Имя" />
          <input
            id="profile-form-name-input"
            className={!editMode ? 'profile__input' : `profile__input profile__input_enabled ${!nameIsValid && 'profile__input_invalid'}`}
            name="profile-form-name-input"
            type="text"
            placeholder="Имя"
            autoComplete="on"
            required
            onChange={(e) => {
              e.target.value.length >= 2 && e.target.value.length <= 30 ? setNameIsValid(true) : setNameIsValid(false);
            }}
          />
          <div className={nameIsValid && emailIsValid ? 'profile__separator' : 'profile__separator profile__separator_error'} />
          <span className="profile__label" children="E-mail" />
          <input
            id="profile-form-email-input"
            className={!editMode ? 'profile__input' : `profile__input profile__input_enabled ${!emailIsValid && 'profile__input_invalid'}`}
            name="profile-form-email-input"
            type="email"
            placeholder="E-mail"
            autoComplete="on"
            required
            onChange={(e) => {
              let value = e.target.value;
              const pattern =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              setEmailIsValid(pattern.test(value));
            }}
          />
          <div className="profile__bottom">
            {!editMode && (
              <>
                <button
                  id="profile-form-edit"
                  className="profile__edit"
                  name="profile-form-edit"
                  aria-label="Разблокировать форму"
                  type="button"
                  onClick={() => setEditMode(!editMode)}
                  children="Редактировать"
                />
                <button
                  id="profile-form-logout"
                  className="profile__logout"
                  name="profile-form-logout"
                  aria-label="Выйти из профиля"
                  type="button"
                  onClick={() => {}}
                  children="Выйти из аккаунта"
                />
              </>
            )}
            {editMode && (
              <>
                <span
                  className={!buttonIsValid ? 'profile__error profile__error_visible' : 'profile__error'}
                  children={
                    !nameIsValid
                      ? 'Имя пользователя должно содержать от двух до тридцати символов'
                      : 'Данное поле должно содержать e-mail'
                  }
                />
                <button
                  id="profile-form-submit"
                  className={nameIsValid && emailIsValid && buttonIsValid ? 'profile__submit' : 'profile__submit profile__submit_disabled'}
                  name="profile-form-submit"
                  aria-label="Подтвердить изменения"
                  type="submit"
                  formMethod="post"
                  form="profile-form"
                  children="Сохранить"
                  disabled={!buttonIsValid}
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
