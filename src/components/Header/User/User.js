import { Link, useLocation } from 'react-router-dom';
import useWidth from '../../../utils/customHooks/useWidth';
import './User.css';
import userIcon from '../../../images/user-icon.svg';
import AppContext from '../../../contexts/AppContext';

const User = ({ mix }) => {
  // * HOOKS
  const viewportWidth = useWidth();
  const location = useLocation();
  return (
    <div className={`${mix} user`}>
      <AppContext.Consumer>
        {({ userState }) => <span className='user__email' children={userState.email} />}
      </AppContext.Consumer>
      <Link
        className={
          location.pathname === '/'
            ? `user__link ${viewportWidth > 800 && `user__link_main`}`
            : 'user__link'
        }
        to='/profile'
        children={<img className='user__image' src={userIcon} alt='Иконка пользователя' />}
      />
    </div>
  );
};

export default User;
