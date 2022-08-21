import { Link } from 'react-router-dom';
import './User.css';
import userIcon from '../../../images/user-icon.svg';
import AppContext from '../../../contexts/AppContext';
import { useContext } from 'react';

const User = ({ mix }) => {
	const { location, viewportWidth } = useContext(AppContext);

	console.log(location);

	return (
		<div className={`${mix} user`}>
			<span className="user__email" children={'test@gmail.com'} />
			<Link
				className={
					location.pathname === '/'
						? `user__link ${viewportWidth > 800 && `user__link_main`}`
						: 'user__link'
				}
				to="/profile"
				children={<img className="user__image" src={userIcon} alt="Иконка пользователя" />}
			/>
		</div>
	);
};

export default User;
