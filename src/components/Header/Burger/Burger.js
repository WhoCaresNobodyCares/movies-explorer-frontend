import './Burger.css';

const Burger = ({ mix, menuIsOpened, setMenuIsOpened }) => {
	return (
		<button
			id="burger-button"
			className={`${mix} burger`}
			name="burger-button"
			aria-label="Вызвать боковое меню"
			type="button"
			onClick={() => setMenuIsOpened(!menuIsOpened)}
			children={<span className="burger__center" />}
		/>
	);
};

export default Burger;
