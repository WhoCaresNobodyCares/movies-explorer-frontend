import useWidth from '../../../utils/customHooks/useWidth';
import './Promo.css';
import landingPicture from '../../../images/landing-picture.svg';

const Promo = ({ mix }) => {
  const viewport = useWidth();

  return (
    <section
      className={`${mix} promo`}
      children={
        <>
          {viewport > 600 ? (
            <h1 className="promo__title">
              Учебный проект студента
              <br />
              факультета веб-разработки
            </h1>
          ) : (
            <h1 className="promo__title">
              Учебный проект
              <br />
              студента факультета
              <br />
              веб-разработки
            </h1>
          )}
          <img src={landingPicture} alt="Фоновое изображение" className="promo__background" />
        </>
      }
    />
  );
};

export default Promo;
