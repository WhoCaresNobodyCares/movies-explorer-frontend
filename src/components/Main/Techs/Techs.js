import ContentTitle from '../ContentTitle/ContentTitle';
import './Techs.css';

const Techs = ({ mix }) => {
  const cardsContent = [
    { text: 'HTML', key: 'HTML-key' },
    { text: 'CSS', key: 'CSS-key' },
    { text: 'JS', key: 'JS-key' },
    { text: 'React', key: 'React-key' },
    { text: 'Git', key: 'Git-key' },
    { text: 'Express.js', key: 'Express.js-key' },
    { text: 'mongoDB', key: 'mongoDB-key' },
  ];

  return (
    <section
      id="techs"
      className={`${mix} techs`}
      children={
        <>
          <ContentTitle mix="techs__content-title" title={<>Технологии</>} />
          <h3 className="techs__title" children={<>7&nbsp;технологий</>} />
          <p
            className="techs__paragraph"
            children={<>На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</>}
          />
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
