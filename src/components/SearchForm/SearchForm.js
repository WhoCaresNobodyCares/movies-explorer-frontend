import useWidth from '../../utils/customHooks/useWidth';

import './SearchForm.css';

import searchIcon from '../../images/search-icon.svg';
import searchButtonIcon from '../../images/search-button-icon.svg';

const SearchForm = ({ mix }) => {
  const viewport = useWidth();

  return (
    <section className={`${mix} search-form`}>
      <form
        id="search-form"
        className="search-form__form"
        name="search-form"
        action="#"
        method="post"
        target="_self"
        autoComplete="on"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          console.log('search-form');
        }}
      >
        <div className="search-form__frame">
          <div className="search-form__search-bar">
            {viewport > 600 && <img className="search-form__search-icon" src={searchIcon} alt="Иконка поиска" />}
            <input
              id="search-form-input"
              className="search-form__input"
              name="search-form-input"
              type="text"
              minLength="0"
              maxLength="40"
              placeholder="Фильм"
              autoComplete="on"
              required
              autoFocus
              onChange={() => {
                console.log('search-form-input');
              }}
            />
            <button
              id="search-form-submit"
              className="search-form__submit"
              name="search-form-submit"
              type="submit"
              formMethod="post"
              form="search-form"
              children={<img className="search-form__submit-icon" src={searchButtonIcon} alt="Иконка кнопки" />}
            />
          </div>
          {viewport > 600 && (
            <>
              <div className="search-form__separator" />
              <div className="search-form__option">
                <label id="search-form-label" className="search-form__switch">
                  <input
                    id="search-form-checkbox"
                    className="search-form__checkbox"
                    name="search-form-checkbox"
                    type="checkbox"
                    onChange={() => {
                      console.log('search-form-checkbox');
                    }}
                  />
                  <span className="search-form__slider" />
                </label>
                <span className="search-form__switch-description" children="Короткометражки" />
              </div>
            </>
          )}
        </div>
        {viewport <= 600 && (
          <>
            <div className="search-form__option">
              <label id="search-form-label" className="search-form__switch">
                <input
                  id="search-form-checkbox"
                  className="search-form__checkbox"
                  name="search-form-checkbox"
                  type="checkbox"
                  onChange={() => {
                    console.log('search-form-checkbox');
                  }}
                />
                <span className="search-form__slider" />
              </label>
              <span className="search-form__switch-description" children="Короткометражки" />
            </div>
          </>
        )}
      </form>
    </section>
  );
};

export default SearchForm;
