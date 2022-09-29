import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
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
import mainApi from '../../utils/apis/MainApi';
const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const App = () => {
  const navigate = useNavigate();

  const [popupState, setPopupState] = useState({
    isOpened: false,
    title: '',
    button: '',
  });
  const [userState, setUserState] = useState({
    isLoggedIn: false,
    userData: { name: '', email: '' },
  });

  const handleSignup = (e, name, email, password, setApiError) => {
    e.preventDefault();
    mainApi
      .signup(name, email, password)
      .then(() =>
        mainApi
          .signin(email, password)
          .then(
            res => res.token && localStorage.setItem('token', `${res.token}`)
          )
          .then(() => setUserState({ ...userState, isLoggedIn: true }))
          .then(() => navigate('/movies'))
          .then(() => setPopupState(CONTENT_CONFIG.InfoPopup.register.success))
          .catch(err => {
            throw err;
          })
      )
      .catch(err => {
        err.status === 400 && setApiError(CONTENT_CONFIG.Register.err400);
        err.status === 401 && setApiError(CONTENT_CONFIG.Register.err401);
        err.status === 409 && setApiError(CONTENT_CONFIG.Register.err409);
        err.status === 500 && setApiError(CONTENT_CONFIG.Register.err500);
      });
  };

  const handleSignin = (e, email, password, setApiError) => {
    e.preventDefault();
    mainApi
      .signin(email, password)
      .then(res => res.token && localStorage.setItem('token', `${res.token}`))
      .then(() => setUserState({ ...userState, isLoggedIn: true }))
      .then(() => navigate('/movies'))
      .then(() => setPopupState(CONTENT_CONFIG.InfoPopup.login.success))
      .catch(err => {
        err.status === 401 && setApiError(CONTENT_CONFIG.Login.err401);
        err.status === 500 && setApiError(CONTENT_CONFIG.Login.err500);
      });
  };

  const handleProfileUpdate = (e, name, email, dispatch, setApiError) => {
    e.preventDefault();
    mainApi
      .updateUser(name, email, localStorage.getItem('token'))
      .then(() => setUserState({ ...userState, userData: { name, email } }))
      .then(() => setPopupState(CONTENT_CONFIG.InfoPopup.profile.success))
      .then(() => dispatch({ type: 'RESET_PROFILE' }))
      .catch(err => {
        err.status === 409 && setApiError(CONTENT_CONFIG.Profile.err409);
        err.status === 500 && setApiError(CONTENT_CONFIG.Profile.err500);
      });
  };

  const handleSignout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('moviesState');
    localStorage.removeItem('moviesSearchState');
    localStorage.removeItem('savedMoviesState');
    localStorage.removeItem('savedMoviesSearchState');
    setUserState({ isLoggedIn: false, userData: { name: '', email: '' } });
    navigate('/');
  };

  useEffect(() => {
    mainApi
      .checkValidity(localStorage.getItem('token'))
      .then(({ name, email }) =>
        setUserState({
          isLoggedIn: true,
          userData: { name: name, email: email },
        })
      )
      .then(() => navigate('/movies'))
      .catch(
        err =>
          err.status === 401 &&
          setPopupState(CONTENT_CONFIG.InfoPopup.tokenValidity.err401)
      );
  }, [userState.isLoggedIn]);

  return (
    <UserContext.Provider value={userState}>
      <div className='app'>
        <Header mix='app__header' />
        <Routes>
          <Route path='/' element={<Main mix='app__main' />} />
          <Route
            path='/signup'
            element={
              <Register mix='app__register' handleSignup={handleSignup} />
            }
          />
          <Route
            path='/signin'
            element={<Login mix='app__login' handleSignin={handleSignin} />}
          />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                isLoggedIn={userState.isLoggedIn}
                element={
                  <Movies mix='app__movies' setPopupState={setPopupState} />
                }
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                isLoggedIn={userState.isLoggedIn}
                element={
                  <SavedMovies
                    mix='app__saved-movies'
                    setPopupState={setPopupState}
                  />
                }
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                isLoggedIn={userState.isLoggedIn}
                element={
                  <Profile
                    mix='app__profile'
                    handleProfileUpdate={handleProfileUpdate}
                    handleSignout={handleSignout}
                  />
                }
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer mix='app__footer' />
        <InfoPopup
          mix='app__info-popup'
          popupState={popupState}
          setPopupState={setPopupState}
        />
      </div>
    </UserContext.Provider>
  );
};

export default App;
