import { useContext, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import './Header.css';
import logoIcon from '../../images/logo-icon.svg';
import Auth from './Auth/Auth';
import NavHor from './NavHor/NavHor';
import User from './User/User';
import Burger from './Burger/Burger';
import Menu from './Menu/Menu';
import UserContext from '../../contexts/UserContext';

const Header = ({ mix }) => {
  const location = useLocation();
  const userState = useContext(UserContext);

  const [isDesktopLayout, setIsDesktopLayout] = useState(
    window.innerWidth > 800
  );
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const updateLayout = () =>
    window.innerWidth > 800
      ? setIsDesktopLayout(true)
      : setIsDesktopLayout(false);

  const burgerMenu = (
    <>
      <Burger
        mix='header__burger'
        isMenuOpened={isMenuOpened}
        setIsMenuOpened={setIsMenuOpened}
      />
      <Menu
        mix='header__menu'
        isMenuOpened={isMenuOpened}
        setIsMenuOpened={setIsMenuOpened}
        location={location}
        isDesktopLayout={isDesktopLayout}
      />
    </>
  );

  const completeMenu = (
    <>
      <NavHor mix='header__nav-hor' />
      <User
        mix='header__user'
        location={location}
        isDesktopLayout={isDesktopLayout}
      />
    </>
  );

  const header = (
    <>
      <header className={`${mix} header`}>
        <div className='header__grid'>
          <Link
            to='/'
            className='header__link'
            children={
              <img className='header__logo' src={logoIcon} alt='Логотип' />
            }
          />
          {isDesktopLayout ? completeMenu : burgerMenu}
        </div>
      </header>
    </>
  );

  const headerMain = (
    <>
      <header className={`${mix} header header_blue`}>
        <div className='header__grid'>
          <Link
            to='/'
            className='header__link'
            children={
              <img className='header__logo' src={logoIcon} alt='Логотип' />
            }
          />
          {userState.isLoggedIn ? (
            isDesktopLayout ? (
              completeMenu
            ) : (
              burgerMenu
            )
          ) : (
            <Auth />
          )}
        </div>
      </header>
    </>
  );

  const headerAuth = (
    <>
      <header className={`${mix} header header_narrow`}>
        <div className='header__grid header__grid_narrow'>
          <Link
            to='/'
            className='header__link header__link_narrow'
            children={
              <img className='header__logo' src={logoIcon} alt='Логотип' />
            }
          />
        </div>
      </header>
    </>
  );

  useEffect(() => {
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    setIsMenuOpened(false);
  }, [location, isDesktopLayout]);

  return (
    <Routes>
      <Route path='/movies' element={header} />
      <Route path='/saved-movies' element={header} />
      <Route path='/profile' element={header} />
      <Route path='/' element={headerMain} />
      <Route path='/signup' element={headerAuth} />
      <Route path='/signin' element={headerAuth} />
    </Routes>
  );
};

export default Header;
