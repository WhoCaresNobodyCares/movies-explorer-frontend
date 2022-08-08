import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { navigationLinks } from '../../../variables/headerVariables';

const Navigation = ({ mix }) => {
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
