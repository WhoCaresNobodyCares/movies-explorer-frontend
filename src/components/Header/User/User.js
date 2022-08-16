import { Link, useLocation } from 'react-router-dom';
import useWidth from '../../../utils/customHooks/useWidth';

import './User.css';

import userIcon from '../../../images/user-icon.svg';

const User = ({ mix, userContext }) => {
  const viewport = useWidth();
  const location = useLocation().pathname;

  return (
    <div className={`${mix} user`}>
      <span className="user__email" children={userContext.user.name} />
      <Link
        className={location === '/' ? `user__link ${viewport > 800 && `user__link_main`}` : 'user__link'}
        to="/profile"
        children={<img className="user__image" src={userIcon} alt="Иконка пользователя" />}
      />
    </div>
  );
};

export default User;
