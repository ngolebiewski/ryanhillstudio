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
    <button 
    className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
    onClick={playSound}>
      Play Sound
    </button>
  );
};

export default HowlerButton;
