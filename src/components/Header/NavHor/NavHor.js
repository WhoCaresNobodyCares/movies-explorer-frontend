import { NavLink } from 'react-router-dom';

import './NavHor.css';

const { CONTENT_CONFIG } = require('../../../configs/contentConfig.json');

const NavHor = ({ mix }) => (
  <nav
    className={`${mix} nav-hor`}
    children={CONTENT_CONFIG.Header.navHor.links.map(item => (
      <NavLink
        className={link =>
          !link.isActive ? 'nav-hor__link' : 'nav-hor__link nav-hor__link_active'
        }
        to={item.to}
        key={item.key}
        children={item.text}
      />
    ))}
  />
);

export default NavHor;
