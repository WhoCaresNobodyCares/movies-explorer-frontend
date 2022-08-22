import './Promo.css';
import landingPicture from '../../../images/landing-picture.svg';

import useWidth from '../../../utils/customHooks/useWidth';

const Promo = ({ mix }) => {
  const viewportWidth = useWidth();

  const wideTitle = (
    <h1 className="promo__title">
      Учебный проект студента
      <br />
      факультета веб-разработки.
    </h1>
  );

  const narrowTitle = (
    <h1 className="promo__title">
      Учебный проект
      <br />
      студента факультета
      <br />
      веб-разработки.
    </h1>
  );

  return (
    <section className={`${mix} promo`}>
      {viewportWidth > 600 ? wideTitle : narrowTitle}
      <img className="promo__background" src={landingPicture} alt="Фоновое изображение секции" />
    </section>
  );
};

export default Promo;
