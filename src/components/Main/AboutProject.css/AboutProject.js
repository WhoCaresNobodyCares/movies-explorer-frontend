import './AboutProject.css';

import ContentTitle from '../ContentTitle/ContentTitle';
import TextColumn from './TextColumn/TextColumn';

const AboutProject = ({ mix }) => {
  const description = [
    {
      title: <>Дипломный проект включал 5&nbsp;этапов</>,
      text: <>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</>,
      key: 'about-project__description_1',
    },
    {
      title: <>На&nbsp;выполнение диплома ушло 5&nbsp;недель</>,
      text: <>У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</>,
      key: 'about-project__description_2',
    },
  ];

  const timeline = [
    {
      text: <>1&nbsp;неделя</>,
      key: 'about-project__timeline-item_1',
    },
    {
      text: <>4&nbsp;недели</>,
      key: 'about-project__timeline-item_2',
    },
    {
      text: <>Back-end</>,
      key: 'about-project__timeline-item_3',
    },
    {
      text: <>Front-end</>,
      key: 'about-project__timeline-item_4',
    },
  ];

  return (
    <section id="about-project" className={`${mix} about-project`}>
      <ContentTitle mix="about-project__title" title={<>О&nbsp;проекте</>} />
      <div
        className="about-project__description"
        children={description.map((item) => (
          <TextColumn mix="about-project__text-column" title={item.title} text={item.text} key={item.key} />
        ))}
      />
      <div
        className="about-project__timeline"
        children={timeline.map((item) => (
          <span className="about-project__timeline-item" children={item.text} key={item.key} />
        ))}
      />
    </section>
  );
};

export default AboutProject;