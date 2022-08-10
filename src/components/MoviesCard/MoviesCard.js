import useAllowedPaths from '../../utils/customHooks/useAllowedPaths';
import './MoviesCard.css';

const MoviesCard = ({ mix }) => {
  const [heartIsRendered] = useAllowedPaths(['/movies']);

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
                <div
                  className="movies-card__wrap"
                  children={
                    <>
                      <h2 className="movies-card__title" children="33 слова о дизайне" />
                      <button
                        type="button"
                        aria-label="Лайк"
                        className={heartIsRendered ? 'movies-card__heart-icon' : 'movies-card__cross-icon'}
                      />
                    </>
                  }
                />
                <span className="movies-card__length" children="1ч 3м" />
              </>
            }
          />
        </>
      }
    />
  );
};

export default MoviesCard;
