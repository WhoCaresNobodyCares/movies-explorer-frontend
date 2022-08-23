import { useEffect, useRef, useState } from 'react';

import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButtonIcon from '../../images/search-button-icon.svg';

import useWidth from '../../utils/customHooks/useWidth';
import useForm from '../../utils/customHooks/useForm';
import useSearchFilter from '../../utils/customHooks/useSearchFilter';

const SearchForm = ({ mix, moviesLogic, path }) => {
  const isMounted = useRef(false);
  const searchForm = useRef(null);

  const viewportWidth = useWidth();
  const { values, handleChange, setValues } = useForm();

  const words = useSearchFilter(values.searchFormInput);

  const [isChecked, setIsChecked] = useState(false);
  const [isInitialSearch, setIsInitialSearch] = useState(true);
  const [defaultInputValue, setDefaultInputValue] = useState('');

  const { getAllMovies, initialSearch, getSavedMovies, search } = moviesLogic;

  const submitOnCheck = (form) => {
    form.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  useEffect(() => {
    if (isMounted.current === true) {
    } else {
      path === '/movies' && JSON.parse(localStorage.getItem('all-movies-state')) && setDefaultInputValue(JSON.parse(localStorage.getItem('all-movies-state')).words);
      path === '/movies' && JSON.parse(localStorage.getItem('all-movies-state')) && setIsChecked(JSON.parse(localStorage.getItem('all-movies-state')).isChecked);
      path === '/movies' && JSON.parse(localStorage.getItem('all-movies-state')) && setValues({ searchFormInput: JSON.parse(localStorage.getItem('all-movies-state')).words });
      path === '/saved-movies' && JSON.parse(localStorage.getItem('saved-movies-state')) && setDefaultInputValue(JSON.parse(localStorage.getItem('saved-movies-state')).words);
      path === '/saved-movies' && JSON.parse(localStorage.getItem('saved-movies-state')) && setIsChecked(JSON.parse(localStorage.getItem('saved-movies-state')).isChecked);
      path === '/saved-movies' && JSON.parse(localStorage.getItem('saved-movies-state')) && setValues({ searchFormInput: JSON.parse(localStorage.getItem('saved-movies-state')).words });
      isMounted.current = true;
    }
  }, [path]);

  useEffect(() => {
    if (isMounted.current === true) {
      submitOnCheck(searchForm);
    } else {
      isMounted.current = true;
    }
  }, [isChecked]);

  return (
    <section className={`${mix} search-form`}>
      <form
        ref={searchForm}
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
          console.log('submit');
          if (path === '/movies' && isInitialSearch && !JSON.parse(localStorage.getItem('all-movies-state'))) {
            initialSearch(isChecked, words, setIsInitialSearch);
          } else if (path === '/movies') {
            getAllMovies(isChecked, words);
          }

          if (path === '/saved-movies' && !JSON.parse(localStorage.getItem('saved-movies-state'))) {
            getSavedMovies();
          } else {
            // search(JSON.parse(localStorage.getItem('saved-movies-state')).savedMovies, isChecked, words);
            console.log('doing nothing');
          }
          setValues(values);
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
              minLength="0"
              maxLength="40"
              placeholder="Фильм"
              autoComplete="on"
              defaultValue={defaultInputValue}
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
          {viewportWidth > 600 && (
            <>
              <div className="search-form__separator" />
              <div className="search-form__option">
                <label id="searchFormLabel" className="search-form__switch">
                  <input id="searchFormCheckbox" className="search-form__checkbox" name="searchFormCheckbox" type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
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
                <input id="searchFormCheckbox" className="search-form__checkbox" name="searchFormCheckbox" type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
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
