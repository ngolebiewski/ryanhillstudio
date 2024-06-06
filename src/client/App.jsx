import { Routes, Route } from "react-router-dom";
import MenuMap from "./components/MenuMap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArtMenu from "./components/ArtMenu";
import { useState } from "react";
import Page from "./components/Page";
import Home from "./components/Home";
import Studio from "./components/Studio";
import MainMenu from "./components/MainMenu";
import SoundMachine from "./components/SoundMachine";

function App() {
  const [parentPage, setParentPage] = useState("home");

  return (
    <>
      <div id="nav">
        <MainMenu parentPage={parentPage} setParentPage={setParentPage} />
        <Header setParentPage={setParentPage} />
        <SoundMachine />
        {/* <ArtMenu parentPage={parentPage} setParentPage={setParentPage} /> */}
      </div>

      <section id="center-container">
        <Routes>
          <Route path="/" element={<Home parentPage={"home"} setParentPage={setParentPage} />} />
        </Routes>
      </section>

      <section id="main-container">
        <Routes>
          <Route path="/ryan-hill" element={<Page parentPage={"ryan-hill"} setParentPage={setParentPage} />} />
          <Route path="/drawing" element={<Page parentPage={"drawing"} setParentPage={setParentPage} />} />
          <Route path="/installation" element={<Page parentPage={"installation"} setParentPage={setParentPage} />} />
          <Route path="/studio" element={<Studio parentPage={"studio"} setParentPage={setParentPage} />} />
          <Route path="/events" element={<Page parentPage={"events"} setParentPage={setParentPage} />} />
          <Route path="/contact" element={<Page parentPage={"contact"} setParentPage={setParentPage} />} />
        </Routes>
      </section>
      <Footer />
    </>
  );
}

export default App;