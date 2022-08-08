import { Link } from 'react-router-dom';
import './Authorization.css';
import { authorizationLinks } from '../../../variables/headerVariables';

const Authorization = ({ mix }) => {
  return (
    <nav
      className={`${mix} authorization`}
      children={authorizationLinks.map((item) => (
        <Link to={item.to} className={item.className} key={item.key} children={item.text} />
      ))}
    />
  );
};

export default Authorization;
