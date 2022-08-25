import { useContext, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import useWidth from '../../utils/customHooks/useWidth';
import './Header.css';
import logoIcon from '../../images/logo-icon.svg';
import Auth from './Auth/Auth';
import NavHor from './NavHor/NavHor';
import User from './User/User';
import Burger from './Burger/Burger';
import Menu from './Menu/Menu';
import AppContext from '../../contexts/AppContext';

const Header = ({ mix }) => {
  // * HOOKS
  const { isLoggedIn } = useContext(AppContext);
  const viewportWidth = useWidth();
  const location = useLocation();

  // * STATES
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  // * JSX
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
      <User mix="header__user" />
    </>
  );

  const header = (
    <>
      <header className={`${mix} header`}>
        <div className={'header__grid'}>
          <Link
            to="/"
            className={'header__link'}
            children={<img className="header__logo" src={logoIcon} alt="Логотип" />}
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
            children={<img className="header__logo" src={logoIcon} alt="Логотип" />}
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
            children={<img className="header__logo" src={logoIcon} alt="Логотип" />}
          />
        </div>
      </header>
    </>
  );

  // * EFFECTS
  useEffect(() => {
    setIsMenuOpened(false);
  }, [location, viewportWidth]);

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
