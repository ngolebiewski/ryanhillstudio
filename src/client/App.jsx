import { Routes, Route } from "react-router-dom";
import MenuMap from "./components/MenuMap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArtMenu from "./components/ArtMenu";
import { useState, useEffect } from "react";
import Page from "./components/Page";
import Home from "./components/Home";
import Studio from "./components/Studio";
import MainMenu from "./components/MainMenu";
import SoundMachine from "./components/SoundMachine";
import axios from "axios";
import { updatePages, resetPages, setPageHierarchy } from "./redux/pageSlice";
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const baseURL = import.meta.env.VITE_API;
  const [parentPage, setParentPage] = useState("home");
  const dispatch = useDispatch()
  const sitePages = useSelector((state) => state.pages.sitePages)
  const menuPageHierarchy = useSelector((state) => state.pages.pageHierarchy);

  //get dynamic page data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/pages?per_page=100&_embed`);
        dispatch(updatePages(data))
      } catch (error) {
        console.error("Error fetching data:", error);
        setPageDescription("Error fetching data");
      }
    };

    fetchData();
    console.log(sitePages)
  }, [dispatch]);

    // Log sitePages after it changes
    useEffect(() => {
      if (Object.keys(sitePages).length > 0) {
        console.log('sitePages:', sitePages);
      }
    }, [sitePages]);

   // Process and log sitePages hierarchy after it changes
useEffect(() => {
  if (Object.keys(sitePages).length > 0) {
    // Sort sitePages by menu_order
    const sortedPages = [...sitePages].sort((a, b) => a.menu_order - b.menu_order);

    // Process parent-child relationships
    const pagesById = {};
    sortedPages.forEach((page) => {
      pagesById[page.id] = { ...page }; // Create a shallow copy
    });

    const pagesHierarchy = sortedPages
      .map((page) => {
        if (page.parent !== 0) {
          const parent = pagesById[page.parent];
          if (parent) {
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(pagesById[page.id]); // Use the copied version
          }
        }
        return pagesById[page.id]; // Use the copied version
      })
      .filter((page) => page.parent === 0); // Only keep top-level pages

    console.log('pagesHierarchy:', pagesHierarchy);
    dispatch(setPageHierarchy(pagesHierarchy)); // Update Redux state with the hierarchy
  }
}, [sitePages]);


  return (
    <>
      <div id="nav">
        <MainMenu parentPage={parentPage} setParentPage={setParentPage} />
        <Header setParentPage={setParentPage} />
        {/* <SoundMachine /> */}
        <Footer />
        {/* <ArtMenu parentPage={parentPage} setParentPage={setParentPage} /> */}
      </div>

      <section id="center-container">
        <Routes>
          <Route path="/" element={<Home parentPage={"home"} setParentPage={setParentPage} />} />
          <Route path="/studio*" element={<Studio parentPage={"studio"} setParentPage={setParentPage} />} />
        </Routes>
      </section>

      <section id="main-container">
        <Routes>
          <Route path="/ryan-hill" element={<Page parentPage={"ryan-hill"} setParentPage={setParentPage} />} />
          <Route path="/drawing/*" element={<Page parentPage={"drawing"} setParentPage={setParentPage} />} />
          <Route path="/installation/*" element={<Page parentPage={"installation"} setParentPage={setParentPage} />} />
   
          <Route path="/events/*" element={<Page parentPage={"events"} setParentPage={setParentPage} />} />
          <Route path="/contact/*" element={<Page parentPage={"contact"} setParentPage={setParentPage} />} />
        </Routes>
      </section>
      {/* <Footer /> */}
     
  {menuPageHierarchy.map((page) => (
    <div key={page.id}>
      <h1>{page.title.rendered}</h1>
    </div>
  ))}

    </>
  );
}

export default App;