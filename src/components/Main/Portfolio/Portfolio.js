import './Portfolio.css';
import arrowIcon from '../../../images/arrow-icon.svg';

const Portfolio = ({ mix }) => {
  const { CONTENT_CONFIG } = require('../../../configs/contentConfig.json');

  return (
    <section className={`${mix} portfolio`}>
      <h2 className="portfolio__title" children={CONTENT_CONFIG.Main.portfolio.title} />
      <div className="portfolio__links">
        {CONTENT_CONFIG.Main.portfolio.links.map((item, index) => (
          <div
            className="portfolio__link-wrap"
            key={item.key}
            children={
              <>
                <a
                  className={
                    index === 2 ? 'portfolio__link portfolio__link_no-margin' : 'portfolio__link'
                  }
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
