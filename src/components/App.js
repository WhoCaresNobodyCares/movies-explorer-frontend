import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useAllowedPaths from '../utils/customHooks/useAllowedPaths';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Profile from './Profile/Profile';
import Register from './Register/Register';
import Login from './Login/Login';
import NotFound from './NotFound/NotFound';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import InfoPopup from './InfoPopup/InfoPopup';
import mainApi from '../apis/MainApi';
import UserContext from '../contexts/UserContext';

const App = () => {
  // config
  const { POPUP_STATES } = require('../configs/popupConfig.json');

  // hooks
  const nav = useNavigate();

  // customHooks
  const [headerIsRendered] = useAllowedPaths(['/', '/movies', '/saved-movies', '/profile', '/signin', '/signup']);
  const [footerIsRendered] = useAllowedPaths(['/', '/movies', '/saved-movies']);

  // useState
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [popupState, setPopupState] = useState({ isOpened: false, title: '', button: '' });

  // auth
  const handleSignup = (name, email, password) =>
    mainApi
      .signup(name, email, password)
      .then(
        (res) =>
          res &&
          mainApi
            .signin(email, password)
            .then((res) => res.token && localStorage.setItem('token', `${res.token}`))
            .then(() => setIsLoggedIn(!isLoggedIn))
            .catch((err) => {
              err === 401 && setPopupState(POPUP_STATES.login.err401);
              err === 500 && setPopupState(POPUP_STATES.login.err500);
            })
      )
      .catch((err) => {
        err === 400 && setPopupState(POPUP_STATES.register.err400);
        err === 409 && setPopupState(POPUP_STATES.register.err409);
        err === 500 && setPopupState(POPUP_STATES.register.err500);
      });

  const handleSignin = (email, password) =>
    mainApi
      .signin(email, password)
      .then((res) => res.token && localStorage.setItem('token', `${res.token}`))
      .then(() => setIsLoggedIn(!isLoggedIn))
      .catch((err) => {
        err === 401 && setPopupState(POPUP_STATES.login.err401);
        err === 500 && setPopupState(POPUP_STATES.login.err500);
      });

  const handleSignout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(!isLoggedIn);
    nav('/');
  };

  const checkTokenValidity = () =>
    mainApi
      .checkTokenValidity(localStorage.getItem('token'))
      .then((res) => res && setUser(res))
      .then(() => !isLoggedIn && setIsLoggedIn(!isLoggedIn))
      .then(() => nav('/movies'))
      .then(() => setPopupState(POPUP_STATES.tokenValidity.success))
      .catch((err) => err === 401 && setPopupState(POPUP_STATES.tokenValidity.err401));

  const handleUpdateUserInfo = (name, email, resetState) =>
    mainApi
      .updateUser(name, email, localStorage.getItem('token'))
      .then((res) => res && setUser(res))
      .then(() => resetState())
      .then(() => setPopupState(POPUP_STATES.profile.success))
      .catch((err) => {
        err === 409 && setPopupState(POPUP_STATES.profile.err409);
        err === 500 && setPopupState(POPUP_STATES.profile.err500);
      });

  useEffect(() => {
    checkTokenValidity();
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ isLoggedIn, user }}>
      <div className="app">
        {headerIsRendered && <Header mix="app__header" />}
        <Routes>
          <Route path="*" element={<NotFound mix="app__not-found" />} />
          <Route path="/" element={<Main mix="app__main" />} />
          <Route path="/signup" element={<Register mix="app__register" handleSignup={handleSignup} />} />
          <Route path="/signin" element={<Login mix="app__login" handleSignin={handleSignin} />} />

          <Route path="/movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Movies mix="app__movies" />} />} />
          <Route
            path="/saved-movies"
            element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<SavedMovies mix="app__saved-movies" />} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={<Profile mix="app__profile" handleSignout={handleSignout} handleUpdateUserInfo={handleUpdateUserInfo} />}
              />
            }
          />
        </Routes>
        {footerIsRendered && <Footer mix="app__footer" />}

        <InfoPopup mix="app__info-popup" popupState={popupState} setPopupState={setPopupState} />
      </div>
    </UserContext.Provider>
  );
};

export default App;
