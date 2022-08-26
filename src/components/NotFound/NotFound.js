import { useNavigate } from 'react-router-dom';

import './NotFound.css';

const { CONTENT_CONFIG } = require('../../configs/contentConfig.json');

const NotFound = () => {
  // * HOOKS
  const navigate = useNavigate();

  return (
    <main className='not-found'>
      <section className='not-found__section'>
        <div className='not-found__wrap'>
          <h1 className='not-found__title' children={CONTENT_CONFIG.NotFound.title} />
          <span className='not-found__subtitle' children={CONTENT_CONFIG.NotFound.subtitle} />
        </div>
        <button
          id='navigateBack'
          className='not-found__back'
          name='navigateBack'
          aria-label='Назад'
          type='button'
          onClick={() => navigate(-1)}
          children={CONTENT_CONFIG.NotFound.button}
        />
      </section>
    </main>
  );
};

export default NotFound;
