import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export const useConfettiEffect = (isActive, setShowGallery, delay) => {
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        confetti({
          particleCount: 100,
          startVelocity: 30,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() },
          colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
          zIndex: 1000,
        });
      }, 250);

      const timeout = setTimeout(() => {
        console.log('Transitioning to Gallery');
        setShowGallery(true);
      }, delay);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isActive, setShowGallery, delay]);
};

export const useGradientChange = (intervalDuration) => {
  const [gradientIndex, setGradientIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming 3 gradients
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [intervalDuration]);

  return gradientIndex;
};
