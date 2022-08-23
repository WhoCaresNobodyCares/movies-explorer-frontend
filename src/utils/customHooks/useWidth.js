import { useState, useEffect } from 'react';

const getWidth = () => window.innerWidth;

const useWidth = () => {
  const [windowWidth, setWindowWidth] = useState(getWidth());

  useEffect(() => {
    const handleResize = () => setWindowWidth(getWidth());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

export default useWidth;
