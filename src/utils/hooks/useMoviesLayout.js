import { useEffect, useState } from 'react';

const useMoviesLayout = movies => {
  let viewport = window.innerWidth;

  const [initialAmount, setInitialAmount] = useState(viewport <= 689 ? 5 : viewport <= 1087 ? 8 : viewport > 1087 ? 12 : false);
  const [additionalAmount, setAdditionalAmount] = useState(viewport <= 689 ? 1 : viewport <= 1087 ? 2 : viewport > 1087 ? 3 : false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const resetLayout = () => {
    setInitialAmount(viewport <= 689 ? 5 : viewport <= 1087 ? 8 : viewport > 1087 ? 12 : false);
    setAdditionalAmount(viewport <= 689 ? 1 : viewport <= 1087 ? 2 : viewport > 1087 ? 3 : false);
  };

  const addMoreMovies = () => setInitialAmount(initialAmount + additionalAmount);

  const renderedSection = movies.slice(0, initialAmount);

  const handleVieportChange = () => {
    viewport = window.innerWidth;
    resetLayout();
  };

  useEffect(() => {
    initialAmount >= movies.length ? setIsButtonVisible(false) : setIsButtonVisible(true);
  }, [initialAmount, movies.length]);

  useEffect(() => {
    window.addEventListener('resize', handleVieportChange);
    return () => window.removeEventListener('resize', handleVieportChange);
  }, []);

  return {
    renderedSection,
    addMoreMovies,
    isButtonVisible,
  };
};

export default useMoviesLayout;
