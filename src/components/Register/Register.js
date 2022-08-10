import { Link } from 'react-router-dom';
import './Register.css';

const Register = ({ mix }) => {
  return (
    <section
      className={`${mix} register`}
      children={
        <>
          <h1 className="register__title" children="Добро пожаловать!" />
          <form
            action="#"
            method="post"
            name="registerForm"
            id="registerForm"
            className="register__form"
            children={
              <>
                <span className="register__input-name" children="Имя" />
                <input
                  className="register__input"
                  type="text"
                  name="nameInput"
                  id="nameInput"
                  placeholder="Имя"
                  minLength={2}
                  maxLength={30}
                  required
                />
                <div className="register__separator" />
                <span className="register__error" children="Что-то пошло не так..." />
                <span className="register__input-name" children="E-mail" />
                <input
                  className="register__input"
                  type="email"
                  name="emailInput"
                  id="emailInput"
                  placeholder="Email"
                  minLength={2}
                  maxLength={30}
                  required
                />
                <div className="register__separator" />
                <span className="register__error" children="Что-то пошло не так..." />
                <span className="register__input-name" children="Пароль" />
                <input
                  className="register__input"
                  type="password"
                  name="passwordInput"
                  id="passwordInput"
                  placeholder="Пароль"
                  minLength={2}
                  maxLength={30}
                  required
                />
                <div className="register__separator" />
                <span className="register__error register__error_last" children="Что-то пошло не так..." />
                <button className="register__submit" children="Зарегистрироваться" />
                <div
                  className="register__bottom"
                  children={
                    <>
                      <span className="register__caption" children="Уже зарегистрированы?" />
                      <Link to="/signin" className="register__link" children="Войти" />
                    </>
                  }
                />
              </>
            }
          />
        </>
      }
    />
  );
};

export default Register;
