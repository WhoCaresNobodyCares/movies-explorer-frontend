import { Link } from 'react-scroll';
import './NavTab.css';
const { CONTENT_CONFIG } = require('../../../configs/contentConfig.json');

const NavTab = ({ mix }) => {
  return (
    <section className={`${mix} nav-tab`}>
      <nav className='nav-tab__panel'>
        {CONTENT_CONFIG.Main.navTab.links.map(item => (
          <Link
            className='nav-tab__link'
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
