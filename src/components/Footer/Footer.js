import './Footer.css';

const Footer = ({ mix }) => {
  const linksContent = [
    { href: 'https://practicum.yandex.ru/', text: 'Яндекс.Практикум', key: 'yandex' },
    { href: 'https://github.com/', text: 'Github', key: 'github' },
    { href: 'https://github.com/', text: 'Facebook', key: 'facebook' },
  ];

  return (
    <footer
      className={`${mix} footer`}
      children={
        <>
          <span className="footer__description" children={<>Учебный проект Яндекс.Практикум х&nbsp;BeatFilm</>} />
          <div
            className="footer__bottom"
            children={
              <>
                <span className="footer__date" children={<>&#169; {new Date().getFullYear()}</>} />
                {linksContent.map((item) => (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="footer__link"
                    key={item.key}
                    children={item.text}
                  />
                ))}
              </>
            }
          />
        </>
      }
    />
  );
};

export default Footer;
