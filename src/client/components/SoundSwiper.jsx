import React, { useEffect, useRef } from 'react';
import Hammer from 'hammerjs';
import { Howl } from 'howler';

const SoundSwiper = ({ children, isSoundOn }) => {
  const swipeAreaRef = useRef(null);

  const sounds = {
    ryanHill: new Howl({ src: ["/sounds/site/Moog_FX_28.wav"], volume: 0.4 }),
    drawing: new Howl({ src: ["/sounds/site/27567__suonho__memorymoon_pad-luminize.wav"], volume: 0.2 }), 
    installation: new Howl({ src: ["/sounds/site/542775__hoergewohnheit__moog-sirin-c4-filter-sweep-16-bit.wav"], volume: 0.2 }),  
    events: new Howl({ src: ["/sounds/site/379878__maikguts__moog-theremin-sweep-effected.mp3"], volume: 0.2 }),    
    studio: new Howl({ src: ["/sounds/site/Moog_Brass_A4.wav"], volume: 0.1 }),  
    contact: new Howl({ src: ["/sounds/site/Moog_String_C2.wav"], volume: 0.3 }),    
  }
  

  useEffect(() => {
    const swipeArea = swipeAreaRef.current;
    const hammer = new Hammer(swipeArea);
    isSoundOn? console.log('turning on') : console.log('turning off');

    if (isSoundOn) {
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on('swiperight', () => {
      sounds.drawing.play();
    });

    hammer.on('swipeleft', () => {
      sounds.ryanHill.play();
    });

    hammer.on('pinchin', () => {
      sounds.studio.play();
    });

    hammer.on('pinchout', () => {
      sounds.contact.play();
    });
  
    
    
    return () => {
      sounds.ryanHill.play();
      hammer.off('swiperight');
      hammer.off('swipeleft');
      hammer.off('pinchin');
      hammer.off('pinchout');
    };
  }
    
  }, [isSoundOn]);

  return (
    <div ref={swipeAreaRef} style={{ width: '100%', height: '100%', touchAction: 'none', overflow: 'auto'  }}>
      {console.log(isSoundOn)}
      {children}
    </div>
  );
};

export default SoundSwiper;
