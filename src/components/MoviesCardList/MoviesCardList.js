import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ mix }) => {
  return (
    <section
      className={`${mix} movies-card-list`}
      children={
        <>
          <div
            className="movies-card-list__grid"
            children={
              <>
                <MoviesCard mix="movies-card-list__movies-card" />
                <MoviesCard mix="movies-card-list__movies-card" />
                <MoviesCard mix="movies-card-list__movies-card" />
              </>
            }
          />
        </>
      }
    />
  );
};

export default MoviesCardList;
