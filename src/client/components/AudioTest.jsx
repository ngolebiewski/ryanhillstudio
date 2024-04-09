import React, { useRef } from 'react';
import { Howl } from 'howler';

const HowlerButton = () => {
  const soundRef = useRef(null);
  const playSound = () => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: ["../../../public/Moog_FX_28.wav"],
        volume: 0.5,
        onplayerror: (error) => {
          console.error('Error playing sound:', error);
        }
      });
    }
    soundRef.current.play();
  };

  return (
    <button onClick={playSound}>Play Sound</button>
  );
};

export default HowlerButton;
