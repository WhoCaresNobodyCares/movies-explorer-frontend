import './Menu.css';
import closeIcon from '../../../images/close-icon.svg';
import Navigation from '../Navigation/Navigation';
import User from '../User/User';

const Menu = ({ mix, modifier_opened, menuIsOpened, setMenuIsOpened }) => {
  return (
    <>
      <aside
        className={!menuIsOpened ? `${mix} menu` : `${mix} ${modifier_opened} menu`}
        children={
          <>
            <button
              type="button"
              aria-label="Закрыть меню"
              className="menu__close"
              onClick={() => setMenuIsOpened(!menuIsOpened)}
              children={<img src={closeIcon} alt="Закрыть меню" className="menu__icon" />}
            />
            <Navigation mix="menu__navigation" />
            <User mix="menu__user" />
          </>
        }
      />
      <div
        className={!menuIsOpened ? 'menu__shadow' : 'menu__shadow menu__shadow_visible'}
        onClick={() => setMenuIsOpened(!menuIsOpened)}
      />
    </>
  );
};

export default Menu;
