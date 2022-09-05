import { useEffect, useState } from 'react';
import './Promo.css';
import landingPicture from '../../../images/landing-picture.svg';

const Promo = ({ mix }) => {
  const [isTitleWide, setIsTitleWide] = useState(window.innerWidth > 600);

  const updateTitle = () => (window.innerWidth > 600 ? setIsTitleWide(true) : setIsTitleWide(false));

  const wideTitle = (
    <h1 className='promo__title'>
      Учебный проект студента
      <br />
      факультета веб-разработки.
    </h1>
  );

  const narrowTitle = (
    <h1 className='promo__title'>
      Учебный проект
      <br />
      студента факультета
      <br />
      веб-разработки.
    </h1>
  );

  useEffect(() => {
    window.addEventListener('resize', updateTitle);
    return () => window.removeEventListener('resize', updateTitle);
  }, []);

  return (
    <section className={`${mix} promo`}>
      {isTitleWide ? wideTitle : narrowTitle}
      <img className='promo__background' src={landingPicture} alt='Фоновое изображение секции' />
    </section>
  );
};

export default Promo;
