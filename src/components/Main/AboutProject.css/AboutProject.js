import './AboutProject.css';
import ContentTitle from '../ContentTitle/ContentTitle';
import TextColumn from './TextColumn/TextColumn';
const { CONTENT_CONFIG } = require('../../../configs/contentConfig.json');

const AboutProject = ({ mix }) => {
  return (
    <section id='about-project' className={`${mix} about-project`}>
      <ContentTitle mix='about-project__title' title={CONTENT_CONFIG.Main.aboutProject.title} />
      <div
        className='about-project__description'
        children={CONTENT_CONFIG.Main.aboutProject.description.map(item => (
          <TextColumn
            mix='about-project__text-column'
            title={item.title}
            text={item.text}
            key={item.key}
          />
        ))}
      />
      <div
        className='about-project__timeline'
        children={CONTENT_CONFIG.Main.aboutProject.timeline.map(item => (
          <span className='about-project__timeline-item' children={item.text} key={item.key} />
        ))}
      />
    </section>
  );
};

export default AboutProject;
