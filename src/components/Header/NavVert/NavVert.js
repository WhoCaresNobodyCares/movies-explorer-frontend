import { NavLink } from 'react-router-dom';

import './NavVert.css';

const NavVert = ({ mix }) => {
	const navVertLinks = [
		{ to: '/', text: 'Главная', key: 'nav-vert__link_1' },
		{ to: '/movies', text: 'Фильмы', key: 'nav-vert__link_2' },
		{
			to: '/saved-movies',
			text: 'Сохраненные фильмы',
			key: 'nav-vert__link_3',
		},
	];

	return (
		<nav
			className={`${mix} nav-vert`}
			children={navVertLinks.map((item) => (
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
