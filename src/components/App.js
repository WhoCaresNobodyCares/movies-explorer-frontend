import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import mainApi from '../apis/MainApi';
import UserContext from '../contexts/UserContext';
import useAllowedPaths from '../utils/customHooks/useAllowedPaths';
import './App.css';
import { popupContent, popupSignupErrors, popupSigninErrors, popupUpdateUserErrors } from '../variables/appVariables';

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

const App = () => {
  const nav = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});

  const [headerIsRendered] = useAllowedPaths(['/', '/movies', '/saved-movies', '/profile', '/signin', '/signup']);
  const [footerIsRendered] = useAllowedPaths(['/', '/movies', '/saved-movies']);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      mainApi.checkValidity(localStorage.getItem('token')).then((res) => {
        res && setUser(res);
        res && setIsLoggedIn(true);
        nav('/movies');
        setPopupInfo(popupContent[2]);
        setPopupIsOpened(true);
      });
    }
  }, [isLoggedIn]);

  const handleSignup = (name, email, password) => {
    mainApi
      .signup(name, email, password)
      .then((res) => {
        setPopupInfo(popupContent[0]);
        setPopupIsOpened(true);
      })
      .then((res) => nav('/signin'))
      .catch((err) => {
        if (err === 409) {
          setPopupInfo(popupSignupErrors[0]);
          setPopupIsOpened(true);
        }
        if (err === 500) {
          setPopupInfo(popupSignupErrors[1]);
          setPopupIsOpened(true);
        }
      });
  };

  const handleSignin = (email, password) => {
    mainApi
      .signin(email, password)
      .then((res) => {
        res.token && localStorage.setItem('token', `${res.token}`);
      })
      .then((res) => {
        setIsLoggedIn(true);
        setPopupInfo(popupContent[1]);
        setPopupIsOpened(true);
      })
      .catch((err) => {
        if (err === 401) {
          setPopupInfo(popupSigninErrors[0]);
          setPopupIsOpened(true);
        }
        if (err === 500) {
          setPopupInfo(popupSigninErrors[1]);
          setPopupIsOpened(true);
        }
      });
  };

  const handleSignout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('movies-state')
    setIsLoggedIn(false);
    nav('/');
  };

  const handleUpdateUser = ({ name, email }, setEditMode) => {
    mainApi
      .updateUser(name, email, localStorage.getItem('token'))
      .then((res) => setUser(res))
      .then((res) => {
        setEditMode(false);
        setPopupInfo(popupContent[3]);
        setPopupIsOpened(true);
      })
      .catch((err) => {
        if (err === 409) {
          setPopupInfo(popupUpdateUserErrors[0]);
          setPopupIsOpened(true);
        }
        if (err === 500) {
          setPopupInfo(popupUpdateUserErrors[1]);
          setPopupIsOpened(true);
        }
      });
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, user }}>
      <div className="app">
        {headerIsRendered && <Header mix="app__header" />}
        <Routes>
          <Route path="*" element={<NotFound mix="app__not-found" />} />
          <Route path="/" element={<Main mix="app__main" />} />
          <Route path="/signup" element={<Register mix="app__register" handleSignup={handleSignup} />} />
          <Route path="/signin" element={<Login mix="app__login" handleSignin={handleSignin} />} />
          <Route path="/movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Movies mix="app__movies" setPopupIsOpened={setPopupIsOpened} setPopupInfo={setPopupInfo} />} />} />
          <Route
            path="/saved-movies"
            element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<SavedMovies mix="app__saved-movies" setPopupIsOpened={setPopupIsOpened} setPopupInfo={setPopupInfo} />} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={<Profile mix="app__profile" handleUpdateUser={handleUpdateUser} handleSignout={handleSignout} />}
              />
            }
          />
        </Routes>
        {footerIsRendered && <Footer mix="app__footer" />}

        <InfoPopup mix="app__info-popup" popupIsOpened={popupIsOpened} setPopupIsOpened={setPopupIsOpened} popupInfo={popupInfo} />
      </div>
    </UserContext.Provider>
  );
};

export default App;
