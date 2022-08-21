const useValueFilter = (values) =>
	values.searchFormInput !== undefined
		? values.searchFormInput
				.replace(/\s+/g, ' ')
				.split(' ')
				.map((item) => item !== '' && item)
				.filter(Boolean)
		: [];

export default useValueFilter;
