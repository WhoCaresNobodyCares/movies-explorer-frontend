import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoPopup from '../InfoPopup/InfoPopup';

import useFormValidation from '../../utils/customHooks/useFormValidation';
import mainApi from '../../utils/apis/MainApi';
import UserContext from '../../contexts/UserContext';
import moviesApi from '../../utils/apis/MoviesApi';
import useSearch from '../../utils/customHooks/useSearch';

const App = () => {
  // configs
  const { POPUP_STATES } = require('../../configs/popupConfig.json');

  // hooks
  const isMounted = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  // customHooks
  // const { resetForm } = useFormValidation(); // !!!
  const search = useSearch();

  // useState
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userState, setUserState] = useState({});
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [popupState, setPopupState] = useState({
    isOpened: false,
    title: '',
    button: '',
  });

  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesIds, setSavedMoviesIds] = useState([]);

  const [allMoviesPrepared, setAllMoviesPrepared] = useState([]);
  const [allSavedMoviesPrepared, setAllSavedMoviesPrepared] = useState([]);

  console.log(allMoviesPrepared, allSavedMoviesPrepared, savedMoviesIds);

  // !!! JSON.parse(localStorage.getItem('movies-state'))

  // user logic
  const handleSignIn = (email, password) => {
    mainApi
      .signin(email, password)
      .then((res) => res.token && localStorage.setItem('token', `${res.token}`))
      .then(() => setIsLoggedIn(true))
      .catch((err) => {
        err === 401 && setPopupState(POPUP_STATES.login.err401);
        err === 500 && setPopupState(POPUP_STATES.login.err500);
      });
  };

  const handleSignUp = (name, email, password) => {
    mainApi
      .signup(name, email, password)
      .then((res) => handleSignIn(email, password))
      .catch((err) => {
        err === 400 && setPopupState(POPUP_STATES.register.err400);
        err === 409 && setPopupState(POPUP_STATES.register.err409);
        err === 500 && setPopupState(POPUP_STATES.register.err500);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUserState({});
    setIsLoggedIn(false);
    navigate('/');
  };

  const checkValidity = () => {
    mainApi
      .checkValidity(localStorage.getItem('token'))
      .then((res) => setUserState(res))
      .then(() => !isLoggedIn && setIsLoggedIn(true))
      .then(() => navigate('/movies'))
      .then(() => setPopupState(POPUP_STATES.tokenValidity.success))
      .catch((err) => err === 401 && setPopupState(POPUP_STATES.tokenValidity.err401));
  };

  const handleUpdateUser = (name, email) => {
    mainApi
      .updateUser(name, email, localStorage.getItem('token'))
      .then((res) => setUserState(res))
      .then(() => setPopupState(POPUP_STATES.profile.success))
      .catch((err) => {
        err === 409 && setPopupState(POPUP_STATES.profile.err409);
        err === 500 && setPopupState(POPUP_STATES.profile.err500);
      });
  };

  // user logic object
  const userLogic = { handleSignUp, handleSignIn, handleSignOut, handleUpdateUser };

  // movies logic

  const regulateExternalData = (array) =>
    array
      .map((item) => {
        if (
          item.country === null ||
          item.director === null ||
          item.duration === null ||
          item.year === null ||
          item.description === null ||
          item.image === null ||
          item.trailerLink === null ||
          item.id === null ||
          item.nameRU === null ||
          item.nameEN === null
        ) {
          return false;
        }
        const { country, director, duration, year, description, image, trailerLink, id, nameRU, nameEN } = item;
        return {
          country: country,
          director: director,
          duration: duration,
          year: year,
          description: description,
          image: `https://api.nomoreparties.co/${item.image.url}`,
          trailerLink: trailerLink,
          thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
          movieId: id,
          nameRU: nameRU,
          nameEN: nameEN,
        };
      })
      .filter(Boolean);

  const filterSavedMoviesIds = (allMovies, savedMovies) =>
    allMovies
      .map((item) => {
        let match;
        for (let i = 0; i < savedMovies.length; i++) {
          const element = savedMovies[i];
          if (item.movieId === element.movieId) {
            match = item.movieId;
          }
        }
        return match;
      })
      .filter(Boolean);

  const initialSearch = (isChecked, words, setIsInitialSearch) => {
    if (words.length !== 0) {
      setIsPreloaderVisible(true);
      Promise.all([moviesApi.getMovies(), mainApi.getMovies(localStorage.getItem('token'))])
        .then((res) => {
          const [moviesApiRes, mainApiRes] = [res[0], res[1]];
          const [allMovies, savedMovies] = [regulateExternalData(moviesApiRes), mainApiRes];
          return { allMovies, savedMovies };
        })
        .then(({ allMovies, savedMovies }) => {
          return { allMovies, savedMovies, savedMoviesIds: filterSavedMoviesIds(allMovies, savedMovies) };
        })
        .then(({ allMovies, savedMovies, savedMoviesIds }) => {
          setSavedMoviesIds(savedMoviesIds);
          return { allMovies, savedMovies, savedMoviesIds };
        })
        .then(({ allMovies, savedMovies, savedMoviesIds }) => {
          const foundMovies = search(allMovies, isChecked, words);
          return { foundMovies, savedMovies, savedMoviesIds };
        })
        .then(({ foundMovies, savedMovies, savedMoviesIds }) => {
          localStorage.setItem('all-movies-state', JSON.stringify({ cards: foundMovies, isChecked: isChecked, words: [...words] }));
          localStorage.setItem('saved-movies-state', JSON.stringify({ savedMovies: [...savedMoviesIds] }));
          return { foundMovies, savedMovies };
        })
        .then(({ foundMovies, savedMovies }) => {
          setAllMoviesPrepared(foundMovies);
          setAllSavedMoviesPrepared(savedMovies);
        })
        .then(() => setIsPreloaderVisible(false))
        .then(() => setIsInitialSearch(false))
        .catch((err) => err === 500 && setPopupState(POPUP_STATES.movies.err500));
    }
  };

  const getAllMovies = (isChecked, words) => {
    if (words.length !== 0) {
      setIsPreloaderVisible(true);
      moviesApi
        .getMovies()
        .then((res) => regulateExternalData(res))
        .then((allMovies) => {
          setAllMovies(allMovies);
          return allMovies;
        })
        .then((allMovies) => search(allMovies, isChecked, words))
        .then((foundMovies) => {
          localStorage.setItem('all-movies-state', JSON.stringify({ cards: foundMovies, isChecked: isChecked, words: [...words] }));
          return foundMovies;
        })
        .then((filteredMovies) => setAllMoviesPrepared(filteredMovies))
        .then(() => setIsPreloaderVisible(false))
        .catch((err) => {
          setIsPreloaderVisible(false);
          err === 500 && setPopupState(POPUP_STATES.movies.err500);
        });
    }
  };

  const getSavedMovies = () => {
    mainApi
      .getMovies(localStorage.getItem('token'))
      .then((res) => {
        const savedMoviesIds = res.map(item => item.movieId)
        localStorage.setItem('saved-movies-state', JSON.stringify({ savedMovies: [...savedMoviesIds] }));
        return res
      })
      .then((res) => setAllSavedMoviesPrepared(res))
      .catch((err) => err === 500 && setPopupState(POPUP_STATES.movies.err500));
  };

  const saveMovie = (movie, setIsCardLiked) => {
    mainApi
      .addMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        token: localStorage.getItem('token'),
      })
      .then(() => setIsCardLiked(true))
      .catch((err) => {
        err === 400 && setPopupState(POPUP_STATES.movies.err400);
        err === 500 && setPopupState(POPUP_STATES.movies.err500);
      });
  };

  // movies logic object
  const moviesLogic = { isPreloaderVisible, allMoviesPrepared, allSavedMoviesPrepared, savedMoviesIds, initialSearch, getAllMovies, getSavedMovies, saveMovie, search };

  // useEffect
  // useEffect(() => { // !!!
  //   resetForm();
  // }, [location, resetForm]);

  useEffect(() => {
    checkValidity();
    if (isMounted.current === true) {
    } else {
      JSON.parse(localStorage.getItem('saved-movies-state')) && setSavedMoviesIds(JSON.parse(localStorage.getItem('saved-movies-state')).savedMovies);
      JSON.parse(localStorage.getItem('all-movies-state')) && setAllMoviesPrepared(JSON.parse(localStorage.getItem('all-movies-state')).cards);
      JSON.parse(localStorage.getItem('saved-movies-state')) && setAllSavedMoviesPrepared(JSON.parse(localStorage.getItem('saved-movies-state')).cards);
      isMounted.current = true;
    }
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={userState}>
      <div className="app">
        <Header mix="app__header" isLoggedIn={isLoggedIn} location={location} />
        <Routes>
          <Route path="*" element={<NotFound mix="app__not-found" />} />
          <Route path="/" element={<Main mix="app__main" />} />

          <Route path="/signup" element={<Register mix="app__register" userLogic={userLogic} />} />
          <Route path="/signin" element={<Login mix="app__login" userLogic={userLogic} />} />

          <Route path="/movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Movies mix="app__movies" path="/movies" moviesLogic={moviesLogic} />} />} />
          <Route path="/saved-movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<SavedMovies mix="app__saved-movies" path="/saved-movies" moviesLogic={moviesLogic} />} />} />
          <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Profile mix="app__profile" userLogic={userLogic} userState={userState} />} />} />
        </Routes>
        <Footer mix="app__footer" />
        <InfoPopup mix="app__info-popup" userState={userState} popupState={popupState} setPopupState={setPopupState} />
      </div>
    </UserContext.Provider>
  );
};

export default App;
