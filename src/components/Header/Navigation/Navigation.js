import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ mix }) => {
  const navigationLinks = [
    { to: '/movies', text: 'Фильмы', key: 'navigation__link_1' },
    { to: '/saved-movies', text: 'Сохраненные фильмы', key: 'navigation__link_2' },
  ];


  return (
    <nav
      className={mix === 'header__navigation' ? `${mix} navigation` : `${mix} navigation-column`}
      children={navigationLinks.map((item) => (
        <NavLink
          to={item.to}
          className={
            mix === 'header__navigation'
              ? (link) => (!link.isActive ? 'navigation__link' : 'navigation__link navigation__link_active')
              : (link) => (!link.isActive ? 'navigation-column__link' : 'navigation-column__link navigation-column__link_active')
          }
          key={item.key}
          children={item.text}
        />
      ))}
    />
  );
};

export default Navigation;
