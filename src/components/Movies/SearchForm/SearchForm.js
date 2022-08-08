import './SearchForm.css';
import searchIcon from '../../../images/search-icon.svg';
import searchButtonIcon from '../../../images/search-button-icon.svg';
import useWidth from '../../../utils/customHooks/useWidth';
import Switch from './Switch/Switch';
import { formPlaceholder, switchCaption } from '../../../variables/moviesVariables';

const SearchForm = ({ mix }) => {
  const viewport = useWidth();
  return (
    <section
      className={`${mix} search-form`}
      children={
        <>
          <div
            className="search-form__frame"
            children={
              <>
                {viewport > 460 && <img src={searchIcon} className="search-form__search-icon" alt="Поиск по фильмам" />}
                <input className="search-form__input" title="Фильмы" formName="Movies" formId="movies" placeholder={formPlaceholder} />
                <button
                  className="search-form__button"
                  type="button"
                  aria-label="Начать поиск"
                  children={<img className="search-form__button-icon" src={searchButtonIcon} alt="Иконка кнопки" />}
                />
                {viewport > 600 && (
                  <>
                    <div className="search-form__separator" />
                    <Switch mix="search-form__switch" />
                    <span className="search-form__switch-caption" children={switchCaption} />
                  </>
                )}
              </>
            }
          />
          {viewport <= 600 && (
            <>
              <div
                className="search-form__switch-wrap"
                children={
                  <>
                    <Switch mix="search-form__switch" />
                    <span className="search-form__switch-caption" children={switchCaption} />
                  </>
                }
              />
            </>
          )}
        </>
      }
    />
  );
};

export default SearchForm;
