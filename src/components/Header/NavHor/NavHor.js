import { NavLink } from 'react-router-dom';
import './NavHor.css';

const NavHor = ({ mix }) => {
	const { HEADER_CONFIG } = require('../../../configs/headerConfig.json');

	return (
		<nav
			className={`${mix} nav-hor`}
			children={HEADER_CONFIG.navHor.links.map((item) => (
				<NavLink
					className={(link) =>
						!link.isActive ? 'nav-hor__link' : 'nav-hor__link nav-hor__link_active'
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
