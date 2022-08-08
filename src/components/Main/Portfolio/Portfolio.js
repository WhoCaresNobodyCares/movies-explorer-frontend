import { portfolioContent, portfolioContentTitle } from '../../../variables/mainVariables';
import BottomLink from '../BottomLink/BottomLink';
import './Portfolio.css';

const Portfolio = ({ mix }) => {
  return (
    <section
      id="portfolio"
      className={`${mix} portfolio`}
      children={
        <>
          <h2 className="portfolio__title" children={portfolioContentTitle} />
          {portfolioContent.map((item) => (
            <BottomLink mix="portfolio__bottom-link" href={item.href} text={item.text} key={item.key} />
          ))}
        </>
      }
    />
  );
};

export default Portfolio;
