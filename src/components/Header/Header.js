import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import './Header.css';
import logoIcon from '../../images/logo-icon.svg';

import Auth from './Auth/Auth';
import NavHor from './NavHor/NavHor';
import User from './User/User';
import Burger from './Burger/Burger';
import Menu from './Menu/Menu';

const Header = ({ mix, isLoggedIn, location, viewportWidth }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const burgerMenu = (
    <>
      <Burger
        mix="header__burger"
        isMenuOpened={isMenuOpened}
        setIsMenuOpened={setIsMenuOpened}
      />
      <Menu
        mix="header__menu"
        isMenuOpened={isMenuOpened}
        setIsMenuOpened={setIsMenuOpened}
      />
    </>
  );

  const completeMenu = (
    <>
      <NavHor mix="header__nav-hor" />
      <User
        mix="header__user"
        viewportWidth={viewportWidth}
        location={location}
      />
    </>
  );

  const header = (
    <>
      <header className={`${mix} header`}>
        <div className={'header__grid'}>
          <Link
            to="/"
            className={'header__link'}
            children={
              <img className="header__logo" src={logoIcon} alt="Логотип" />
            }
          />
          {viewportWidth > 800 ? completeMenu : burgerMenu}
        </div>
      </header>
    </>
  );

  const headerMain = (
    <>
      <header className={`${mix} header header_blue`}>
        <div className={'header__grid'}>
          <Link
            to="/"
            className={'header__link'}
            children={
              <img className="header__logo" src={logoIcon} alt="Логотип" />
            }
          />
          {isLoggedIn ? (
            viewportWidth > 800 ? (
              completeMenu
            ) : (
              burgerMenu
            )
          ) : (
            <Auth mix="header__auth" />
          )}
        </div>
      </header>
    </>
  );

  const headerAuth = (
    <>
      <header className={`${mix} header header_narrow`}>
        <div className={'header__grid header__grid_narrow'}>
          <Link
            to="/"
            className={'header__link header__link_narrow'}
            children={
              <img className="header__logo" src={logoIcon} alt="Логотип" />
            }
          />
        </div>
      </header>
    </>
  );

  useEffect(() => {
    setIsMenuOpened(false);
  }, [location.pathname, viewportWidth]);

  return (
    <Routes>
      <Route path="/movies" element={header} />
      <Route path="/saved-movies" element={header} />
      <Route path="/profile" element={header} />
      <Route path="/" element={headerMain} />
      <Route path="/signup" element={headerAuth} />
      <Route path="/signin" element={headerAuth} />
    </Routes>
  );
};

export default Header;
