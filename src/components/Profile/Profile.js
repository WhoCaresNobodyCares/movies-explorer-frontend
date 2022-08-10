import './Profile.css';

const Profile = ({ mix }) => {
  return (
    <section
      className={`${mix} profile`}
      children={
        <>
          <h1 className="profile__title" children={`Привет, ${`ИМЯ`}!`} />
          <form
            action="#"
            method="post"
            name="profileForm"
            id="profileForm"
            className="profile__form"
            children={
              <>
                <span className="profile__span" children="Имя" />
                <input
                  className="profile__input"
                  type="text"
                  name="nameInput"
                  id="nameInput"
                  placeholder="Имя"
                  minLength={2}
                  maxLength={30}
                  required
                  disabled
                />
                <div className="profile__separator" />
                <span className="profile__span" children="E-mail" />
                <input
                  className="profile__input"
                  type="email"
                  name="emailInput"
                  id="emailInput"
                  placeholder="E-mail"
                  minLength={2}
                  maxLength={30}
                  required
                  disabled
                />
              </>
            }
          />
          <button className="profile__edit" children="Редактировать" />
          <button className="profile__signout" children="Выйти из аккаунта" />
        </>
      }
    />
  );
};

export default Profile;
