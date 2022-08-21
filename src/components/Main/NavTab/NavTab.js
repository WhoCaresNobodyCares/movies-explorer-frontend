import { Link } from 'react-scroll';
import './NavTab.css';

const NavTab = ({ mix }) => {
	const { MAIN_CONFIG } = require('../../../configs/mainConfig.json');

	return (
		<section className={`${mix} nav-tab`}>
			<nav className="nav-tab__panel">
				{MAIN_CONFIG.navTab.links.map((item) => (
					<Link
						className="nav-tab__link"
						to={item.to}
						smooth={true}
						duration={200}
						key={item.key}
						children={item.text}
					/>
				))}
			</nav>
		</section>
	);
};

export default NavTab;
