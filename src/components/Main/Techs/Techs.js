import ContentTitle from '../ContentTitle/ContentTitle';

import './Techs.css';

const Techs = ({ mix }) => {
  const cards = [
    { text: 'HTML', key: 'techs__cards-item_1' },
    { text: 'CSS', key: 'techs__cards-item_2' },
    { text: 'JS', key: 'techs__cards-item_3' },
    { text: 'React', key: 'techs__cards-item_4' },
    { text: 'Git', key: 'techs__cards-item_5' },
    { text: 'Express.js', key: 'techs__cards-item_6' },
    { text: 'mongoDB', key: 'techs__cards-item_7' },
  ];

  return (
    <section id="techs" className={`${mix} techs`}>
      <ContentTitle mix="techs__title" title={<>Технологии</>} />
      <h3 className="techs__subtitle" children={<>7&nbsp;технологий</>} />
      <p
        className="techs__paragraph"
        children={<>На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</>}
      />
      <div
        className="techs__cards"
        children={cards.map((item) => (
          <span className="techs__card" children={item.text} key={item.key} />
        ))}
      />
    </section>
  );
};

export default Techs;
