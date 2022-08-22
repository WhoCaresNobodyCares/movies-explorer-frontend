import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

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
// import InfoPopup from './InfoPopup/InfoPopup';

import useFormValidation from '../../utils/customHooks/useFormValidation';

// const [isMenuOpened, setIsMenuOpened] = useState(false);
// const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
// const [isSubmitButtonDefault, setIsSubmitButtonDefault] = useState(false);

// const [isProfileEditMode, setIsProfileEditMode] = useState(false);
// const [isProfileNameSame, setIsProfileNameSame] = useState(false);
// const [isProfileEmailSame, setIsProfileEmailSame] = useState(false);

const App = () => {
  // hooks
  const location = useLocation();

  // customHooks
  const { resetForm } = useFormValidation();

  // useState
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [popupState, setPopupState] = useState({
    isOpened: false,
    title: '',
    button: '',
  });

  useEffect(() => {
    resetForm();
  }, [location, resetForm]);

  return (
    <div className="app">
      <Header mix="app__header" isLoggedIn={isLoggedIn} location={location} />
      <Routes>
        <Route path="*" element={<NotFound mix="app__not-found" />} />
        <Route path="/" element={<Main mix="app__main" />} />

        <Route path="/signup" element={<Register mix="app__register" />} />
        <Route path="/signin" element={<Login mix="app__login" />} />

        <Route
          path="/movies"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={<Movies mix="app__movies" path="/movies" />}
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
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<Profile mix="app__profile" />} />
          }
        />
      </Routes>
      <Footer mix="app__footer" />

      {/* <InfoPopup mix="app__info-popup" popupState={popupState} setPopupState={setPopupState} /> */}
    </div>
  );
};

export default App;
