import { useCallback, useEffect, useState } from 'react';

const useMedia = (media) => {
  const [isMatch, setIsMatch] = useState(null);

  const changeMatch = useCallback(() => {
    const { matches } = window.matchMedia(media);
    setIsMatch(matches);
  }, [media]);

  useEffect(() => {
    window.addEventListener('resize', changeMatch);
    changeMatch();
    return () => window.removeEventListener('resize', changeMatch);
  }, [changeMatch]);

  return isMatch;
};

export default useMedia;
