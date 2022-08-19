import { useState } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ mix, setPopupIsOpened, setPopupInfo }) => {
  const [cards, setCards] = useState([]);
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

  const handleIsLikedChecked = () => {};

  return (
    <main className={`${mix} saved-movies`}>
      <SearchForm
        mix="saved-movies__search-form"
        renderer={renderer}
        handlePreloader={handlePreloader}
        handleNotFound={handleNotFound}
        handlePopup={handlePopup}
        handlePopupInfo={handlePopupInfo}
        handleIsLikedChecked={handleIsLikedChecked}
      />
      <MoviesCardList
        mix="saved-movies__movies-card-list"
        cards={cards}
        preloaderIsVisible={preloaderIsVisible}
        setPreloaderIsVisible={setPreloaderIsVisible}
        notFoundIsVisible={notFoundIsVisible}
      />
    </main>
  );
};

export default SavedMovies;
