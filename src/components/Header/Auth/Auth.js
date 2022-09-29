import { Link } from 'react-router-dom';
import './Auth.css';
const { CONTENT_CONFIG } = require('../../../configs/contentConfig.json');

const Auth = () => (
  <nav
    className='auth'
    children={CONTENT_CONFIG.Header.auth.links.map(item => (
      <Link
        className={item.className}
        to={item.to}
        key={item.key}
        children={item.text}
      />
    ))}
  />
);

export default Auth;
