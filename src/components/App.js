import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import UserContext from '../contexts/UserContext';
import AppContext from '../contexts/AppContext';
import useUser from '../utils/customHooks/useUser';
import useMovies from '../utils/customHooks/useMovies';

const App = () => {
	const isMounted = useRef(false);
	const location = useLocation().pathname;
	const [popupState, setPopupState] = useState({
		isOpened: false,
		title: '',
		button: '',
	});

	const [headerIsRendered] = useAllowedPaths([
		'/',
		'/movies',
		'/saved-movies',
		'/profile',
		'/signin',
		'/signup',
	]);
	const [footerIsRendered] = useAllowedPaths(['/', '/movies', '/saved-movies']);

	// !!! Logic
	const {
		isLoggedIn,
		user,
		handleSignup,
		handleSignin,
		handleSignout,
		checkTokenValidity,
		handleUpdateUserInfo,
	} = useUser(setPopupState);
	const {
		isPreloaderVisible,
		renderedCards,
		render,
		searchMoviesInitially,
		searchMovies,
		getSavedMovies,
		searchSavedMovies,
		submitOnCheck,
		saveMovie,
	} = useMovies(setPopupState);

	useEffect(() => {
		checkTokenValidity();
		if (isMounted.current === true) {
		} else {
			getSavedMovies();
			isMounted.current = true;
		}
	}, [isLoggedIn]);

	useEffect(() => {
		location === '/movies' && JSON.parse(localStorage.getItem('movies-state'))
			? render(JSON.parse(localStorage.getItem('movies-state')).cards)
			: location === '/saved-movies' &&
			  JSON.parse(localStorage.getItem('saved-movies-state'))
			? render([])
			: render([]);
	}, [location]);

	return (
		<UserContext.Provider value={{ isLoggedIn, user }}>
			<AppContext.Provider
				value={{
					searchMoviesInitially,
					isPreloaderVisible,
					renderedCards,
					setPopupState,
					submitOnCheck,
					searchSavedMovies,
					searchMovies,
					getSavedMovies,
					saveMovie,
				}}
			>
				<div className="app">
					{headerIsRendered && <Header mix="app__header" />}
					<Routes>
						<Route path="*" element={<NotFound mix="app__not-found" />} />
						<Route path="/" element={<Main mix="app__main" />} />
						<Route
							path="/signup"
							element={
								<Register mix="app__register" handleSignup={handleSignup} />
							}
						/>
						<Route
							path="/signin"
							element={<Login mix="app__login" handleSignin={handleSignin} />}
						/>

						<Route
							path="/movies"
							element={
								<ProtectedRoute
									isLoggedIn={isLoggedIn}
									element={<Movies mix="app__movies" />}
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
								<ProtectedRoute
									isLoggedIn={isLoggedIn}
									element={
										<Profile
											mix="app__profile"
											handleSignout={handleSignout}
											handleUpdateUserInfo={handleUpdateUserInfo}
										/>
									}
								/>
							}
						/>
					</Routes>
					{footerIsRendered && <Footer mix="app__footer" />}

					<InfoPopup
						mix="app__info-popup"
						popupState={popupState}
						setPopupState={setPopupState}
					/>
				</div>
			</AppContext.Provider>
		</UserContext.Provider>
	);
};

export default App;
