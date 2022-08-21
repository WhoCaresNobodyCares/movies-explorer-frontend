import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import useAllowedPaths from '../utils/customHooks/useAllowedPaths';
import AppContext from '../contexts/AppContext';
import useWidth from '../utils/customHooks/useWidth';

const App = () => {
	// configs
	const { ALLOWED_PATHS_CONFIG } = require('../configs/allowedPathsConfig.json');

	// hooks
	const location = useLocation();
	const navigate = useNavigate();
	const viewportWidth = useWidth();
	const { allowedPaths, handlePathChange } = useAllowedPaths(location.pathname);

	// states
	const [menuIsOpened, setMenuIsOpened] = useState(false);
	const [isProfileEditMode, setIsProfileEditMode] = useState(false);

	useEffect(() => handlePathChange(ALLOWED_PATHS_CONFIG), [location]);

	return (
		<AppContext.Provider
			value={{
				location,
				navigate,
				viewportWidth,
				allowedPaths,
				menuIsOpened,
				setMenuIsOpened,
				isProfileEditMode,
				setIsProfileEditMode,
			}}
		>
			<div className="app">
				{allowedPaths.header && <Header mix="app__header" />}
				<Routes>
					<Route path="*" element={<NotFound mix="app__not-found" />} />
					<Route path="/" element={<Main mix="app__main" />} />
					<Route path="/movies" element={<Movies mix="app__movies" />} />
					<Route path="/saved-movies" element={<SavedMovies mix="app__saved-movies" />} />
					<Route path="/profile" element={<Profile mix="app__profile" />} />
					<Route path="/signup" element={<Register mix="app__register" />} />
					<Route path="/signin" element={<Login mix="app__login" />} />
				</Routes>
				{allowedPaths.footer && <Footer mix="app__footer" />}
			</div>
		</AppContext.Provider>
	);
};

export default App;
