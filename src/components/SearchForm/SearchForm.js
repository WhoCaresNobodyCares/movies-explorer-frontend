import useWidth from '../../utils/customHooks/useWidth';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButtonIcon from '../../images/search-button-icon.svg';
import useForm from '../../utils/customHooks/useForm';
import { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import useValueFilter from '../../utils/customHooks/useValueFilter';
import { useLocation } from 'react-router-dom';

const SearchForm = ({ mix }) => {
	const location = useLocation().pathname;
	const viewport = useWidth();
	const isMounted = useRef(false);
	const searchForm = useRef(null);
	const {
		searchMoviesInitially,
		searchMovies,
		submitOnCheck,
		searchSavedMovies,
	} = useContext(AppContext);
	const [isChecked, setIsChecked] = useState(
		JSON.parse(localStorage.getItem('movies-state')) !== null
			? JSON.parse(localStorage.getItem('movies-state')).isChecked
			: JSON.parse(localStorage.getItem('saved-movies-state')) !== null
			? JSON.parse(localStorage.getItem('saved-movies-state')).isChecked
			: false,
	);
	const [isInitialSearch, setIsInitialSearch] = useState(true);
	const { values, handleChange } = useForm();
	const words = useValueFilter(values);

	useEffect(() => {
		if (isMounted.current === true) {
			submitOnCheck(searchForm);
		} else {
			isMounted.current = true;
		}
	}, [isChecked]);

	return (
		<section className={`${mix} search-form`}>
			<form
				ref={searchForm}
				id="searchForm"
				className="search-form__form"
				name="searchForm"
				action="#"
				method="post"
				target="_self"
				autoComplete="on"
				noValidate
				onSubmit={(e) => {
					e.preventDefault();
					location === '/movies' && isInitialSearch
						? searchMoviesInitially(isChecked, words, setIsInitialSearch)
						: location === '/movies'
						? searchMovies(isChecked, words)
						: searchSavedMovies(isChecked, words);
				}}
			>
				<div className="search-form__frame">
					<div className="search-form__search-bar">
						{viewport > 600 && (
							<img
								className="search-form__search-icon"
								src={searchIcon}
								alt="Иконка поиска"
							/>
						)}
						<input
							id="searchFormInput"
							className="search-form__input"
							name="searchFormInput"
							type="text"
							minLength={0}
							maxLength={40}
							placeholder="Фильм"
							autoComplete="on"
							defaultValue={
								location === '/movies' &&
								JSON.parse(localStorage.getItem('movies-state')) !== null
									? JSON.parse(localStorage.getItem('movies-state')).words.join(
											' ',
									  )
									: location === '/saved-movies' &&
									  JSON.parse(localStorage.getItem('saved-movies-state')) !==
											null
									? JSON.parse(
											localStorage.getItem('saved-movies-state'),
									  ).words.join(' ')
									: ''
							}
							required
							autoFocus
							onChange={(e) => handleChange(e)}
						/>
						<button
							id="searchFormSubmit"
							className="search-form__submit"
							name="searchFormSubmit"
							aria-label="Начать поиск"
							type="submit"
							formMethod="post"
							form="searchForm"
							children={
								<img
									className="search-form__submit-icon"
									src={searchButtonIcon}
									alt="Иконка кнопки"
								/>
							}
						/>
					</div>
					{viewport > 600 && (
						<>
							<div className="search-form__separator" />
							<div className="search-form__option">
								<label id="searchFormLabel" className="search-form__switch">
									<input
										id="searchFormCheckbox"
										className="search-form__checkbox"
										name="searchFormCheckbox"
										type="checkbox"
										checked={isChecked}
										onChange={() => setIsChecked(!isChecked)}
									/>
									<span className="search-form__slider" />
								</label>
								<span
									className="search-form__switch-description"
									children="Короткометражки"
								/>
							</div>
						</>
					)}
				</div>
				{viewport <= 600 && (
					<>
						<div className="search-form__option">
							<label id="searchFormLabel" className="search-form__switch">
								<input
									id="searchFormCheckbox"
									className="search-form__checkbox"
									name="searchFormCheckbox"
									type="checkbox"
									checked={isChecked}
									onChange={() => setIsChecked(!isChecked)}
								/>
								<span className="search-form__slider" />
							</label>
							<span
								className="search-form__switch-description"
								children="Короткометражки"
							/>
						</div>
					</>
				)}
			</form>
		</section>
	);
};

export default SearchForm;
