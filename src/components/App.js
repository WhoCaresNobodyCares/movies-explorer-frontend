import { Routes, Route } from 'react-router-dom';
import useAllowedPaths from '../utils/customHooks/useAllowedPaths';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Movies from './Movies/Movies';

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
                <Route path="/" element={<Main mix="app__main" />} />
                <Route path="/movies" element={<Movies mix="app__main" />} />
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
