import AudioTest from "./components/AudioTest";
import { Routes, Route } from "react-router-dom";
import MenuMap from "./components/MenuMap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArtMenu from "./components/ArtMenu";
import { useState } from "react";
import Page from "./components/Page";

function App() {
  const [parentPage, setParentPage] = useState("home");

  return (
    <>
      <Header />
      <ArtMenu parentPage={parentPage} setParentPage={setParentPage} />
      <Routes>
        <Route path="/" element={<Page parentPage={"home"} setParentPage={setParentPage} />} />
        <Route path="/ryan-hill" element={<Page parentPage={"ryan-hill"} setParentPage={setParentPage} />} />
        <Route path="/drawing" element={<Page parentPage={"drawing"} setParentPage={setParentPage} />} />
        <Route path="/installation" element={<Page parentPage={"installation"} setParentPage={setParentPage} />} />
        <Route path="/studio" element={<Page parentPage={"studio"} setParentPage={setParentPage} />} />
        <Route path="/events" element={<Page parentPage={"events"} setParentPage={setParentPage} />} />
        <Route path="/contact" element={<Page parentPage={"contact"} setParentPage={setParentPage} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;