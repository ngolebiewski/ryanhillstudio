import React, { useEffect } from 'react';
import { Howl } from 'howler';
import { SoundOutlined, SoundFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';

const sounds = {
  about: new Howl({ src: ["/sounds/site/Moog_FX_28.wav"], volume: 0.2 }),
  drawing: new Howl({ src: ["/sounds/site/27567__suonho__memorymoon_pad-luminize.wav"], volume: 0.2 }),
  installation: new Howl({ src: ["/sounds/site/542775__hoergewohnheit__moog-sirin-c4-filter-sweep-16-bit.wav"], volume: 0.2 }),
  events: new Howl({ src: ["/sounds/site/379878__maikguts__moog-theremin-sweep-effected.mp3"], volume: 0.2 }),
  studio: new Howl({ src: ["/sounds/site/Moog_Brass_A4.wav"], volume: 0.1 }),
  contact: new Howl({ src: ["/sounds/site/Moog_String_C2.wav"], volume: 0.1 }),
  commission: new Howl({ src: ["/sounds/site/Moog_Sweep_07_C.wav"], volume: 0.2 }),
};

const MenuMap = ({ isSoundOn, setIsSoundOn }) => {
  const navigate = useNavigate();

  const playRandomSound = () => {
    const soundKeys = Object.keys(sounds);  // Get the keys of the sounds object
    const randomKey = soundKeys[Math.floor(Math.random() * soundKeys.length)];  // Select a random key
    sounds[randomKey].play();  // Play the randomly selected sound
  };

  const stopAllSounds = () => {
    Object.values(sounds).forEach(sound => {
      // Fade out from current volume to 0 over 0.25 seconds (250ms)
      // sound.fade(sound.volume(), 0, 250);
      // Stop the sound after the fade is complete
      setTimeout(() => sound.stop(), 250);
    });
    
  };

  const toggleSound = () => {
    setIsSoundOn(prevState => !prevState);  // Toggle the sound state
    if (isSoundOn) {
      stopAllSounds();  // Stop all sounds if toggling sound off
    } else {
      playRandomSound();  // Play a random sound if toggling sound on
    }
  };

  const handleAreaMouseOver = (soundKey, pressure = 0.1) => {
    if (isSoundOn && sounds[soundKey] && pressure < 0.5) {
      Howler.ctx.resume().then(() => {
        sounds[soundKey].play();
      });
    }
  };

  const handleAreaClick = (page) => {
    if (page) {
      navigate(`/${page}`);
    }
  };

  return (
    <>
      <div>
        <Tooltip title="Sound on/off">
          <Button
            type="text"
            icon={!isSoundOn ? <SoundOutlined /> : <SoundFilled />}
            onClick={toggleSound}
          />
        </Tooltip>
      </div>

      <div className='menu-art-container'>
        <svg width="100%" height="100%" viewBox="0 0 2024 766">
          <image href="/images/site/menu/Drawn-Menu-3.png" width="2024" height="766" />
          <polygon
            points="635,148 670,24 1005,28 1001,140"
            fill="#FF000080"
            onMouseOver={() => handleAreaMouseOver('about')}
            onClick={() => handleAreaClick('about')}
          />
          <polygon
            points="658,234 660,155 712,149 1003,139 1039,124 1023,226 846,246"
            fill="#FFA50080"
            onMouseOver={() => handleAreaMouseOver('series')}
            onClick={() => handleAreaClick('series')}
          />
          <polygon
            points="789,332 783,243 992,225 1472,210 1461,316"
            fill="#FFFF0080"
            onMouseOver={() => handleAreaMouseOver('installation')}
            onClick={() => handleAreaClick('installation')}
          />
          <polygon
            points="890,427 907,327 1150,325 1282,323 1268,405 1112,423"
            fill="#00800080"
            onMouseOver={() => handleAreaMouseOver('studio')}
            onClick={() => handleAreaClick('studio')}
          />
          <polygon
            points="905,509 917,429 1352,402 1337,481 1293,495"
            fill="#0000FF80"
            onMouseOver={() => handleAreaMouseOver('events')}
            onClick={() => handleAreaClick('events')}
          />
          <polygon
            points="881,584 876,513 1316,493 1370,481 1359,586"
            fill="#80008080"
            onMouseOver={() => handleAreaMouseOver('contact')}
            onClick={() => handleAreaClick('contact')}
          />
          <polygon
            points="828,668 826,590 1450,565 1446,692"
            fill="#00808080"
            onMouseOver={() => handleAreaMouseOver('commission')}
            onClick={() => handleAreaClick('commissions')}
          />
        </svg>
      </div>
    </>
  );
};

export default MenuMap;
