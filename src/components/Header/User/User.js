import { Link, useLocation } from 'react-router-dom';
import UserContext from '../../../contexts/UserContext';
import useWidth from '../../../utils/customHooks/useWidth';

import './User.css';
import userIcon from '../../../images/user-icon.svg';

const User = ({ mix }) => {
  const viewportWidth = useWidth();
  const location = useLocation();

  return (
    <div className={`${mix} user`}>
      <UserContext.Consumer>
        {(userState) => (
          <span className="user__email" children={userState.email} />
        )}
      </UserContext.Consumer>
      <Link
        className={
          location.pathname === '/'
            ? `user__link ${viewportWidth > 800 && `user__link_main`}`
            : 'user__link'
        }
        to="/profile"
        children={
          <img
            className="user__image"
            src={userIcon}
            alt="Иконка пользователя"
          />
        }
      />
    </div>
  );
};

export default User;
