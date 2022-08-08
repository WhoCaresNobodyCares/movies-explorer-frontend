import { Link } from 'react-router-dom';
import './User.css';
import userIcon from '../../../images/user-icon.svg';

const User = ({ mix }) => {
  return (
    <div
      className={`${mix} user`}
      children={
        <>
          <span className="user__email" children={'test@gmail.com'} />
          <Link to="/profile" className="user__link" children={<img src={userIcon} alt="Иконка пользователя" className="user__icon" />} />
        </>
      }
    />
  );
};

export default User;
