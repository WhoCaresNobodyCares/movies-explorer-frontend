import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import mainApi from '../../apis/MainApi';
import useWidth from '../../utils/customHooks/useWidth';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

const MoviesCardList = ({ mix, cards, preloaderIsVisible, setPreloaderIsVisible, notFoundIsVisible, likedCards }) => {
  const location = useLocation().pathname;
  const viewport = useWidth();

  const index = () => {
    if (viewport <= 689) {
      return 5;
    } else if (viewport <= 1087) {
      return 8;
    } else if (viewport > 1087) {
      return 12;
    }
  };

  const multiplier = () => {
    if (viewport <= 689) {
      return 1;
    } else if (viewport <= 1087) {
      return 2;
    } else if (viewport > 1087) {
      return 3;
    }
  };

  const [buttonIsVisible, setButtonIsVisible] = useState(false);
  const [cardsIndex, setCardsIndex] = useState(index());
  const renderItems = cards.slice(0, cardsIndex);

  const handleArrayEnds = () => {
    let count = -1;
    for (let i = 0; i < renderItems.length; i++) {
      count++;
    }
    let state = typeof cards[count + 1] === 'object' ? true : false;
    return state;
  };

  const handleCardLike = (item, setIsLiked, isLiked) => {
    mainApi
      .addMovie({
        country: item.country,
        director: item.director,
        duration: item.duration,
        year: item.year,
        description: item.description,
        image: `https://api.nomoreparties.co/${item.image.url}`,
        trailerLink: item.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${item.image.formats.thumbnail.url}`,
        movieId: item.id,
        nameRU: item.nameRU,
        nameEN: item.nameEN,
        token: localStorage.getItem('token'),
      })
      .then((data) => {
        const { searchText, cards, isShort, savedCards } = JSON.parse(localStorage.getItem('movies-state'));
        savedCards.push(data);
        localStorage.setItem(
          'movies-state',
          JSON.stringify({ searchText: [...searchText], cards: [...cards], isShort: isShort, savedCards: savedCards })
        );
      })
      .then(() => setIsLiked(!isLiked))
      .catch((err) => {
        console.log(`MoviesApi error: ${err}`);
      });
  };

  useEffect(() => setCardsIndex(index()), [cards, viewport]);

  useEffect(() => {
    cards.length === 0 ? setButtonIsVisible(false) : setButtonIsVisible(true);
  }, [cards.length]);

  return (
    <section className={`${mix} movies-card-list`}>
      <div
        className={
          buttonIsVisible && handleArrayEnds() ? 'movies-card-list__cards' : 'movies-card-list__cards movies-card-list__cards_no-margin'
        }
        children={
          location === '/movies'
            ? renderItems.map((item) => {
                const isLiked = likedCards.some((id) => id === item.id);
                return (
                  <MoviesCard
                    mix={location === '/movies' ? 'movies__card' : 'saved-movies__card'}
                    item={item}
                    key={item.id}
                    onClick={handleCardLike}
                    liked={isLiked}
                  />
                );
              })
            : renderItems.map((item) => {
                return (
                  <MoviesCard
                    mix={location === '/movies' ? 'movies__card' : 'saved-movies__card'}
                    item={item}
                    key={item.movieId}
                    onClick={handleCardLike}
                  />
                );
              })
        }
      />

      <button
        id="movies-card-list-button"
        className={
          buttonIsVisible && handleArrayEnds() ? 'movies-card-list__button movies-card-list__button_visible' : 'movies-card-list__button'
        }
        name="movies-card-list-button"
        aria-label="Добавить карточки"
        type="button"
        onClick={() => {
          setPreloaderIsVisible(!preloaderIsVisible);
          setCardsIndex(cardsIndex + multiplier());
          setPreloaderIsVisible(false);
        }}
        children="Еще"
      />

      <Preloader mix="movies-card-list__preloader" mod_visible={preloaderIsVisible ? 'movies-card-list__preloader_visible' : ''} />
      <div
        className={notFoundIsVisible ? 'movies-card-list__not-found movies-card-list__not-found_visible' : 'movies-card-list__not-found'}
        children={<span className="movies-card-list__not-found-message">Ничего не найдено</span>}
      />
    </section>
  );
};

export default MoviesCardList;
