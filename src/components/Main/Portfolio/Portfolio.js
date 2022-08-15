import './Portfolio.css';

import arrowIcon from '../../../images/arrow-icon.svg';

const Portfolio = ({ mix }) => {
  const links = [
    { href: 'https://github.com/WhoCaresNobodyCares/how-to-learn', text: 'Статичный сайт', key: 'portfolio__link-wrap_1' },
    { href: 'https://github.com/WhoCaresNobodyCares/russian-travel', text: 'Адаптивный сайт', key: 'portfolio__link-wrap_2' },
    { href: 'https://github.com/WhoCaresNobodyCares/react-mesto-auth', text: 'Одностраничное приложение', key: 'portfolio__link-wrap_3' },
  ];

  return (
    <section className={`${mix} portfolio`}>
      <h2 className="portfolio__title" children={<>Портфолио</>} />
      <div className="portfolio__links">
        {links.map((item, index) => (
          <div
            className="portfolio__link-wrap"
            key={item.key}
            children={
              <>
                <a
                  className={index === 2 ? 'portfolio__link portfolio__link_no-margin' : 'portfolio__link'}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  children={
                    <>
                      {item.text}
                      <img className="portfolio__icon" src={arrowIcon} alt="Иконка стрелки" />
                    </>
                  }
                />
                {index < 2 && <div className="portfolio__separator" />}
              </>
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
