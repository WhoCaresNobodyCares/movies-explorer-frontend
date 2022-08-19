import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserContext from '../../../contexts/UserContext';
import userIcon from '../../../images/user-icon.svg';
import useWidth from '../../../utils/customHooks/useWidth';
import './User.css';

const User = ({ mix }) => {
  const location = useLocation().pathname
  const viewport = useWidth()
  const {user} = useContext(UserContext);

  return (
    <div className={`${mix} user`}>
      <span className="user__email" children={user.name} />
      <Link
        className={location === '/' ? `user__link ${viewport > 800 && `user__link_main`}` : 'user__link'}
        to="/profile"
        children={<img className="user__image" src={userIcon} alt="Иконка пользователя" />}
      />
    </div>
  );
};

export default User;
