import { Route, Routes } from 'react-router-dom';

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
    <div className="app">
      {headerIsRendered && <Header mix="app__header" />}
      <Routes>
        <Route path="/" element={<Main mix="app__main" />} />
        <Route path="/movies" element={<Movies mix="app__movies" />} />
      </Routes>
      {footerIsRendered && <Footer mix="app__footer" />}
    </div>
  );
};

export default App;
