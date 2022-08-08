import useWidth from '../../../utils/customHooks/useWidth';
import './Promo.css';
import landingPicture from '../../../images/landing-picture.svg';
import { promoTitle } from '../../../variables/mainVariables';

const Promo = ({ mix }) => {
  const viewport = useWidth();

  return (
    <section
      className={`${mix} promo`}
      children={
        <>
          {viewport > 600 ? <h1 className="promo__title">{promoTitle.text1}</h1> : <h1 className="promo__title">{promoTitle.text2}</h1>}
          <img src={landingPicture} alt="Фоновое изображение" className="promo__background" />
        </>
      }
    />
  );
};

export default Promo;
