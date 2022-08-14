import './Menu.css';

import closeIcon from '../../../images/close-icon.svg';

import NavVert from '../NavVert/NavVert';
import User from '../User/User';

const Menu = ({ mix, menuIsOpened, setMenuIsOpened }) => {
  return (
    <div className={`${mix} menu`}>
      <aside className={!menuIsOpened ? `menu__aside` : `menu__aside menu__aside_opened`}>
        <button
          id="menu-close-button"
          className="menu__close"
          name="menu-close-button"
          aria-label="Закрыть боковое меню"
          type="button"
          onClick={() => setMenuIsOpened(!menuIsOpened)}
          children={<img className="menu__icon" src={closeIcon} alt="Закрыть боковое меню" />}
        />
        <NavVert mix="menu__nav-vert" />
        <User mix="menu__user" />
      </aside>
      <div
        className={!menuIsOpened ? 'menu__shadow' : 'menu__shadow menu__shadow_visible'}
        onClick={() => setMenuIsOpened(!menuIsOpened)}
      />
    </div>
  );
};

export default Menu;
