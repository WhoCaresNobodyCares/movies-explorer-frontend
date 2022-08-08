import { Link } from 'react-scroll';
import { navigationLinks } from '../../../variables/mainVariables';
import './NavTab.css';

const NavTab = ({ mix }) => {
  return (
    <section
      className={`${mix} nav-tab`}
      children={
        <nav
          className="nav-tab__panel"
          children={navigationLinks.map((item) => (
            <Link to={item.to} smooth={true} duration={200} key={item.key} children={item.text} className="nav-tab__link" />
          ))}
        />
      }
    />
  );
};

export default NavTab;
