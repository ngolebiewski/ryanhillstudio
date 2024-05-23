const MenuMap = () => {

  return (
    <>
      <img src="https://api.ryanhill.studio/wp-content/uploads/2024/05/ryan_menu_01.jpg" style={{ maxHeight: "75vh" }}/>
    </>
  )
}

export default MenuMap;

// import { useNavigate } from 'react-router-dom';

// const getPolygonPoints = (coords) => {
//   return coords.map((coord, index) => {
//     return index % 2 === 0 ? `${coord}%` : `${coord}%`;
//   }).join(',');
// };


// const MenuMap = ({ setParentPage, navigateToPage }) => {
//   const areas = [
//     { name: 'Ryan Hill', shape: 'poly', coords: [104,174,160,583,339,566,368,597,511,551,550,558,594,438,655,416,714,526,856,551,853,593,888,575,922,509,1142,534,1189,588,1235,473,1265,534,1360,536,1458,548,1524,602,1637,553,2053,607,2029,135,104,171,114,203,121,262,116,260,121,262], href: 'ryan-hill' },
//     { name: 'Drawing', shape: 'poly', coords: [89,593,82,913,817,926,1076,928,1461,911,1588,686,1470,558], href: 'drawing' },
//     { name: 'Installation', shape: 'poly', coords: [89,930,97,1222,342,1251,359,1143,484,1259,596,1207,995,1229,1262,1134,1287,1229,1465,1109,1539,1298,2222,1303,2193,791,1399,916], href: 'installation' },
//     { name: 'Events', shape: 'poly', coords: [97,1233,109,1485,229,1551,278,1487,373,1507,403,1458,640,1451,821,1478,870,1527,1012,1532,1120,1527,1137,1534,1238,1519,1419,1581,1558,1338,1377,1194,1274,1228,1252,1132,941,1250,579,1213,457,1250,376,1135,339,1245], href: 'events' },
//     { name: 'Studio', shape: 'poly', coords: [109,1786,212,1801,342,1830,459,1747,579,1757,675,1742,841,1735,897,1794,1052,1784,1282,1796,1473,1681,1438,1598,1245,1529,895,1524,758,1487,415,1465,368,1522,293,1492,182,1625,114,1595], href: 'studio' },
//     { name: 'Contact', shape: 'poly', coords: [104,2127,288,2131,452,2087,706,2163,1629,2104,1730,2131,1867,2007,1769,1749,1461,1718,1301,1798,885,1806,839,1747,650,1754,567,1776,474,1757,342,1840,219,1813,165,1825], href: 'contact' }
//   ];

//   const navigate = useNavigate();

//   const handleAreaClick = (area) => {
//     setParentPage(area.href);
//     navigateToPage(area.href); // Use navigateToPage from props
//     console.log(`Clicked on ${area.href}`);
//   };

//   return (
//     <>
//       <div style={{ position: 'relative', height: '75vh', overflow: 'hidden' }}>
//         <img
//           src="https://api.ryanhill.studio/wp-content/uploads/2024/05/ryan_menu_01.jpg"
//           style={{ width: '100%', height: '100%', objectFit: 'contain' }}
//           alt="Menu"
//         />
//         <svg viewBox="0 0 2282 2282" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
//           {areas.map((area, index) => {
//             const points = getPolygonPoints(area.points);
//             console.log(`Rendering Link for ${area.title} with points: ${points}`);
//             return (
//               <a
//                 key={index}
//                 href={area.href} // Use href attribute instead of Link component
//                 onClick={(e) => {
//                   e.preventDefault(); // Prevent default anchor tag behavior
//                   handleAreaClick(area); // Pass area to handleAreaClick function
//                 }}
//                 aria-label={area.name}
//                 style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
//               >
//                 <polygon points={points} fill="transparent" stroke="none" />
//               </a>
//             );
//           })}
//         </svg>
//       </div>
//     </>
//   );
// };

// export default MenuMap;
