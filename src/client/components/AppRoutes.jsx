import { Routes, Route } from 'react-router-dom';
import Page from './Page';
import App from '../App';

const AppRoutes = ({ parentPage, setParentPage }) => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route path="/home" element={<App />} /> */}
      {/* <Route path="/ryan-hill" element={<Page />} /> */}
      <Route path="/drawing" element={<Page parentPage={parentPage}/>} />
      {/* <Route path="/installation" element={<Installation />} />
      <Route path="/studio" element={<Studio />} />
      <Route path="/events" element={<Events />} />
      <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  );
}

export default AppRoutes;
