import ContentTitle from '../ContentTitle/ContentTitle';
import './AboutMe.css';

const AboutMe = ({ mix }) => {
  const linksContent = [
    { href: 'https://github.com/WhoCaresNobodyCares', text: 'Facebook', key: 'Facebook' },
    { href: 'https://github.com/WhoCaresNobodyCares', text: 'Github', key: 'Github' },
  ];

  return (
    <section
      id="about-me"
      className={`${mix} about-me`}
      children={
        <>
          <ContentTitle mix="about-me__content-title" title={<>Студент</>} />
          <div
            className="about-me__info"
            children={
              <>
                <div
                  className="about-me__description"
                  children={
                    <>
                      <h3 className="about-me__title" children={<>Андрей</>} />
                      <span className="about-me__subtitle" children={<>Фронтенд-разработчик, 27&nbsp;лет</>} />
                      <p
                        className="about-me__paragraph"
                        children={
                          <>
                            Занимаюсь разработкой веб-страниц и&nbsp;веб-приложений. Увлекаюсь лингвистикой, графикой и&nbsp;современными
                            технологиями. Пассионарен, пунктуален, методичен.
                          </>
                        }
                      />
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
