import './MoviesCard.css';

const MoviesCard = ({ mix }) => {
  return (
    <div
      className={`${mix} movies-card`}
      children={
        <>
          <img
            src="https://hddesktopwallpapers.in/wp-content/uploads/2015/09/kitty-cat-wallpaper.jpg"
            alt="Изображение карточки"
            className="movies-card__image"
          />
          <div
            className="movies-card__description"
            children={
              <>
                <h2 className='movies-card__title' children='33 слова о дизайне' />
              </>
            }
          />
        </>
      }
    />
  );
};

export default MoviesCard;
