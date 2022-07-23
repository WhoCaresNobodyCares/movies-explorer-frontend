import { Link, Routes, Route } from 'react-router-dom';

import './Header.css';

import logoPath from '../../../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logoPath} alt="Лого" className="header__logo" />
      </Link>
      <Routes>
        <Route path='/' element={<Link to="/signup">Регистрация</Link>} />
      </Routes>
    </header>
  );
}

export default Header;
