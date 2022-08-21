import { Link } from 'react-router-dom';
import './Auth.css';

const Auth = ({ mix }) => {
	const { HEADER_CONFIG } = require('../../../configs/headerConfig.json');

	return (
		<nav
			className={`${mix} auth`}
			children={HEADER_CONFIG.auth.links.map((item) => (
				<Link className={item.className} to={item.to} key={item.key} children={item.text} />
			))}
		/>
	);
};

export default Auth;
