// !!! REACT AND HOOKS
import { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import useWidth from '../../utils/customHooks/useWidth';
import useFormValidator from '../../utils/customHooks/useFormValidator';

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
// import InfoPopup from './InfoPopup/InfoPopup';

const App = () => {
  // * HOOKS
  const location = useLocation();
  const navigate = useNavigate();
  const viewportWidth = useWidth();
  const formValidator = useFormValidator();

  // * STATES
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [popupState, setPopupState] = useState({ isOpened: false, title: '', button: '' });

  // * EFFECTS

  return (
    <div className="app">
      <Header mix="app__header" isLoggedIn={isLoggedIn} location={location} viewportWidth={viewportWidth} />
      <Routes>
        <Route path="/" element={<Main mix="app__main" viewportWidth={viewportWidth} />} />

        <Route path="/signup" element={<Register mix="app__register" formValidator={formValidator} />} />
        <Route path="/signin" element={<Login mix="app__login" formValidator={formValidator} />} />

        <Route path="/movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Movies mix="app__movies" viewportWidth={viewportWidth} />} />} />
        <Route path="/saved-movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<SavedMovies mix="app__saved-movies" viewportWidth={viewportWidth} />} />} />
        <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<Profile mix="app__profile" formValidator={formValidator} />} />} />

        <Route path="*" element={<NotFound mix="app__not-found" navigate={navigate} />} />
      </Routes>
      <Footer mix="app__footer" />

      {/* <InfoPopup mix="app__info-popup" popupState={popupState} setPopupState={setPopupState} /> */}
    </div>
  );
};

export default App;
