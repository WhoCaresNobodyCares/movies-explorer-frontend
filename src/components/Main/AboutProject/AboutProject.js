import ContentTitle from '../ContentTitle/ContentTitle';
import TextColumn from '../TextColumn/TextColumn';
import './AboutProject.css';

const AboutProject = ({ mix }) => {
  const descriptionContent = [
    {
      title: <>Дипломный проект включал 5&nbsp;этапов</>,
      text: <>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</>,
      key: 'description-1',
    },
    {
      title: <>На&nbsp;выполнение диплома ушло 5&nbsp;недель</>,
      text: <>У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</>,
      key: 'description-2',
    },
  ];

  const timelineContent = [
    {
      text: <>1&nbsp;неделя</>,
      key: 'timeline-item-1',
    },
    {
      text: <>4&nbsp;недели</>,
      key: 'timeline-item-2',
    },
    {
      text: 'Back-end',
      key: 'timeline-item-3',
    },
    {
      text: 'Front-end',
      key: 'timeline-item-4',
    },
  ];

  return (
    <section
      id="about-project"
      className={`${mix} about-project`}
      children={
        <>
          <ContentTitle mix="about-project__content-title" title={<>О&nbsp;проекте</>} />
          <div
            className="about-project__description"
            children={descriptionContent.map((item) => (
              <TextColumn mix="about-project__text-column" title={item.title} text={item.text} key={item.key} />
            ))}
          />
          <div
            className="about-project__timeline"
            children={timelineContent.map((item) => (
              <span className="about-project__timeline-item" key={item.key} children={item.text} />
            ))}
          />
        </>
      }
    />
  );
};

export default AboutProject;
