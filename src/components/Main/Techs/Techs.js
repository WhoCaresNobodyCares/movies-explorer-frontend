import './Techs.css';

import ContentTitle from '../ContentTitle/ContentTitle';

const { CONTENT_CONFIG } = require('../../../configs/contentConfig.json');

const Techs = () => (
  <section id='techs' className='techs'>
    <ContentTitle mix='techs__title' title={CONTENT_CONFIG.Main.techs.title} />
    <h3 className='techs__subtitle' children={CONTENT_CONFIG.Main.techs.subtitle} />
    <p className='techs__paragraph' children={CONTENT_CONFIG.Main.techs.paragraph} />
    <div
      className='techs__cards'
      children={CONTENT_CONFIG.Main.techs.cards.map(item => (
        <span className='techs__card' children={item.text} key={item.key} />
      ))}
    />
  </section>
);

export default Techs;
