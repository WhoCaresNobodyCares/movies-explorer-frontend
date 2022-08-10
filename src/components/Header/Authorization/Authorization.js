import { Link } from 'react-router-dom';
import './Authorization.css';

const Authorization = ({ mix }) => {
  const authorizationLinks = [
    { to: '/signup', text: 'Регистрация', className: 'authorization__link', key: 'authorization__link_1' },
    { to: '/signin', text: 'Войти', className: 'authorization__link authorization__link_button', key: 'authorization__link_2' },
  ];

  return (
    <nav
      className={`${mix} authorization`}
      children={authorizationLinks.map((item) => (
        <Link to={item.to} className={item.className} key={item.key} children={item.text} />
      ))}
    />
  );
};

export default Authorization;
