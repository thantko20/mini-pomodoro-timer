/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

const useSoundEffect = (src) => {
  const audio = new Audio(src);

  const play = () => audio.play();

  const stop = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    audio.addEventListener('ended', stop);

    return () => audio.addEventListener('ended', stop);
  }, []);

  return play;
};

export default useSoundEffect;
