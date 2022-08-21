import { useLocation } from 'react-router-dom';

const useAllowedPaths = (paths) => {
	const location = useLocation().pathname;
	const isAllowed = paths.some((path) => path === location);

	const getAllowedPath = (location, isAllowed) => isAllowed && location;
	const allowedPath = getAllowedPath(location, isAllowed);

	return [isAllowed, allowedPath];
};

export default useAllowedPaths;
