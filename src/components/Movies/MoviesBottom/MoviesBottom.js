import './MoviesBottom.css';

const MoviesBottom = ({ mix }) => {
  return (
    <section
      className={`${mix} movies-bottom`}
      children={<button className="movies-bottom__button" type="button" aria-label="Еще" children={<>Ещё</>} />}
    />
  );
};

export default MoviesBottom;
