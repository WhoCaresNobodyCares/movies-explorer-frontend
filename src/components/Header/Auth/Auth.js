import { Link } from 'react-router-dom';

import './Auth.css';

const Auth = ({ mix }) => {
  const { CONTENT_CONFIG } = require('../../../configs/contentConfig.json');

  return (
    <nav
      className={`${mix} auth`}
      children={CONTENT_CONFIG.Header.auth.links.map((item) => (
        <Link
          className={item.className}
          to={item.to}
          key={item.key}
          children={item.text}
        />
      ))}
    />
  );
};

export default Auth;
