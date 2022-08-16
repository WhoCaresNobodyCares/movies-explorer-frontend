import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import useWidth from '../../utils/customHooks/useWidth';
import useAllowedPaths from '../../utils/customHooks/useAllowedPaths';
import './Header.css';
import logoIcon from '../../images/logo-icon.svg';

import Auth from './Auth/Auth';
import Return from './Return/Return';
import NavHor from './NavHor/NavHor';
import User from './User/User';
import Burger from './Burger/Burger';
import Menu from './Menu/Menu';

const Header = ({ mix }) => {
  const viewport = useWidth();

  const [fullHeaderIsRendered, fullHeaderIsRenderedPath] = useAllowedPaths(['/movies', '/saved-movies', '/profile']);
  const [headerIsNarrow] = useAllowedPaths(['/signin', '/signup']);
  const [headerIsBlue] = useAllowedPaths(['/']);

  const userContext = React.useContext(UserContext);

  const [menuIsOpened, setMenuIsOpened] = useState(false);

  useEffect(() => {
    setMenuIsOpened(false);
  }, [viewport, fullHeaderIsRenderedPath]);

  return (
    <header className={!headerIsNarrow ? `${mix} header${headerIsBlue ? ' header_blue' : ''}` : `${mix} header header_narrow`}>
      <div className={!headerIsNarrow ? 'header__grid' : ' header__grid header__grid_narrow'}>
        <Link
          to="/"
          className={!headerIsNarrow ? 'header__link' : 'header__link header__link_narrow'}
          children={<img className="header__logo" src={logoIcon} alt="Логотип" />}
        />
        <Routes>
          <Route
            path="/"
            element={
              userContext.isLoggedIn ? (
                viewport > 800 ? (
                  <>
                    <NavHor mix="header__nav-hor" />
                    <User mix="header__user" userContext={userContext} />
                  </>
                ) : (
                  <>
                    <Burger mix="header__burger" menuIsOpened={menuIsOpened} setMenuIsOpened={setMenuIsOpened} />
                    <Menu mix="header__menu" menuIsOpened={menuIsOpened} setMenuIsOpened={setMenuIsOpened} userContext={userContext} />
                  </>
                )
              ) : (
                <Auth mix="header__auth" />
              )
            }
          />
          <Route
            path={fullHeaderIsRenderedPath}
            element={
              fullHeaderIsRendered && viewport > 800 ? (
                <>
                  <NavHor mix="header__nav-hor" />
                  <User mix="header__user" userContext={userContext} />
                </>
              ) : (
                <>
                  <Burger mix="header__burger" menuIsOpened={menuIsOpened} setMenuIsOpened={setMenuIsOpened} />
                  <Menu mix="header__menu" menuIsOpened={menuIsOpened} setMenuIsOpened={setMenuIsOpened} userContext={userContext} />
                </>
              )
            }
          />
        </Routes>
      </div>
    </header>
  );
};

export default Header;
