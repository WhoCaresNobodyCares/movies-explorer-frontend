import { Link } from 'react-scroll';

import './NavTab.css';

const NavTab = ({ mix }) => {
	const links = [
		{ to: 'about-project', text: 'О проекте', key: 'nav-tab__link_1' },
		{ to: 'techs', text: 'Технологии', key: 'nav-tab__link_2' },
		{ to: 'about-me', text: 'Студент', key: 'nav-tab__link_3' },
	];

	return (
		<section className={`${mix} nav-tab`}>
			<nav className="nav-tab__panel">
				{links.map((item) => (
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
