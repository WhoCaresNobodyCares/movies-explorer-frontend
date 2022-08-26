import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

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

import UserContext from '../../contexts/UserContext';

const App = () => {
  // * HOOKS

  // * STATES
  const [popupState, setPopupState] = useState({ isOpened: true, title: '', button: '' });
  const [userState, setUserState] = useState({
    isLoggedIn: false,
    userData: { name: 'test', email: 'test@gmail.com' },
  });

  // * LOGIC

  // * EFFECTS

  return (
    <UserContext.Provider value={userState}>
      <div className='app'>
        <Header mix='app__header' userState={userState} />
        <Routes>
          <Route path='/' element={<Main mix='app__main' />} />
          <Route path='/signup' element={<Register mix='app__register' />} />
          <Route path='/signin' element={<Login mix='app__login' />} />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                isLoggedIn={userState.isLoggedIn}
                element={<Movies mix='app__movies' />}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                isLoggedIn={userState.isLoggedIn}
                element={<SavedMovies mix='app__saved-movies' />}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                isLoggedIn={userState.isLoggedIn}
                element={<Profile mix='app__profile' userState={userState} />} // !!!
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer mix='app__footer' />
        <InfoPopup
          mix='app__info-popup'
          userState={userState}
          popupState={popupState}
          setPopupState={setPopupState}
        />
      </div>
    </UserContext.Provider>
  );
};

export default App;
