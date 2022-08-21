import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainApi from '../../apis/MainApi';
const { POPUP_STATES } = require('../../configs/popupConfig.json');

const useUser = (setPopupState) => {
	const nav = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({});

	const handleSignup = (name, email, password) =>
		mainApi
			.signup(name, email, password)
			.then(
				(res) =>
					res &&
					mainApi
						.signin(email, password)
						.then(
							(res) =>
								res.token && localStorage.setItem('token', `${res.token}`),
						)
						.then(() => setIsLoggedIn(!isLoggedIn))
						.catch((err) => {
							err === 401 && setPopupState(POPUP_STATES.login.err401);
							err === 500 && setPopupState(POPUP_STATES.login.err500);
						}),
			)
			.catch((err) => {
				err === 400 && setPopupState(POPUP_STATES.register.err400);
				err === 409 && setPopupState(POPUP_STATES.register.err409);
				err === 500 && setPopupState(POPUP_STATES.register.err500);
			});

	const handleSignin = (email, password) =>
		mainApi
			.signin(email, password)
			.then((res) => res.token && localStorage.setItem('token', `${res.token}`))
			.then(() => setIsLoggedIn(!isLoggedIn))
			.catch((err) => {
				err === 401 && setPopupState(POPUP_STATES.login.err401);
				err === 500 && setPopupState(POPUP_STATES.login.err500);
			});

	const handleSignout = () => {
		localStorage.removeItem('token');
		setIsLoggedIn(!isLoggedIn);
		nav('/');
	};

	const checkTokenValidity = () =>
		mainApi
			.checkTokenValidity(localStorage.getItem('token'))
			.then((res) => res && setUser(res))
			.then(() => !isLoggedIn && setIsLoggedIn(!isLoggedIn))
			.then(() => nav('/movies'))
			.then(() => setPopupState(POPUP_STATES.tokenValidity.success))
			.catch(
				(err) =>
					err === 401 && setPopupState(POPUP_STATES.tokenValidity.err401),
			);

	const handleUpdateUserInfo = (name, email, resetState) =>
		mainApi
			.updateUser(name, email, localStorage.getItem('token'))
			.then((res) => res && setUser(res))
			.then(() => resetState())
			.then(() => setPopupState(POPUP_STATES.profile.success))
			.catch((err) => {
				err === 409 && setPopupState(POPUP_STATES.profile.err409);
				err === 500 && setPopupState(POPUP_STATES.profile.err500);
			});

	return {
		isLoggedIn,
		user,
		handleSignup,
		handleSignin,
		handleSignout,
		checkTokenValidity,
		handleUpdateUserInfo,
	};
};

export default useUser;
