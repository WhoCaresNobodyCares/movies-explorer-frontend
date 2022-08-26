import { useEffect, useState } from 'react';

import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButtonIcon from '../../images/search-button-icon.svg';

const SearchForm = () => {
  // * STATES
  const [isDesktopLayout, setIsDesktopLayout] = useState(window.innerWidth > 600);

  // * LOGIC
  const updateLayout = () =>
    window.innerWidth > 600 ? setIsDesktopLayout(true) : setIsDesktopLayout(false);

  // * EFFECTS
  useEffect(() => {
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return (
    <section className='search-form'>
      <form
        id='searchForm'
        className='search-form__form'
        name='searchForm'
        action='#'
        method='post'
        target='_self'
        autoComplete='off'
        onSubmit={e => e.preventDefault()}>
        <div className='search-form__frame'>
          <div className='search-form__search-bar'>
            {isDesktopLayout && (
              <img className='search-form__search-icon' src={searchIcon} alt='Иконка поиска' />
            )}
            <input
              id='searchFormInput'
              className={
                false ? 'search-form__input' : 'search-form__input search-form__input_invalid'
              }
              name='searchFormInput'
              type='text'
              minLength={0}
              maxLength={80}
              defaultValue={''}
              placeholder='Фильм'
              autoComplete='off'
              pattern='[A-Za-zА-Яа-я0-9]+([\s])?'
              required
              autoFocus
              onChange={e => {}}
            />
            <button
              id='searchFormSubmit'
              className={
                false ? 'search-form__submit' : 'search-form__submit search-form__submit_disabled'
              }
              name='searchFormSubmit'
              aria-label='Начать поиск'
              formMethod='post'
              type='submit'
              form='searchForm'
              disabled={false}
              children={
                <img
                  className={
                    false
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
                    name='searchFormCheckbox'
                    type='checkbox'
                    form='searchForm'
                    checked={false}
                    onChange={e => {}}
                  />
                  <span className='search-form__slider' />
                </label>
                <span className='search-form__switch-description' children='Короткометражки' />
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
                  name='searchFormCheckbox'
                  type='checkbox'
                  form='searchForm'
                  checked={false}
                  onChange={e => {}}
                />
                <span className='search-form__slider' />
              </label>
              <span className='search-form__switch-description' children='Короткометражки' />
            </div>
          </>
        )}
      </form>
    </section>
  );
};

export default SearchForm;
