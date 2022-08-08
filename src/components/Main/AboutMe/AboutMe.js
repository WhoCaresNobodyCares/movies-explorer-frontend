import { aboutMeContentTitle, aboutMeParagraph, aboutMeSubtitle, aboutMeTitle, linksContent } from '../../../variables/mainVariables';
import ContentTitle from '../ContentTitle/ContentTitle';
import './AboutMe.css';

const AboutMe = ({ mix }) => {
  return (
    <section
      id="about-me"
      className={`${mix} about-me`}
      children={
        <>
          <ContentTitle mix="about-me__content-title" title={aboutMeContentTitle} />
          <div
            className="about-me__info"
            children={
              <>
                <div
                  className="about-me__description"
                  children={
                    <>
                      <h3 className="about-me__title" children={aboutMeTitle} />
                      <span className="about-me__subtitle" children={aboutMeSubtitle} />
                      <p className="about-me__paragraph" children={aboutMeParagraph} />
                      <div
                        className="about-me__links"
                        children={linksContent.map((item) => (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="about-me__link"
                            key={item.key}
                            children={item.text}
                          />
                        ))}
                      />
                    </>
                  }
                />
                <div className="about-me__photo" />
              </>
            }
          />
        </>
      }
    />
  );
};

export default AboutMe;
