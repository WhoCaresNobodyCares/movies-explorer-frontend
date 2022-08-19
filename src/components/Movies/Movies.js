import { useState } from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ mix, setPopupIsOpened, setPopupInfo }) => {
  const [cards, setCards] = useState([]);
  const [likedCards, setLikedCards] = useState([]);
  const [preloaderIsVisible, setPreloaderIsVisible] = useState(false);
  const [notFoundIsVisible, setNotFoundIsVisible] = useState(false);

  const renderer = (data) => {
    setCards(data);
  };

  const handlePreloader = (boolean) => {
    setPreloaderIsVisible(boolean);
  };

  const handleNotFound = (boolean) => {
    setNotFoundIsVisible(boolean);
  };

  const handlePopup = (boolean) => {
    setPopupIsOpened(boolean);
  };

  const handlePopupInfo = (data) => {
    setPopupInfo(data);
  };

  const handleIsLikedChecked = (allCards, savedCards) => {
    setLikedCards(allCards.map((item) => savedCards.some((card) => item.id === card.movieId) && item.id).filter(Boolean));
  };


  return (
    <main className={`${mix} movies`}>
      <SearchForm
        mix="movies__search-form"
        renderer={renderer}
        handlePreloader={handlePreloader}
        handleNotFound={handleNotFound}
        handlePopup={handlePopup}
        handlePopupInfo={handlePopupInfo}
        handleIsLikedChecked={handleIsLikedChecked}
      />
      <MoviesCardList
        mix="movies__movies-card-list"
        cards={cards}
        preloaderIsVisible={preloaderIsVisible}
        setPreloaderIsVisible={setPreloaderIsVisible}
        notFoundIsVisible={notFoundIsVisible}
        likedCards={likedCards}
      />
    </main>
  );
};

export default Movies;
