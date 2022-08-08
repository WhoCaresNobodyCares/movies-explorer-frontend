import { aboutProjectTitle, descriptionContent, timelineContent } from '../../../variables/mainVariables';
import ContentTitle from '../ContentTitle/ContentTitle';
import TextColumn from '../TextColumn/TextColumn';
import './AboutProject.css';

const AboutProject = ({ mix }) => {
  return (
    <section
      id="about-project"
      className={`${mix} about-project`}
      children={
        <>
          <ContentTitle mix="about-project__content-title" title={aboutProjectTitle} />
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
