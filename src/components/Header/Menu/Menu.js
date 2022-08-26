import './Menu.css';
import closeIcon from '../../../images/close-icon.svg';

import NavVert from '../NavVert/NavVert';
import User from '../User/User';

const Menu = ({ mix, isMenuOpened, setIsMenuOpened, location, isDesktopLayout }) => (
  <div className={`${mix} menu`}>
    <aside className={!isMenuOpened ? `menu__aside` : `menu__aside menu__aside_opened`}>
      <button
        id='menuCloseButton'
        className='menu__close'
        name='menuCloseButton'
        aria-label='Закрыть боковое меню'
        type='button'
        onClick={() => setIsMenuOpened(!isMenuOpened)}
        children={<img className='menu__icon' src={closeIcon} alt='Закрыть боковое меню' />}
      />
      <NavVert mix='menu__nav-vert' />
      <User mix='menu__user' location={location} isDesktopLayout={isDesktopLayout} />
    </aside>
    <div
      className={!isMenuOpened ? 'menu__shadow' : 'menu__shadow menu__shadow_visible'}
      onClick={() => setIsMenuOpened(!isMenuOpened)}
    />
  </div>
);

export default Menu;
