import { useEffect, useRef, useState } from 'react';
import useWidth from '../../utils/customHooks/useWidth';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButtonIcon from '../../images/search-button-icon.svg';
import useSearchCards from '../../utils/customHooks/useSearchCards';
import moviesApi from '../../apis/MoviesApi';
import { useLocation } from 'react-router-dom';
import mainApi from '../../apis/MainApi';
import { popupMoviesErrors, popupSavedMoviesErrors } from '../../variables/appVariables';

const SearchForm = ({ mix, renderer, handlePreloader, handleNotFound, handlePopup, handlePopupInfo, handleIsLikedChecked }) => {
  const location = useLocation().pathname;
  const isMounted = useRef(false);
  const viewport = useWidth();

  const [allCards, setAllCards] = useState(
    JSON.parse(localStorage.getItem('movies-state')) === null ? [] : JSON.parse(localStorage.getItem('movies-state')).cards
  );
  const [savedCards, setSavedCards] = useState([]);

  const [search] = useSearchCards();
  const [keyWords, setKeyWords] = useState('');
  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem('movies-state')) === null ? false : JSON.parse(localStorage.getItem('movies-state')).isShort
  );

  const render = (data) => {
    renderer(data);
  };
  const switchPreloaderState = (boolean) => handlePreloader(boolean);

  useEffect(() => {
    if (location === '/movies') {
      mainApi
        .getMovies(localStorage.getItem('token'))
        .then((cards) => {
          setSavedCards(cards);
          JSON.parse(localStorage.getItem('movies-state')) !== null && render(JSON.parse(localStorage.getItem('movies-state')).cards);
          JSON.parse(localStorage.getItem('movies-state')) !== null &&
            setKeyWords(JSON.parse(localStorage.getItem('movies-state')).searchText);
        })
        .catch((err) => console.log(`mainApi error: ${err}`));
    }
  }, []);

  useEffect(() => {
    if (isMounted.current === true && keyWords.length !== 0 && location === '/movies') {
      switchPreloaderState(true);
      mainApi
        .getMovies(localStorage.getItem('token'))
        .then((cards) => {
          setSavedCards(cards);
          moviesApi
            .getMovies()
            .then((cards) => {
              return search(cards, isShort, keyWords);
            })
            .then((data) => {
              data.length === 0 ? handleNotFound(true) : handleNotFound(false);
              setAllCards(data);
              handleIsLikedChecked(allCards, savedCards);
              render(data);
              localStorage.setItem(
                'movies-state',
                JSON.stringify({ searchText: [...keyWords], cards: [...data], isShort: isShort, savedCards: savedCards })
              );
            })
            .then(() => switchPreloaderState(false))
            .catch((err) => {
              switchPreloaderState(false);
              handlePopupInfo(popupMoviesErrors[0]);
              handlePopup(true);
              console.log(`MoviesApi error: ${err}`);
            });
        })
        .catch((err) => console.log(`mainApi error: ${err}`));
    } else {
      if (JSON.parse(localStorage.getItem('movies-state'))) {
        handleIsLikedChecked(allCards, JSON.parse(localStorage.getItem('movies-state')).savedCards);
      } else {
        handleIsLikedChecked(allCards, savedCards);
      }
      isMounted.current = true;
    }

    if (location === '/saved-movies') {
      switchPreloaderState(true);
      mainApi
        .getMovies(localStorage.getItem('token'))
        .then((savedCards) => {
          render(savedCards);
        })
        .then(() => switchPreloaderState(false))
        .catch((err) => {
          switchPreloaderState(false);
          handlePopupInfo(popupSavedMoviesErrors[0]);
          handlePopup(true);
          console.log(`mainApi error: ${err}`);
        });
    } else {
      if (JSON.parse(localStorage.getItem('saved-movies-state'))) {
        render(JSON.parse(localStorage.getItem('saved-movies-state')).savedCards);
      }
      isMounted.current = true;
    }
  }, [isShort]);

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
        onSubmit={
          location === '/movies'
            ? (e) => {
                e.preventDefault();
                if (keyWords.length !== 0) {
                  switchPreloaderState(true);
                  mainApi
                    .getMovies(localStorage.getItem('token'))
                    .then((cards) => {
                      setSavedCards(cards);
                      moviesApi
                        .getMovies()
                        .then((cards) => {
                          return search(cards, isShort, keyWords);
                        })
                        .then((data) => {
                          data.length === 0 ? handleNotFound(true) : handleNotFound(false);
                          setAllCards(data);
                          handleIsLikedChecked(allCards, savedCards);
                          render(data);
                          localStorage.setItem(
                            'movies-state',
                            JSON.stringify({ searchText: [...keyWords], cards: [...data], isShort: isShort, savedCards: savedCards })
                          );
                        })
                        .then(() => switchPreloaderState(false))
                        .catch((err) => {
                          switchPreloaderState(false);
                          handlePopupInfo(popupMoviesErrors[0]);
                          handlePopup(true);
                          console.log(`MoviesApi error: ${err}`);
                        });
                    })
                    .catch((err) => console.log(`mainApi error: ${err}`));
                } else {
                  handlePopupInfo(popupMoviesErrors[1]);
                  handlePopup(true);
                }
              }
            : (e) => {
                e.preventDefault();
                if (keyWords.length !== 0) {
                  switchPreloaderState(true);
                  mainApi
                    .getMovies(localStorage.getItem('token'))
                    .then((savedCards) => {
                      return search(savedCards, isShort, keyWords);
                    })
                    .then((data) => {
                      console.log(data);
                      data.length === 0 ? handleNotFound(true) : handleNotFound(false);
                      render(data);
                      localStorage.setItem(
                        'saved-movies-state',
                        JSON.stringify({ searchText: [...keyWords], isShort: isShort, savedCards: savedCards })
                      );
                    })
                    .then(() => switchPreloaderState(false))
                    .catch((err) => {
                      switchPreloaderState(false);
                      handlePopupInfo(popupSavedMoviesErrors[0]);
                      handlePopup(true);
                      console.log(`mainApi error: ${err}`);
                    });
                } else {
                  handlePopupInfo(popupSavedMoviesErrors[1]);
                  handlePopup(true);
                }
              }
        }
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
              defaultValue={
                location === '/movies'
                  ? JSON.parse(localStorage.getItem('movies-state')) === null
                    ? ''
                    : JSON.parse(localStorage.getItem('movies-state')).searchText.join(' ')
                  : JSON.parse(localStorage.getItem('saved-movies-state')) === null
                  ? ''
                  : JSON.parse(localStorage.getItem('saved-movies-state')).searchText.join(' ')
              }
              autoComplete="on"
              required
              autoFocus
              onChange={(e) => {
                const words = e.target.value
                  .replace(/\s+/g, ' ')
                  .split(' ')
                  .map((item) => item !== '' && item)
                  .filter(Boolean);
                setKeyWords(words);
                console.log(keyWords)
              }}
            />
            <button
              id="search-form-submit"
              className="search-form__submit"
              name="search-form-submit"
              aria-label="Начать поиск"
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
                    defaultChecked={
                      JSON.parse(localStorage.getItem('movies-state')) === null
                        ? false
                        : JSON.parse(localStorage.getItem('movies-state')).isShort
                    }
                    onChange={() => setIsShort(!isShort)}
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
                  defaultChecked={
                    JSON.parse(localStorage.getItem('movies-state')) === null
                      ? false
                      : JSON.parse(localStorage.getItem('movies-state')).isShort
                  }
                  onChange={() => setIsShort(!isShort)}
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
