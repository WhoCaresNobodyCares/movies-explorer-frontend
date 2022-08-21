import { Link } from 'react-router-dom';
import './User.css';
import userIcon from '../../../images/user-icon.svg';

const User = ({ mix }) => {
	return (
		<div className={`${mix} user`}>
			<span className="user__email" children={'test@gmail.com'} />
			<Link
				className="user__link"
				to="/profile"
				children={<img className="user__image" src={userIcon} alt="Иконка пользователя" />}
			/>
		</div>
	);
};

export default User;
