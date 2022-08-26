import { Link } from 'react-router-dom';

import './User.css';
import userIcon from '../../../images/user-icon.svg';

import UserContext from '../../../contexts/UserContext';

const User = ({ mix, location, isDesktopLayout }) => (
  <div className={`${mix} user`}>
    <UserContext.Consumer>
      {userState => <span className='user__email' children={userState.userData.email} />}
    </UserContext.Consumer>
    <Link
      className={
        location.pathname === '/'
          ? `user__link ${isDesktopLayout && `user__link_main`}`
          : 'user__link'
      }
      to='/profile'
      children={<img className='user__image' src={userIcon} alt='Иконка пользователя' />}
    />
  </div>
);

export default User;
