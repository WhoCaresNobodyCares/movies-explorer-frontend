import { useLocation, useNavigate } from 'react-router-dom';

import './InfoPopup.css';

const InfoPopup = ({ mix, popupIsOpened, setPopupIsOpened, popupIsError, setPopupIsError, popupInfo }) => {
  const nav = useNavigate();
  const location = useLocation().pathname;

  return (
    <div className={`${mix} info-popup`}>
      <div
        className={!popupIsOpened ? 'info-popup__shadow' : 'info-popup__shadow info-popup__shadow_visible'}
        onClick={() => {
          setPopupIsOpened(false);
        }}
      />
      <div className={!popupIsOpened ? 'info-popup__content' : 'info-popup__content info-popup__content_visible'}>
        <h2 className="info-popup__title">{popupInfo.title}</h2>
        <button
          id="info-popup-button"
          className="info-popup__button"
          name="info-popup-button"
          aria-label="Подтвердить"
          type="button"
          onClick={() => {
            setPopupIsOpened(false);
          }}
          children={popupInfo.button}
        />
      </div>
    </div>
  );
};

export default InfoPopup;
