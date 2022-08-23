import { useEffect, useState } from 'react';

import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButtonIcon from '../../images/search-button-icon.svg';

const SearchForm = ({ mix, form, viewportWidth, formHandler, location }) => {
  const { inputValue, handleInputChange, resetForm } = formHandler;

  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (location.pathname === '/movies') {
      resetForm({ searchFormInput: ['фильмы', 'фильмы'] }); // !!! setUserDataValues
      setInitialValues({ searchFormInput: ['фильмы', 'фильмы'].join(' ') });
    }
    if (location.pathname === '/saved-movies') {
      resetForm({ searchFormInput: ['сохраненные', 'фильмы'] }); // !!! setUserDataValues
      setInitialValues({
        searchFormInput: ['сохраненные', 'фильмы'].join(' '),
      });
    }
    return () => {
      resetForm([]);
      setInitialValues({});
    };
  }, []);

  return (
    <section className={`${mix} search-form`}>
      <form
        id="searchForm"
        className="search-form__form"
        name="searchForm"
        action="#"
        method="post"
        target="_self"
        autoComplete="off"
        noValidate
        onSubmit={(e) => form.handleSearchFormSubmit(e, inputValue)}
      >
        <div className="search-form__frame">
          <div className="search-form__search-bar">
            {viewportWidth > 600 && (
              <img
                className="search-form__search-icon"
                src={searchIcon}
                alt="Иконка поиска"
              />
            )}
            <input
              id="searchFormInput"
              className="search-form__input"
              name="searchFormInput"
              type="text"
              minLength={0}
              maxLength={80}
              defaultValue={initialValues.searchFormInput}
              placeholder="Фильм"
              autoComplete="off"
              required
              autoFocus
              onChange={(e) => handleInputChange(e)}
            />
            <button
              id="searchFormSubmit"
              className="search-form__submit"
              name="searchFormSubmit"
              aria-label="Начать поиск"
              type="submit"
              formMethod="post"
              form="searchForm"
              children={
                <img
                  className="search-form__submit-icon"
                  src={searchButtonIcon}
                  alt="Иконка кнопки"
                />
              }
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
                    form="searchForm"
                    onChange={(e) => form.handleCheckBoxChange(e, inputValue)}
                  />
                  <span className="search-form__slider" />
                </label>
                <span
                  className="search-form__switch-description"
                  children="Короткометражки"
                />
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
                  form="searchForm"
                  onChange={(e) => form.handleCheckBoxChange(e, inputValue)}
                />
                <span className="search-form__slider" />
              </label>
              <span
                className="search-form__switch-description"
                children="Короткометражки"
              />
            </div>
          </>
        )}
      </form>
    </section>
  );
};

export default SearchForm;
