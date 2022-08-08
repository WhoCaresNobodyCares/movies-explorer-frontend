import './BottomLink.css';
import arrowIcon from '../../../images/arrow-icon.svg'

const BottomLink = ({ mix, href, text }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`${mix} bottom-link`}
      children={
        <>
          {text}
          <img src={arrowIcon} alt="Стрелка" className="bottom-link__icon" />
        </>
      }
    />
  );
};

export default BottomLink;
