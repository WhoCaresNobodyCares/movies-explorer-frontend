import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = ({ mix }) => {
  const navigate = useNavigate();

  return (
    <section
      className={`${mix} not-found`}
      children={
        <>
          <h1 className="not-found__title" children="404" />
          <span className="not-found__subtitle" children="Страница не найдена" />
          <button
            className="not-found__navigate"
            children="Назад"
            onClick={() => {
              navigate(-1);
            }}
          />
        </>
      }
    />
  );
};

export default NotFound;
