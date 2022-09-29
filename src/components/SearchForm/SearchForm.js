import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import reduceForm from '../../utils/reducers/reduceForm';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButtonIcon from '../../images/search-button-icon.svg';
import { useLocation } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

const SearchForm = ({ handleSearch }) => {
  const location = useLocation().pathname;
  const userState = useContext(UserContext);

  const initialRender = useRef(true);

  const [state, dispatch] = useReducer(
    reduceForm,
    {
      value: '',
      isCheckboxChecked: false,
      isFormValid: true,
    },
    () => {
      if (location === '/movies' && userState) {
        const data = localStorage.getItem('moviesSearchState');
        return data
          ? JSON.parse(data)
          : { value: '', isCheckboxChecked: false, isFormValid: true };
      }
      if (location === '/saved-movies' && userState) {
        const data = localStorage.getItem('savedMoviesSearchState');
        return data
          ? JSON.parse(data)
          : { value: '', isCheckboxChecked: false, isFormValid: true };
      }
    }
  );

  const { value, isCheckboxChecked, isFormValid } = state;

  const [isDesktopLayout, setIsDesktopLayout] = useState(
    window.innerWidth > 600
  );

  const updateLayout = () =>
    window.innerWidth > 600
      ? setIsDesktopLayout(true)
      : setIsDesktopLayout(false);

  const prepareValue = value =>
    value
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(item => item !== '' && item)
      .filter(Boolean);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      handleSearch(null, prepareValue(value), isCheckboxChecked);
    }
  }, [isCheckboxChecked]);

  useEffect(() => {
    if (location === '/movies' && userState) {
      localStorage.setItem(
        'moviesSearchState',
        JSON.stringify({ value, isCheckboxChecked, isFormValid })
      );
    }
    if (location === '/saved-movies' && userState) {
      localStorage.setItem(
        'savedMoviesSearchState',
        JSON.stringify({ value, isCheckboxChecked, isFormValid })
      );
    }
  }, [state]);

  useEffect(() => {
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return (
    <section className='search-form'>
      <form
        id='searchForm'
        className='search-form__form'
        name='form'
        action='#'
        method='post'
        target='_self'
        autoComplete='off'
        noValidate
        onSubmit={e => handleSearch(e, prepareValue(value), isCheckboxChecked)}>
        <div className='search-form__frame'>
          <div className='search-form__search-bar'>
            {isDesktopLayout && (
              <img
                className='search-form__search-icon'
                src={searchIcon}
                alt='Иконка поиска'
              />
            )}
            <input
              id='searchFormInput'
              className={
                isFormValid
                  ? 'search-form__input'
                  : 'search-form__input search-form__input_invalid'
              }
              name='value'
              type='text'
              minLength={0}
              maxLength={80}
              placeholder={
                location === '/movies' ? 'Фильмы' : 'Сохраненные фильмы'
              }
              autoComplete='off'
              pattern='^([a-zA-Zа-яА-Я0-9]+[\s|\-]?)+$'
              required
              value={value}
              onChange={e =>
                dispatch({
                  type: 'HANDLE_INPUT',
                  payload: {
                    name: e.target.name,
                    value: e.target.value,
                    isValid:
                      location === '/movies'
                        ? e.target.closest('form').checkValidity()
                        : true,
                  },
                })
              }
            />
            <button
              id='searchFormSubmit'
              className={
                isFormValid
                  ? 'search-form__submit'
                  : 'search-form__submit search-form__submit_disabled'
              }
              name='submit'
              aria-label='Начать поиск'
              formMethod='post'
              type='submit'
              form='searchForm'
              disabled={!isFormValid}
              children={
                <img
                  className={
                    isFormValid
                      ? 'search-form__submit-icon'
                      : 'search-form__submit-icon search-form__submit-icon_disabled'
                  }
                  src={searchButtonIcon}
                  alt='Иконка кнопки'
                />
              }
            />
          </div>
          {isDesktopLayout && (
            <>
              <div className='search-form__separator' />
              <div className='search-form__option'>
                <label id='searchFormLabel' className='search-form__switch'>
                  <input
                    id='searchFormCheckbox'
                    className='search-form__checkbox'
                    name='checkbox'
                    type='checkbox'
                    form='searchForm'
                    checked={isCheckboxChecked}
                    onChange={e =>
                      dispatch({
                        type: 'HANDLE_CHECKBOX',
                        payload: {
                          name: e.target.name,
                          value: e.target.checked,
                        },
                      })
                    }
                  />
                  <span className='search-form__slider' />
                </label>
                <span
                  className='search-form__switch-description'
                  children='Короткометражки'
                />
              </div>
            </>
          )}
        </div>
        {!isDesktopLayout && (
          <>
            <div className='search-form__option'>
              <label id='searchFormLabel' className='search-form__switch'>
                <input
                  id='searchFormCheckbox'
                  className='search-form__checkbox'
                  name='checkbox'
                  type='checkbox'
                  form='searchForm'
                  checked={isCheckboxChecked}
                  onChange={e =>
                    dispatch({
                      type: 'HANDLE_CHECKBOX',
                      payload: {
                        name: e.target.name,
                        value: e.target.checked,
                      },
                    })
                  }
                />
                <span className='search-form__slider' />
              </label>
              <span
                className='search-form__switch-description'
                children='Короткометражки'
              />
            </div>
          </>
        )}
      </form>
    </section>
  );
};

export default SearchForm;
