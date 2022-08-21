import React from 'react';

const useAllowedPaths = (location) => {
	const [allowedPaths, setAllowedPaths] = React.useState(false);

	const handlePathChange = (config) => {
		let result = {};

		for (let index = 0; index < config.length; index++) {
			const object = config[index];
			let state;

			for (let index = 0; index < object.paths.length; index++) {
				state = object.paths.some((path) => path === location);
			}

			result[`${object.name}`] = state;
		}

		setAllowedPaths(result);
	};

	return { allowedPaths, handlePathChange };
};

export default useAllowedPaths;
