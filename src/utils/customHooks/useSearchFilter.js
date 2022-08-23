const useSearchFilter = (value) =>
	value !== undefined
		? value
				.replace(/\s+/g, ' ')
				.split(' ')
				.map((item) => item !== '' && item)
				.filter(Boolean)
		: [];

export default useSearchFilter;