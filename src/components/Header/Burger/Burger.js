import './Burger.css';

const Burger = ({ mix, menuIsOpened, setMenuIsOpened }) => {
  return (
    <button
      className={`${mix} burger`}
      type="button"
      aria-label="Вызвать боковое меню"
      onClick={() => setMenuIsOpened(!menuIsOpened)}
      children={<span className="burger__center" />}
    />
  );
};

export default Burger;
