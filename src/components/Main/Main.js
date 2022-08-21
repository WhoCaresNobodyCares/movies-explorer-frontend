import './Main.css';

import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject.css/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

const Main = ({ mix }) => {
	return (
		<main className={`${mix} main`}>
			<Promo mix="main__promo" />
			<NavTab mix="main__nav-tab" />
			<AboutProject mix="main__about-project" />
			<Techs mix="main__techs" />
			<AboutMe mix="main__about-me" />
			<Portfolio mix="main__portfolio" />
		</main>
	);
};

export default Main;
