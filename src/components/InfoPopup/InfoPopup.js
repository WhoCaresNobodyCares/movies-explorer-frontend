import UserContext from '../../contexts/UserContext';

import './InfoPopup.css';

const InfoPopup = ({ mix, popupState, setPopupState }) => {
  return (
    <div className={`${mix} info-popup`}>
      <div
        className={
          popupState.isOpened
            ? 'info-popup__shadow info-popup__shadow_visible'
            : 'info-popup__shadow'
        }
        onClick={() =>
          setPopupState({
            isOpened: !popupState.isOpened,
            title: '',
            button: '',
          })
        }
      />
      <div
        className={
          popupState.isOpened
            ? 'info-popup__content info-popup__content_visible'
            : 'info-popup__content'
        }
      >
        <UserContext.Consumer>
          {(userState) => (
            <h2 className="info-popup__title">
              {popupState.title === 'Добро пожаловать,'
                ? `${popupState.title} ${userState.name}!`
                : popupState.title}
            </h2>
          )}
        </UserContext.Consumer>
        <button
          id="infoPopupButton"
          className="info-popup__button"
          name="infoPopupButton"
          aria-label="Подтвердить"
          type="button"
          onClick={() =>
            setPopupState({
              isOpened: !popupState.isOpened,
              title: '',
              button: '',
            })
          }
          children={popupState.button}
        />
      </div>
    </div>
  );
};

export default InfoPopup;
