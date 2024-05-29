import React, { useRef, useEffect, useState } from 'react';

const MenuMap = () => {
  const imgRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [percentageCoords, setPercentageCoords] = useState([]);

  useEffect(() => {
    const getImageDimensions = () => {
      const img = new Image();
      img.src = "https://api.ryanhill.studio/wp-content/uploads/2024/05/ryan_menu_01.jpg";
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
    };

    getImageDimensions();
  }, []);


  useEffect(() => {
    const updateImageSize = () => {
      if (imgRef.current) {
        const { clientWidth, clientHeight } = imgRef.current;
        setImageSize({ width: clientWidth, height: clientHeight });
      }
    };

    updateImageSize();
    console.log(imageSize)

    window.addEventListener('resize', updateImageSize);

    return () => {
      window.removeEventListener('resize', updateImageSize);
    };
  }, []);

  useEffect(() => {
    const imageRatio = imageSize.width / imageDimensions.width
    console.log("image ratio: ", imageRatio)
    const generatePercentageCoords = (coords) => {
      return coords.map((coord, index) => {
        if (index % 2 === 0) {
          // X-coordinate
          return (coord * imageRatio);
        } else {
          // Y-coordinate
          return (coord * imageRatio);
        }
      });
    };

    setPercentageCoords({
      ryanHill: generatePercentageCoords([104,174,160,583,339,566,368,597,511,551,550,558,594,438,655,416,714,526,856,551,853,593,888,575,922,509,1142,534,1189,588,1235,473,1265,534,1360,536,1458,548,1524,602,1637,553,2053,607,2029,135,104,171,114,203,121,262,116,260,121,262]),
      drawing: generatePercentageCoords([89,593,82,913,817,926,1076,928,1461,911,1588,686,1470,558]),
      installation: generatePercentageCoords([89,930,97,1222,342,1251,359,1143,484,1259,596,1207,995,1229,1262,1134,1287,1229,1465,1109,1539,1298,2222,1303,2193,791,1399,916]),
      events: generatePercentageCoords([97,1233,109,1485,229,1551,278,1487,373,1507,403,1458,640,1451,821,1478,870,1527,1012,1532,1120,1527,1137,1534,1238,1519,1419,1581,1558,1338,1377,1194,1274,1228,1252,1132,941,1250,579,1213,457,1250,376,1135,339,1245]),
      studio: generatePercentageCoords([109,1786,212,1801,342,1830,459,1747,579,1757,675,1742,841,1735,897,1794,1052,1784,1282,1796,1473,1681,1438,1598,1245,1529,895,1524,758,1487,415,1465,368,1522,293,1492,182,1625,114,1595]),
      contact: generatePercentageCoords([104,2127,288,2131,452,2087,706,2163,1629,2104,1730,2131,1867,2007,1769,1749,1461,1718,1301,1798,885,1806,839,1747,650,1754,567,1776,474,1757,342,1840,219,1813,165,1825])
    });
  }, [imageSize, imageDimensions]);

  return (
    <>    
      <img 
        ref={imgRef}
        src="https://api.ryanhill.studio/wp-content/uploads/2024/05/ryan_menu_01.jpg" 
        useMap="#image-map" 
        style={{ maxHeight: "75vh" }}
      />

      <map name="image-map">
        <area target="" alt="Ryan Hill" title="Ryan Hill" href="ryan-hill" coords={percentageCoords.ryanHill} shape="poly" />
        <area target="" alt="Drawing" title="Drawing" href="drawing" coords={percentageCoords.drawing} shape="poly" />
        <area target="" alt="Installation" title="Installation" href="installation" coords={percentageCoords.installation} shape="poly" />
        <area target="" alt="Events" title="Events" href="events" coords={percentageCoords.events} shape="poly" />
        <area target="" alt="Studio" title="Studio" href="studio" coords={percentageCoords.studio} shape="poly" />
        <area target="" alt="Contact" title="Contact" href="contact" coords={percentageCoords.contact} shape="poly" />
      </map>
      {    console.log(imageSize)}
    </>
  );
};

export default MenuMap;
