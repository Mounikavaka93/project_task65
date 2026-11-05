import { useEffect, useState } from 'react';

export function useCycle(length, delay = 5600) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || length < 2) return undefined;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, delay);
    return () => clearInterval(id);
  }, [paused, length, delay]);

  const step = (direction) => {
    setIndex((current) => (current + direction + length) % length);
  };

  return { index, setIndex, paused, setPaused, step };
}
