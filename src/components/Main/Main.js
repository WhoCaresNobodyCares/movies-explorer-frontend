import AboutMe from './AboutMe/AboutMe';
import AboutProject from './AboutProject/AboutProject';
import './Main.css';
import NavTab from './NavTab/NavTab';
import Portfolio from './Portfolio/Portfolio';
import Promo from './Promo/Promo';
import Techs from './Techs/Techs';

const Main = ({ mix }) => {
  return (
    <main
      className={`${mix} main`}
      children={
        <>
          <Promo mix="main__promo" />
          <NavTab mix="main__nav-tab" />
          <AboutProject mix="main__about-project" />
          <Techs mix="main__techs" />
          <AboutMe mix="main__about-me" />
          <Portfolio mix="main__portfolio" />
        </>
      }
    />
  );
};

export default Main;
