import { useEffect, useState } from 'react';
import './AboutMe.css';
import ContentTitle from '../ContentTitle/ContentTitle';
const { CONTENT_CONFIG } = require('../../../configs/contentConfig.json');

const AboutMe = () => {
  const [isDesktopLayout, setIsDesktopLayout] = useState(window.innerWidth > 600);

  const updateLayout = () => (window.innerWidth > 600 ? setIsDesktopLayout(true) : setIsDesktopLayout(false));

  const horizontalSection = (
    <>
      <div className='about-me__content'>
        <div className='about-me__info'>
          <h3 className='about-me__subtitle' children={CONTENT_CONFIG.Main.aboutMe.subtitle} />
          <span className='about-me__description' children={CONTENT_CONFIG.Main.aboutMe.description} />
          <p className='about-me__paragraph' children={CONTENT_CONFIG.Main.aboutMe.paragraph} />
          <div className='about-me__links'>
            {CONTENT_CONFIG.Main.aboutMe.links.map(item => (
              <a
                href={item.href}
                target='_blank'
                rel='noreferrer noopener'
                className='about-me__link'
                key={item.key}
                children={item.text}
              />
            ))}
          </div>
        </div>
        <div className='about-me__image' />
      </div>
    </>
  );

  const verticalSection = (
    <>
      <div className='about-me__content'>
        <div className='about-me__image' />
        <div className='about-me__info'>
          <h3 className='about-me__subtitle' children={CONTENT_CONFIG.Main.aboutMe.subtitle} />
          <span className='about-me__description' children={CONTENT_CONFIG.Main.aboutMe.description} />
          <p className='about-me__paragraph' children={CONTENT_CONFIG.Main.aboutMe.paragraph} />
          <div className='about-me__links'>
            {CONTENT_CONFIG.Main.aboutMe.links.map(item => (
              <a
                href={item.href}
                target='_blank'
                rel='noreferrer noopener'
                className='about-me__link'
                key={item.key}
                children={item.text}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );

  useEffect(() => {
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return (
    <section id='about-me' className='about-me'>
      <ContentTitle mix='about-me__title' title={CONTENT_CONFIG.Main.aboutMe.title} />
      {isDesktopLayout ? horizontalSection : verticalSection}
    </section>
  );
};

export default AboutMe;
