import { useState } from 'react';

import './Profile.css';

const Profile = ({ mix }) => {
  const [editMode, setEditMode] = useState(false);

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
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            console.log('profile-form');
            setEditMode(false);
          }}
        >
          <span className="profile__label" children="Имя" />
          <input
            id="profile-form-name-input"
            className={!editMode ? 'profile__input' : 'profile__input profile__input_enabled'}
            name="profile-form-name-input"
            type="text"
            minLength="0"
            maxLength="40"
            placeholder="Имя"
            autoComplete="on"
            required
            onChange={() => {
              console.log('profile-form-name-input');
            }}
          />
          <div className="profile__separator" />
          <span className="profile__label" children="E-mail" />
          <input
            id="profile-form-email-input"
            className={!editMode ? 'profile__input' : 'profile__input profile__input_enabled'}
            name="profile-form-email-input"
            type="email"
            minLength="0"
            maxLength="40"
            placeholder="E-mail"
            autoComplete="on"
            required
            onChange={() => {
              console.log('profile-form-email-input');
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
                <span className="profile__error profile__error_visible" children="При обновлении произошла ошибка" />
                <button
                  id="profile-form-submit"
                  className="profile__submit"
                  name="profile-form-submit"
                  aria-label="Подтвердить изменения"
                  type="submit"
                  formMethod="post"
                  form="profile-form"
                  children="Сохранить"
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
