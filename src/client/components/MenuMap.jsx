import React, { useRef, useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';
import { SoundOutlined, SoundFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import * as Tone from 'tone';

const sounds = {
  ryanHill: new Howl({ src: ["/sounds/site/Moog_FX_28.wav"], volume: 0.2 }),
  drawing: new Howl({ src: ["/sounds/site/27567__suonho__memorymoon_pad-luminize.wav"], volume: 0.2 }), 
  installation: new Howl({ src: ["/sounds/site/542775__hoergewohnheit__moog-sirin-c4-filter-sweep-16-bit.wav"], volume: 0.2 }),  
  events: new Howl({ src: ["/sounds/site/379878__maikguts__moog-theremin-sweep-effected.mp3"], volume: 0.2 }),    
  studio: new Howl({ src: ["/sounds/site/Moog_Brass_A4.wav"], volume: 0.1 }),  
  contact: new Howl({ src: ["/sounds/site/Moog_String_C2.wav"], volume: 0.1 }),    
}

const tremolo = new Tone.Tremolo({
  frequency: 60, 
  depth: 0.6,   // Depth of the effect (0-1)
  spread: 180,  // Stereo spread of the effect
}).start();      // Start the tremolo effect

const bassSynth = new Tone.MonoSynth({
  oscillator: { type: 'sawtooth' },
  filter: { type: 'lowpass', frequency: 150, Q: 8 },
  envelope: { attack: 0.01, decay: 0.1, sustain: 0.6, release: 0.5 }
}).connect(tremolo).toDestination();

const spacePad = new Tone.PolySynth({
  oscillator: { type: 'sawtooth' },
  filter: { type: 'lowpass', frequency: 600, Q: 5 },
  envelope: { attack: 1, decay: 1, sustain: 0.5, release: 2 }
}).connect(tremolo).toDestination(); 

const modulatedBass = new Tone.MonoSynth({
  oscillator: { type: 'fmsquare', modulationType: 'sawtooth', modulationIndex: 2, harmonicity: 4.5 },
  filter: { type: 'lowpass', frequency: 100, Q: 12 },
  envelope: { attack: 0.05, decay: 0.2, sustain: 0.6, release: 1.5 }
}).toDestination();

const evolvingNoisePad = new Tone.NoiseSynth({
  noise: { type: 'pink' },
  filter: { type: 'lowpass', frequency: 200, Q: 4 },
  envelope: { attack: 4, decay: 1.5, sustain: 0.3, release: 2 }
}).toDestination();



const MenuMap = ({ isSoundOn, setIsSoundOn }) => {
  const imgRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [percentageCoords, setPercentageCoords] = useState({});
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAreaMouseOver = (soundKey, pressure = 0.1) => {
    if (isSoundOn && sounds[soundKey] && pressure < 0.5) {
      Howler.ctx.resume().then(() => {
        sounds[soundKey].play();
      });
    }
  };

  const playSpacePad = () => {
    spacePad.triggerAttackRelease(['C2', 'E3', 'G4'], '2n');
  };
  
  const playBassSynth= () => {
    spacePad.triggerAttackRelease(['A1'], '4n');
  };
  
  const playModulatedBass= () => {
    modulatedBass.triggerAttackRelease('C1', '4n'); 
  }

  const playEvolvingNoisePad= () => {
    evolvingNoisePad.triggerAttackRelease('3m'); 
  }

  const toggleSound = () => {
    setIsSoundOn(prevState => !prevState);
  };

  useEffect(() => {
    const img = new Image();
    img.src = "/images/site/menu/Drawn-Menu-3.png";
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
      setIsImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    const updateImageSize = () => {
      if (imgRef.current) {
        const { clientWidth, clientHeight } = imgRef.current;
        setImageSize({ width: clientWidth, height: clientHeight });
      }
    };

    if (isImageLoaded) {
      updateImageSize();
      window.addEventListener('resize', updateImageSize);
    }

    return () => {
      window.removeEventListener('resize', updateImageSize);
    };
  }, [isImageLoaded]);

  useEffect(() => {
    if (imageDimensions.width > 0 && imageSize.width > 0) {
      const imageRatio = imageSize.width / imageDimensions.width;

      const generatePercentageCoords = (coords) => {
        return coords.map((coord, index) => {
          return coord * imageRatio;
        });
      };

      
      setPercentageCoords({
        ryanHill: generatePercentageCoords([104, 174, 160, 583, 339, 566, 368, 597, 511, 551, 550, 558, 594, 438, 655, 416, 714, 526, 856, 551, 853, 593, 888, 575, 922, 509, 1142, 534, 1189, 588, 1235, 473, 1265, 534, 1360, 536, 1458, 548, 1524, 602, 1637, 553, 2053, 607, 2029, 135, 104, 171, 114, 203, 121, 262, 116, 260, 121, 262]),
        drawing: generatePercentageCoords([89, 593, 82, 913, 817, 926, 1076, 928, 1461, 911, 1588, 686, 1470, 558]),
        installation: generatePercentageCoords([89, 930, 97, 1222, 342, 1251, 359, 1143, 484, 1259, 596, 1207, 995, 1229, 1262, 1134, 1287, 1229, 1465, 1109, 1539, 1298, 2222, 1303, 2193, 791, 1399, 916]),
        events: generatePercentageCoords([97, 1233, 109, 1485, 229, 1551, 278, 1487, 373, 1507, 403, 1458, 640, 1451, 821, 1478, 870, 1527, 1012, 1532, 1120, 1527, 1137, 1534, 1238, 1519, 1419, 1581, 1558, 1338, 1377, 1194, 1274, 1228, 1252, 1132, 941, 1250, 579, 1213, 457, 1250, 376, 1135, 339, 1245]),
        studio: generatePercentageCoords([109, 1786, 212, 1801, 342, 1830, 459, 1747, 579, 1757, 675, 1742, 841, 1735, 897, 1794, 1052, 1784, 1282, 1796, 1473, 1681, 1438, 1598, 1245, 1529, 895, 1524, 758, 1487, 415, 1465, 368, 1522, 293, 1492, 182, 1625, 114, 1595]),
        contact: generatePercentageCoords([104, 2127, 288, 2131, 452, 2087, 706, 2163, 1629, 2104, 1730, 2131, 1867, 2007, 1769, 1749, 1461, 1718, 1301, 1798, 885, 1806, 839, 1747, 650, 1754, 567, 1776, 474, 1757, 342, 1840, 219, 1813, 165, 1825])
      });
    }
  }, [imageDimensions, imageSize]);


{/* NEW NEW NEW NEW
<map name="image-map">
    <area target="" alt="About" title="About" href="about" coords="635,148,670,24,1005,28,1001,140" shape="poly">
    <area target="" alt="Series" title="Series" href="series" coords="658,234,660,155,712,149,1003,139,1039,124,1023,226,846,246" shape="poly">
    <area target="" alt="Installation" title="Installation" href="installation" coords="789,332,783,243,992,225,1472,210,1461,316" shape="poly">
    <area target="" alt="Studio" title="Studio" href="studio" coords="890,427,907,327,1150,325,1282,323,1268,405,1112,423" shape="poly">
    <area target="" alt="Events" title="Events" href="events" coords="905,509,917,429,1352,402,1337,481,1293,495" shape="poly">
    <area target="" alt="Contact" title="Contact" href="contact" coords="881,584,876,513,1316,493,1370,481,1359,586" shape="poly">
    <area target="" alt="commission" title="commission" href="commissions" coords="828,668,826,590,1450,565,1446,692" shape="poly">
</map>
NEW NEW NEW NEW NEW NEW */}



  const handlePointerDown = (event, soundKey) => {
    if (event.pointerType === 'touch' || event.pointerType === 'pen') {
      handleAreaMouseOver(soundKey, event.pressure);

      let holdTimer = setTimeout(() => {
        if (isSoundOn && sounds[soundKey]) {
          Howler.ctx.resume().then(() => {
            sounds[soundKey].play();
          });
        }
      }, 1000); // Hold duration set to 1000 ms (1 second)

      const clearHoldTimer = () => {
        clearTimeout(holdTimer);
      };

      event.target.addEventListener('pointerup', clearHoldTimer, { once: true });
      event.target.addEventListener('pointercancel', clearHoldTimer, { once: true });
      event.target.addEventListener('pointermove', clearHoldTimer, { once: true });
    }
  };

  return (
    <>
      <Tooltip title="Sound on/off">
        <Button
          type="text"
          icon={!isSoundOn ? <SoundOutlined /> : <SoundFilled />}
          onClick={toggleSound}
        />
      </Tooltip>

      {isImageLoaded && (
        <img
          ref={imgRef}
          src="/images/site/menu/Drawn-Menu-3.png"
          useMap="#image-map"
          style={{ maxHeight: "85vh" }}
        />
      )}

      {isImageLoaded && percentageCoords && imageSize.width > 0 && (
        <map name="image-map">
          <area target="" alt="Ryan Hill" title="Ryan Hill" href="about" coords={percentageCoords.ryanHill} shape="poly" onClick={() => handleAreaMouseOver('ryanHill')} onMouseOver={() => handleAreaMouseOver('ryanHill')} onPointerDown={(e) => handlePointerDown(e, 'ryanHill')} />
          <area target="" alt="Drawing" title="Drawing" href="series" coords={percentageCoords.drawing} shape="poly" onMouseOver={() => handleAreaMouseOver('drawing')} onTouchStart={() => handleAreaMouseOver('drawing')} />
          <area target="" alt="Installation" title="Installation" href="installation" coords={percentageCoords.installation} shape="poly" onMouseOver={() => handleAreaMouseOver('installation')} />
          <area target="" alt="Events" title="Events" href="events" coords={percentageCoords.events} shape="poly" onMouseOver={() => handleAreaMouseOver('events')} />
          <area target="" alt="Studio" title="Studio" href="studio" coords={percentageCoords.studio} shape="poly" onMouseOver={() => handleAreaMouseOver('studio')} />
          <area target="" alt="Contact" title="Contact" href="contact" coords={percentageCoords.contact} shape="poly" onMouseOver={() => handleAreaMouseOver('contact')} onPointerEnter={() => handleAreaMouseOver('contact')} />
        </map>
      )}
{/*       
      <button onClick={playSpacePad}>Play Space Pad</button>
      <button onClick={playBassSynth}>Bass Synth</button>
      <button onClick={playModulatedBass}>Modulated Bass Synth</button>
      <button onClick={playEvolvingNoisePad}>Evolving Noise Pad</button> */}

    </>
  );
};

export default MenuMap;
