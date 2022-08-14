import './Preloader.css';

const Preloader = ({ mix, mod_visible }) => {
  return (
    <div className={`${mix} preloader ${mod_visible}`}>
      <div className={!mod_visible ? 'preloader__container' : 'preloader__container preloader__container_scaled'}>
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
