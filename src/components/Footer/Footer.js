import { Route, Routes } from 'react-router-dom';

import './Footer.css';

const Footer = ({ mix }) => {
  const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

  const footer = (
    <footer className={`${mix} footer`}>
      <div className="footer__grid">
        <span
          className="footer__description"
          children={CONTENT_CONFIG.Footer.description}
        />
        <div className="footer__separator" />
        <div className="footer__bottom">
          <span
            className="footer__date"
            children={<>&#169; {new Date().getFullYear()}</>}
          />
          {CONTENT_CONFIG.Footer.links.map((item) => (
            <a
              className="footer__link"
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              key={item.key}
              children={item.text}
            />
          ))}
        </div>
      </div>
    </footer>
  );

  return (
    <Routes>
      <Route path="/" element={footer} />
      <Route path="/movies" element={footer} />
      <Route path="/saved-movies" element={footer} />
    </Routes>
  );
};

export default Footer;
