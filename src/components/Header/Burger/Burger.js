import './Burger.css';

const Burger = ({ mix, isMenuOpened, setIsMenuOpened }) => (
  <button
    id='burgerButton'
    className={`${mix} burger`}
    name='burger-button'
    aria-label='Вызвать боковое меню'
    type='button'
    onClick={() => setIsMenuOpened(!isMenuOpened)}
    children={<span className='burger__center' />}
  />
);

export default Burger;
