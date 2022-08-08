import { cardsContent, techsContentTitle, techsParagraph, techsTitle } from '../../../variables/mainVariables';
import ContentTitle from '../ContentTitle/ContentTitle';
import './Techs.css';

const Techs = ({ mix }) => {
  return (
    <section
      id="techs"
      className={`${mix} techs`}
      children={
        <>
          <ContentTitle mix="techs__content-title" title={techsContentTitle} />
          <h3 className="techs__title" children={techsTitle} />
          <p className="techs__paragraph" children={techsParagraph} />
          <div
            className="techs__cards"
            children={cardsContent.map((item) => (
              <span className="techs__cards-item" children={item.text} key={item.key} />
            ))}
          />
        </>
      }
    />
  );
};

export default Techs;
