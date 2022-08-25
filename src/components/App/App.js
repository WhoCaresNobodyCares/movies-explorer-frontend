import { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { UserLogic } from '../../classes/UserLogic';
import { FormLogic } from '../../classes/FormLogic';
import { MoviesLogic } from '../../classes/MoviesLogic';
import { MainApi } from '../../utils/apis/MainApi';
import { MoviesApi } from '../../utils/apis/MoviesApi';
import AppContext from '../../contexts/AppContext';

const { MAIN_API_URL, MOVIES_API_URL } = require('../../configs/apiConfig.json');
const { POPUP_STATES } = require('../../configs/popupConfig.json');
const { API_ERRORS } = require('../../configs/apiErrors.json');

const App = () => {
  // * HOOKS
  const navigate = useNavigate();

  // * STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userState, setUserState] = useState({});
  const [popupState, setPopupState] = useState({
    isOpened: false,
    title: '',
    button: '',
  });
  const [registerApiError, setRegisterApiError] = useState('');
  const [loginApiError, setLoginApiError] = useState('');
  const [profileApiError, setProfileApiError] = useState('');

  // * LOGIC
  const mainApi = useMemo(() => new MainApi(MAIN_API_URL), []);
  const moviesApi = useMemo(() => new MoviesApi(MOVIES_API_URL), []);
  const userLogic = useMemo(
    () =>
      new UserLogic(
        mainApi,
        setPopupState,
        setRegisterApiError,
        setLoginApiError,
        setProfileApiError,
        POPUP_STATES,
        API_ERRORS,
        setIsLoggedIn,
        setUserState,
        navigate
      ),
    []
  );
  const moviesLogic = useMemo(
    () => new MoviesLogic(mainApi, moviesApi),
    [mainApi, moviesApi]
  );
  const formLogic = useMemo(
    () => new FormLogic(userLogic, moviesLogic, setPopupState, POPUP_STATES),
    []
  );

  // * EFFECTS
  useEffect(() => {
    userLogic.checkValidity();
  }, [isLoggedIn]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        //---
        userState,
        setUserState,
        //---
        popupState,
        setPopupState,
        //---
        registerApiError,
        setRegisterApiError,
        loginApiError,
        setLoginApiError,
        profileApiError,
        setProfileApiError,
        //---
        formLogic,
        userLogic,
        moviesLogic,
      }}
    >
      <div className="app">
        <Header mix="app__header" />
        <Routes>
          <Route path="/" element={<Main mix="app__main" />} />
          <Route path="/signup" element={<Register mix="app__register" />} />
          <Route path="/signin" element={<Login mix="app__login" />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={<Movies mix="app__movies" />}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={<SavedMovies mix="app__saved-movies" />}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={<Profile mix="app__profile" />}
              />
            }
          />
          <Route path="*" element={<NotFound mix="app__not-found" />} />
        </Routes>
        <Footer mix="app__footer" />
        <InfoPopup mix="app__info-popup" />
      </div>
    </AppContext.Provider>
  );
};

export default App;
