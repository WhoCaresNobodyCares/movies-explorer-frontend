import { Link } from 'react-router-dom';

import './Auth.css';

const Auth = ({ mix }) => {
	const authLinks = [
		{
			to: '/signup',
			text: 'Регистрация',
			className: 'auth__link',
			key: 'auth__link_1',
		},
		{
			to: '/signin',
			text: 'Войти',
			className: 'auth__link auth__link_button',
			key: 'auth__link_2',
		},
	];

	return (
		<nav
			className={`${mix} auth`}
			children={authLinks.map((item) => (
				<Link
					className={item.className}
					to={item.to}
					key={item.key}
					children={item.text}
				/>
			))}
		/>
	);
};

export default Auth;
