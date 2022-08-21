import { useContext, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './Header.css';
import logoIcon from '../../images/logo-icon.svg';
import Auth from './Auth/Auth';
import NavHor from './NavHor/NavHor';
import User from './User/User';
import Burger from './Burger/Burger';
import Menu from './Menu/Menu';
import AppContext from '../../contexts/AppContext';

const Header = ({ mix }) => {
	const { location, viewportWidth, allowedPaths, menuIsOpened, setMenuIsOpened } =
		useContext(AppContext);

	console.log('render');
	useEffect(() => {
		setMenuIsOpened(false);
	}, [location, viewportWidth]);

	return (
		<header
			className={
				!allowedPaths.narrowHeader
					? `${mix} header${allowedPaths.blueHeader ? ' header_blue' : ''}`
					: `${mix} header header_narrow`
			}
		>
			<div
				className={
					!allowedPaths.narrowHeader ? 'header__grid' : ' header__grid header__grid_narrow'
				}
			>
				<Link
					to="/"
					className={
						!allowedPaths.narrowHeader ? 'header__link' : 'header__link header__link_narrow'
					}
					children={<img className="header__logo" src={logoIcon} alt="Логотип" />}
				/>
				<Routes>
					<Route path="/" element={<Auth mix="header__auth" />} />
					<Route
						path={location.pathname}
						element={
							allowedPaths.completeHeader && viewportWidth > 800 ? (
								<>
									<NavHor mix="header__nav-hor" />
									<User mix="header__user" />
								</>
							) : (
								!allowedPaths.narrowHeader && (
									<>
										<Burger
											mix="header__burger"
											menuIsOpened={menuIsOpened}
											setMenuIsOpened={setMenuIsOpened}
										/>
										<Menu
											mix="header__menu"
											menuIsOpened={menuIsOpened}
											setMenuIsOpened={setMenuIsOpened}
										/>
									</>
								)
							)
						}
					/>
				</Routes>
			</div>
		</header>
	);
};

export default Header;
