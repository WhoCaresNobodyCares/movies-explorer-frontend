import { NavLink } from 'react-router-dom';
import './NavVert.css';

const NavVert = ({ mix }) => {
	const { HEADER_CONFIG } = require('../../../configs/headerConfig.json');

	return (
		<nav
			className={`${mix} nav-vert`}
			children={HEADER_CONFIG.navVert.links.map((item) => (
				<NavLink
					className={(link) =>
						!link.isActive ? 'nav-vert__link' : 'nav-vert__link nav-vert__link_active'
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
