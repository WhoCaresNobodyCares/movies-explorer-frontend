// !!! REACT AND HOOKS
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

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
import { FormLogic } from '../../classes/FormLogic';
import { MainApi } from '../../utils/apis/MainApi';
import { MoviesApi } from '../../utils/apis/MoviesApi';

// !!! CONTEXT
import UserContext from '../../contexts/UserContext';
import IsLoggedInContext from '../../contexts/IsLoggedInContext';
import FormLogicContext from '../../contexts/FormLogicContext';
import UserLogicContext from '../../contexts/UserLogicContext';

// !!! CONFIGS
const {
  MAIN_API_URL,
  MOVIES_API_URL,
} = require('../../configs/apiConfig.json');
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

  const formLogic = new FormLogic(userLogic, setPopupState, POPUP_STATES);

  // * EFFECTS
  useEffect(() => {
    userLogic.checkValidity();
  }, [isLoggedIn]);

  return (
    <IsLoggedInContext.Provider value={isLoggedIn}>
      <UserContext.Provider value={userState}>
        <FormLogicContext.Provider value={formLogic}>
          <UserLogicContext.Provider value={userLogic}>
            <div className="app">
              <Header mix="app__header" />
              <Routes>
                <Route path="/" element={<Main mix="app__main" />} />
                <Route
                  path="/signup"
                  element={
                    <Register
                      mix="app__register"
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
                      element={
                        <Profile
                          mix="app__profile"
                          profileApiError={profileApiError}
                          setProfileApiError={setProfileApiError}
                        />
                      }
                    />
                  }
                />
                <Route path="*" element={<NotFound mix="app__not-found" />} />
              </Routes>
              <Footer mix="app__footer" />
              <InfoPopup
                mix="app__info-popup"
                popupState={popupState}
                setPopupState={setPopupState}
              />
            </div>
          </UserLogicContext.Provider>
        </FormLogicContext.Provider>
      </UserContext.Provider>
    </IsLoggedInContext.Provider>
  );
};

export default App;
