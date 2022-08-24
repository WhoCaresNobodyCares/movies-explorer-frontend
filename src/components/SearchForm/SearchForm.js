import { useContext, useEffect, useState } from 'react';
import useWidth from '../../utils/customHooks/useWidth';
import useFormHandler from '../../utils/customHooks/useFormHandler';

import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButtonIcon from '../../images/search-button-icon.svg';
import { useLocation } from 'react-router-dom';
import FormLogicContext from '../../contexts/FormLogicContext';

const SearchForm = ({ mix }) => {
  const viewportWidth = useWidth();
  const location = useLocation();

  const formLogic = useContext(FormLogicContext);

  const { inputValue, handleInputChange, isFormValid, resetForm } =
    useFormHandler();

  const [initialValue, setInitialValue] = useState({});
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    if (location.pathname === '/movies') {
      resetForm({ searchFormInput: ['фильмы', 'фильмы'] }); // !!! setUserDataValues
      setInitialValue({ searchFormInput: ['фильмы', 'фильмы'].join(' ') });
      setIsCheckboxChecked(true);
    }
    if (location.pathname === '/saved-movies') {
      resetForm({ searchFormInput: ['сохраненные', 'фильмы'] }); // !!! setUserDataValues
      setInitialValue({
        searchFormInput: ['сохраненные', 'фильмы'].join(' '),
      });
      setIsCheckboxChecked(false);
    }
    return () => {
      resetForm([]);
      setInitialValue({});
      setIsCheckboxChecked(false);
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
        onSubmit={(e) =>
          formLogic.handleSearchFormSubmit(e, inputValue, isCheckboxChecked)
        }
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
              className={
                isFormValid
                  ? 'search-form__input'
                  : 'search-form__input search-form__input_invalid'
              }
              name="searchFormInput"
              type="text"
              minLength={0}
              maxLength={80}
              defaultValue={initialValue.searchFormInput}
              placeholder="Фильм"
              autoComplete="off"
              pattern="^[а-яА-Яa-zA-Z\s\d]+$"
              required
              autoFocus
              onChange={(e) => handleInputChange(e)}
            />
            <button
              id="searchFormSubmit"
              className={
                isFormValid
                  ? 'search-form__submit'
                  : 'search-form__submit search-form__submit_disabled'
              }
              name="searchFormSubmit"
              aria-label="Начать поиск"
              type="submit"
              formMethod="post"
              form="searchForm"
              disabled={isFormValid ? false : true}
              children={
                <img
                  className={
                    isFormValid
                      ? 'search-form__submit-icon'
                      : 'search-form__submit-icon search-form__submit-icon_disabled'
                  }
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
                    checked={isCheckboxChecked}
                    onChange={(e) =>
                      formLogic.handleCheckBoxChange(e, setIsCheckboxChecked)
                    }
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
                  checked={isCheckboxChecked}
                  onChange={(e) =>
                    formLogic.handleCheckBoxChange(e, setIsCheckboxChecked)
                  }
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
