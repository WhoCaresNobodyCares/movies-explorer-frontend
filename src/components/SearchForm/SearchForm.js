import useWidth from '../../utils/customHooks/useWidth';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButtonIcon from '../../images/search-button-icon.svg';
import { useForm } from '../../utils/customHooks/useForm';
import { useContext, useState } from 'react';
import AppContext from '../../contexts/AppContext';

const SearchForm = ({ mix }) => {
  const viewport = useWidth();
  const { searchMovies } = useContext(AppContext);

  const { values, handleChange } = useForm();
  const [isChecked, setIsCheked] = useState(false);

  const words =
    values.searchFormInput !== undefined
      ? values.searchFormInput
          .replace(/\s+/g, ' ')
          .split(' ')
          .map((item) => item !== '' && item)
          .filter(Boolean)
      : [''];

  return (
    <section className={`${mix} search-form`}>
      <form
        id="searchForm"
        className="search-form__form"
        name="searchForm"
        action="#"
        method="post"
        target="_self"
        autoComplete="on"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          searchMovies(isChecked, words);
        }}
      >
        <div className="search-form__frame">
          <div className="search-form__search-bar">
            {viewport > 600 && <img className="search-form__search-icon" src={searchIcon} alt="Иконка поиска" />}
            <input
              id="searchFormInput"
              className="search-form__input"
              name="searchFormInput"
              type="text"
              minLength={0}
              maxLength={40}
              placeholder="Фильм"
              autoComplete="on"
              defaultValue={''}
              required
              autoFocus
              onChange={(e) => handleChange(e)}
            />
            <button
              id="searchFormSubmit"
              className="search-form__submit"
              name="searchFormSubmit"
              aria-label="Начать поиск"
              type="submit"
              formMethod="post"
              form="searchForm"
              children={<img className="search-form__submit-icon" src={searchButtonIcon} alt="Иконка кнопки" />}
            />
          </div>
          {viewport > 600 && (
            <>
              <div className="search-form__separator" />
              <div className="search-form__option">
                <label id="searchFormLabel" className="search-form__switch">
                  <input
                    id="searchFormCheckbox"
                    className="search-form__checkbox"
                    name="searchFormCheckbox"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsCheked(!isChecked)}
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
