import { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './Header.css';
import logoIcon from '../../images/logo-icon.svg';
import useAllowedPaths from '../../utils/customHooks/useAllowedPaths';
import useWidth from '../../utils/customHooks/useWidth';
import Authorization from './Authorization/Authorization';
import Navigation from './Navigation/Navigation';
import User from './User/User';
import Burger from './Burger/Burger';
import Menu from './Menu/Menu';

const Header = ({ mix, mod_narrow, mod_blue }) => {
  const viewport = useWidth();
  const [completeHeaderIsRendered, completeHeaderIsRenderedPath] = useAllowedPaths(['/movies', '/saved-movies', '/profile']);
  const [headerIsNarrow] = useAllowedPaths(['/signin', '/signup']);
  const [headerIsBlue] = useAllowedPaths(['/']);
  const [menuIsOpened, setMenuIsOpened] = useState(false);

  useEffect(() => {
    setMenuIsOpened(false);
  }, [viewport, completeHeaderIsRenderedPath]);

  return (
    <header
      className={!headerIsNarrow ? `${mix} header${headerIsBlue ? ` ${mod_blue}` : ''}` : `${mix} ${mod_narrow} header`}
      children={
        <>
          <Link
            to="/"
            className={!headerIsNarrow ? 'header__link' : 'header__link header__link_centered'}
            children={<img src={logoIcon} alt="Логотип" className="header__logo" />}
          />
          <Routes
            children={
              <>
                <Route path="/" element={<Authorization mix="header__authorization" />} />
                <Route
                  path={completeHeaderIsRenderedPath}
                  element={
                    completeHeaderIsRendered && viewport > 800 ? (
                      <>
                        <Navigation mix="header__navigation" />
                        <User mix="header__user" />
                      </>
                    ) : (
                      <>
                        <Burger mix="header__burger" menuIsOpened={menuIsOpened} setMenuIsOpened={setMenuIsOpened} />
                        <Menu
                          mix="header__menu"
                          modifier_opened="header__menu_opened"
                          menuIsOpened={menuIsOpened}
                          setMenuIsOpened={setMenuIsOpened}
                        />
                      </>
                    )
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

export default Header;
