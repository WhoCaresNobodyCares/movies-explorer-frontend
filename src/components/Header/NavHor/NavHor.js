import { NavLink } from 'react-router-dom';

import './NavHor.css';

const NavHor = ({ mix }) => {
	const navHorLinks = [
		{ to: '/movies', text: 'Фильмы', key: 'nav-hor__link_1' },
		{ to: '/saved-movies', text: 'Сохраненные фильмы', key: 'nav-hor__link_2' },
	];

	return (
		<nav
			className={`${mix} nav-hor`}
			children={navHorLinks.map((item) => (
				<NavLink
					className={(link) =>
						!link.isActive
							? 'nav-hor__link'
							: 'nav-hor__link nav-hor__link_active'
					}
					to={item.to}
					key={item.key}
					children={item.text}
				/>
			))}
		/>
	);
};

export default NavHor;
