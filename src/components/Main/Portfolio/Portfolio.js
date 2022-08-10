import BottomLink from '../BottomLink/BottomLink';
import './Portfolio.css';

const Portfolio = ({ mix }) => {
  const portfolioContent = [
    { href: 'https://github.com/WhoCaresNobodyCares/how-to-learn', text: 'Статичный сайт', key: 'static-website' },
    { href: 'https://github.com/WhoCaresNobodyCares/russian-travel', text: 'Адаптивный сайт', key: 'adaptive-website' },
    { href: 'https://github.com/WhoCaresNobodyCares/react-mesto-auth', text: 'Одностраничное приложение', key: 'single-page-application' },
  ];

  return (
    <section
      id="portfolio"
      className={`${mix} portfolio`}
      children={
        <>
          <h2 className="portfolio__title" children={<>Портфолио</>} />
          {portfolioContent.map((item) => (
            <BottomLink mix="portfolio__bottom-link" href={item.href} text={item.text} key={item.key} />
          ))}
        </>
      }
    />
  );
};

export default Portfolio;
