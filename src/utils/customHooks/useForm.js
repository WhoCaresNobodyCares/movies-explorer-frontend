import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const useForm = () => {
	const location = useLocation().pathname;
	const [values, setValues] = useState(
		location === '/movies' &&
			JSON.parse(localStorage.getItem('movies-state')) !== null
			? {
					searchFormInput: JSON.parse(
						localStorage.getItem('movies-state'),
					).words.join(' '),
			  }
			: location === '/saved-movies' &&
			  JSON.parse(localStorage.getItem('saved-movies-state'))
			? {
					searchFormInput: JSON.parse(
						localStorage.getItem('saved-movies-state'),
					).words.join(' '),
			  }
			: {},
	);

	const handleChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		setValues({ ...values, [name]: value });
	};

	return { values, handleChange, setValues };
};

export default useForm;
