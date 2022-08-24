// !!! REACT AND HOOKS
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import useWidth from '../../utils/customHooks/useWidth';
import useFormValidator from '../../utils/customHooks/useFormValidator';
import useFormHandler from '../../utils/customHooks/useFormHandler';

// !!! STYLES
import './App.css';

// !!! COMPONENTS
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

// !!! LOGIC
import { UserLogic } from '../../classes/UserLogic';
import { MoviesLogic } from '../../classes/MoviesLogic';
import { FormLogic } from '../../classes/FormLogic';
import { MainApi } from '../../utils/apis/MainApi';
import { MoviesApi } from '../../utils/apis/MoviesApi';

// !!! CONTEXT
import UserContext from '../../contexts/UserContext';
import IsLoggedInContext from '../../contexts/IsLoggedInContext';

const App = () => {
  // * CONFIGS
  const {
    MAIN_API_URL,
    MOVIES_API_URL,
  } = require('../../configs/apiConfig.json');
  const { POPUP_STATES } = require('../../configs/popupConfig.json');
  const { API_ERRORS } = require('../../configs/apiErrors.json');

  // * HOOKS
  const location = useLocation();
  const navigate = useNavigate();
  const viewportWidth = useWidth();
  const formValidator = useFormValidator();
  const formHandler = useFormHandler();

  // * STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userState, setUserState] = useState({});
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [popupState, setPopupState] = useState({
    isOpened: false,
    title: '',
    button: '',
  });
  const [registerApiError, setRegisterApiError] = useState('');
  const [loginApiError, setLoginApiError] = useState('');
  const [profileApiError, setProfileApiError] = useState('');

  // * LOCALSTORAGEITEMS
  const token = localStorage.getItem('token');
  const state =
    JSON.parse(localStorage.getItem(`${userState.email}-state`)) || {};

  // * LOGIC
  const mainApi = new MainApi(MAIN_API_URL);
  const moviesApi = new MoviesApi(MOVIES_API_URL);

  const userLogic = new UserLogic(
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
  );

  const moviesLogic = new MoviesLogic(
    mainApi,
    moviesApi,
    setIsPreloaderVisible
  );

  const formLogic = new FormLogic(
    userLogic,
    moviesLogic,
    setPopupState,
    POPUP_STATES
  );

  // * EFFECTS
  useEffect(() => {
    userLogic.checkValidity(token);
  }, [token, isLoggedIn]);

  return (
    <IsLoggedInContext.Provider value={isLoggedIn}>
      <UserContext.Provider value={userState}>
        <div className="app">
          <Header
            mix="app__header"
            location={location}
            viewportWidth={viewportWidth}
          />
          <Routes>
            <Route
              path="/"
              element={<Main mix="app__main" viewportWidth={viewportWidth} />}
            />

            <Route
              path="/signup"
              element={
                <Register
                  mix="app__register"
                  formLogic={formLogic}
                  formValidator={formValidator}
                  registerApiError={registerApiError}
                  setRegisterApiError={setRegisterApiError}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  mix="app__login"
                  formLogic={formLogic}
                  formValidator={formValidator}
                  loginApiError={loginApiError}
                  setLoginApiError={setLoginApiError}
                />
              }
            />

            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={
                    <Movies
                      mix="app__movies"
                      token={token}
                      state={state}
                      formLogic={formLogic}
                      moviesLogic={moviesLogic}
                      viewportWidth={viewportWidth}
                      formHandler={formHandler}
                      location={location}
                      isPreloaderVisible={isPreloaderVisible}
                      setIsPreloaderVisible={setIsPreloaderVisible}
                    />
                  }
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={
                    <SavedMovies
                      mix="app__saved-movies"
                      token={token}
                      state={state}
                      formLogic={formLogic}
                      moviesLogic={moviesLogic}
                      viewportWidth={viewportWidth}
                      formHandler={formHandler}
                      location={location}
                      isPreloaderVisible={isPreloaderVisible}
                      setIsPreloaderVisible={setIsPreloaderVisible}
                    />
                  }
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={
                    <Profile
                      mix="app__profile"
                      formLogic={formLogic}
                      userLogic={userLogic}
                      token={token}
                      formValidator={formValidator}
                      profileApiError={profileApiError}
                      setProfileApiError={setProfileApiError}
                    />
                  }
                />
              }
            />

            <Route
              path="*"
              element={<NotFound mix="app__not-found" navigate={navigate} />}
            />
          </Routes>
          <Footer mix="app__footer" />

          <InfoPopup
            mix="app__info-popup"
            popupState={popupState}
            setPopupState={setPopupState}
          />
        </div>
      </UserContext.Provider>
    </IsLoggedInContext.Provider>
  );
};

export default App;
