import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ mix }) => {
  return (
    <section
      className={`${mix} login`}
      children={
        <>
          <h1 className="login__title" children="Рады видеть!" />
          <form
            action="#"
            method="post"
            name="loginForm"
            id="loginForm"
            className="login__form"
            children={
              <>
                <span className="login__input-name" children="Имя" />
                <input
                  className="login__input"
                  type="email"
                  name="emailInput"
                  id="emailInput"
                  placeholder="E-mail"
                  minLength={2}
                  maxLength={30}
                  required
                />
                <div className="login__separator" />
                <span className="login__error" children="Что-то пошло не так..." />
                <span className="login__input-name" children="Пароль" />
                <input
                  className="login__input"
                  type="password"
                  name="passwordInput"
                  id="passwordInput"
                  placeholder="Пароль"
                  minLength={2}
                  maxLength={30}
                  required
                />
                <div className="login__separator" />
                <span className="login__error login__error_last" children="Что-то пошло не так..." />
                <button type="submit" aria-label="Сабмит" className="login__submit" children="Войти" />
                <div
                  className="login__bottom"
                  children={
                    <>
                      <span className="login__caption" children="Еще не зарегистрированы?" />
                      <Link to="/signup" className="login__link" children="Регистрация" />
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

export default Login;
