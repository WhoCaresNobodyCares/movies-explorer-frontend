import './Burger.css';

const Burger = ({ mix, menuIsOpened, setMenuIsOpened }) => {
  return (
    <button type="button" aria-label="Вызвать меню" className={`${mix} burger`} onClick={() => setMenuIsOpened(!menuIsOpened)}>
      <span className="burger__center" />
    </button>
  );
};

export default Burger;
