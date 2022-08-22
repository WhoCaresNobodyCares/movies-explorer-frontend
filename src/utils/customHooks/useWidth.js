import { useState, useEffect } from 'react';

const getWidth = () => {
  const width = window.innerWidth;
  return width;
};

const useWidth = () => {
  const [windowWidth, setWindowWidth] = useState(getWidth());

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

export default useWidth;
