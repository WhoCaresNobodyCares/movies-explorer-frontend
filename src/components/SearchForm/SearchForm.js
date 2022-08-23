import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButtonIcon from '../../images/search-button-icon.svg';

const SearchForm = ({ mix, viewportWidth }) => {
  return (
    <section className={`${mix} search-form`}>
      <form
        id="searchForm"
        className="search-form__form"
        name="searchForm"
        action="#"
        method="post"
        target="_self"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          console.log('search-form');
        }}
      >
        <div className="search-form__frame">
          <div className="search-form__search-bar">
            {viewportWidth > 600 && <img className="search-form__search-icon" src={searchIcon} alt="Иконка поиска" />}
            <input
              id="searchFormInput"
              className="search-form__input"
              name="searchFormInput"
              type="text"
              minLength={0}
              maxLength={40}
              placeholder="Фильм"
              required
              autoFocus
              onChange={() => {
                console.log('search-form-input');
              }}
            />
            <button
              id="searchFormSubmit"
              className="search-form__submit"
              name="searchFormSubmit"
              aria-label="Начать поиск"
              type="submit"
              formMethod="post"
              form="search-form"
              children={<img className="search-form__submit-icon" src={searchButtonIcon} alt="Иконка кнопки" />}
            />
          </div>
          {viewportWidth > 600 && (
            <>
              <div className="search-form__separator" />
              <div className="search-form__option">
                <label id="searchFormLabel" className="search-form__switch">
                  <input
                    id="searchFormCheckbox"
                    className="search-form__checkbox"
                    name="searchFormCheckbox"
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
        {viewportWidth <= 600 && (
          <>
            <div className="search-form__option">
              <label id="searchFormLabel" className="search-form__switch">
                <input
                  id="searchFormCheckbox"
                  className="search-form__checkbox"
                  name="searchFormCheckbox"
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
