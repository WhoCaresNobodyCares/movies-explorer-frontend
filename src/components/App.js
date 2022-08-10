import { Routes, Route } from 'react-router-dom';

import './App.css';

import useAllowedPaths from '../utils/customHooks/useAllowedPaths';

import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Profile from './Profile/Profile';
import Register from './Register/Register';
import Login from './Login/Login';
import NotFound from './NotFound/NotFound';

const App = () => {
  const [headerIsRendered] = useAllowedPaths(['/', '/movies', '/saved-movies', '/profile', '/signin', '/signup']);
  const [footerIsRendered] = useAllowedPaths(['/', '/movies', '/saved-movies']);

  return (
    <div
      className="app"
      children={
        <>
          {headerIsRendered && <Header mix="app__header" mod_narrow="app__header_narrow" mod_blue="app__header_blue" />}
          <Routes
            children={
              <>
                <Route path="*" element={<NotFound mix="app__not-found" />} />
                <Route path="/" element={<Main mix="app__main" />} />
                <Route path="/movies" element={<Movies mix="app__movies" />} />
                <Route path="/saved-movies" element={<SavedMovies mix="app__saved-movies" />} />
                <Route path="/profile" element={<Profile mix="app__profile" />} />
                <Route path="/signup" element={<Register mix="app__register" />} />
                <Route path="/signin" element={<Login mix="app__login" />} />
              </>
            }
          />
          {footerIsRendered && <Footer mix="app__footer" />}
        </>
      }
    />
  );
};

export default App;
