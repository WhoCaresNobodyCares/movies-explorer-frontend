import { NavLink } from 'react-router-dom';

import './NavVert.css';

const NavVert = ({ mix }) => {
  const { CONTENT_CONFIG } = require('../../../configs/contentConfig.json');

  return (
    <nav
      className={`${mix} nav-vert`}
      children={CONTENT_CONFIG.Header.navVert.links.map((item) => (
        <NavLink
          className={(link) =>
            !link.isActive
              ? 'nav-vert__link'
              : 'nav-vert__link nav-vert__link_active'
          }
          to={item.to}
          key={item.key}
          children={item.text}
        />
      ))}
    />
  );
};

export default NavVert;
