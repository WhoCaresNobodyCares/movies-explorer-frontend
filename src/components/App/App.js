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
import { User } from '../../classes/User';
import { Form } from '../../classes/Form';
import { MainApi } from '../../utils/apis/MainApi';
import { MoviesApi } from '../../utils/apis/MoviesApi';
import UserContext from '../../contexts/UserContext';

const App = () => {
  // * CONFIGS
  const {
    MAIN_API_URL,
    MOVIES_API_URL,
  } = require('../../configs/apiConfig.json');
  const { POPUP_STATES } = require('../../configs/popupConfig.json');

  // * LOCALSTORAGEITEMS
  const token = localStorage.getItem('token');

  // * HOOKS
  const location = useLocation();
  const navigate = useNavigate();
  const viewportWidth = useWidth();
  const formValidator = useFormValidator();
  const formHandler = useFormHandler();

  // * STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userState, setUserState] = useState({});
  const [popupState, setPopupState] = useState({
    isOpened: false,
    title: '',
    button: '',
  });

  // * LOGIC
  const mainApi = new MainApi(MAIN_API_URL);
  const moviesApi = new MoviesApi(MOVIES_API_URL);

  const user = new User(
    mainApi,
    setPopupState,
    POPUP_STATES,
    setIsLoggedIn,
    setUserState,
    navigate
  );

  const form = new Form(user, setPopupState, POPUP_STATES);

  // * EFFECTS
  useEffect(() => {
    user.checkValidity(token);
  }, [token, isLoggedIn]);

  return (
    <UserContext.Provider value={userState}>
      <div className="app">
        <Header
          mix="app__header"
          isLoggedIn={isLoggedIn}
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
                form={form}
                formValidator={formValidator}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                mix="app__login"
                form={form}
                formValidator={formValidator}
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
                    form={form}
                    viewportWidth={viewportWidth}
                    formHandler={formHandler}
                    location={location}
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
                    form={form}
                    viewportWidth={viewportWidth}
                    formHandler={formHandler}
                    location={location}
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
                    form={form}
                    user={user}
                    token={token}
                    userState={userState}
                    formValidator={formValidator}
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
  );
};

export default App;
