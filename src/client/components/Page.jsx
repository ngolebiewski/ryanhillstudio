import { useEffect, useState } from "react";
import axios from "axios";
import SeriesCard from "./SeriesCard";
import SeriesPage from "./SeriesPage";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, resetCurrentPage } from "../redux/pageSlice";

const Page = ({ parentPage, setParentPage }) => {
  const baseURL = import.meta.env.VITE_API;
  const sitePages = useSelector((state) => state.pages.sitePages);
  const dispatch = useDispatch();
  const currentPageObject = useSelector((state) => state.pages.currentPage)

  //Get the location, urls are dynamic, so useParams is weird.
  const location = useLocation();
  const fullPath = location.pathname;
  const segments = fullPath.split('/');
  const currentPath = segments[segments.length - 1];
  console.log("***current path***: ",currentPath)
  

  //old
  const [pageData, setPageData] = useState({});
  const [pageDescription, setPageDescription] = useState("Loading...");
  const [pageImages, setPageImages] = useState([]);
  const [childPages, setChildPages] = useState([]); //each an object
  const [seriesFocus, setSeriesFocus] = useState(); //slug for selected button i.e. "works-on-paper"
  const [seriesArtworks, setSeriesArtworks] = useState([]); //stores all the images plus descriptive text in a series 
  const [seriesDescription, setSeriesDescription] = useState({}); //make hash table for series descriptions


  useEffect(() => {
    dispatch(resetCurrentPage())
  },[])

  useEffect(() => {
    if (currentPath && sitePages) {
      const matchingPage = Object.values(sitePages).find(page => 
        page.title.rendered.replace(/\s+/g, '-').toLowerCase() === currentPath
      );
      
      if (matchingPage) {
        dispatch(setCurrentPage(matchingPage));
        setParentPage(matchingPage.title.rendered);
        console.log("current page set: ")
      }
    }
  }, [currentPath, dispatch]);

  useEffect(()=>{
    console.log(currentPageObject)
  },[currentPageObject])


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/media?search=series-${parentPage}`);
        setPageImages(data);
      } catch (error) {
        console.error("No images to be found.", error);
      }
    };

    fetchImages();
  }, [parentPage, baseURL]);

  console.log(currentPageObject.pageDescription)
  return (
    <div className="sub-container">
      <div className="sub-header">
        <h1>{parentPage.toUpperCase()}</h1>
        { currentPageObject.content?
        <div dangerouslySetInnerHTML={{ __html: currentPageObject.content.rendered}} /> :
        <></>
}
      </div>

      <div className="series-section">
        {childPages.length > 0 ? (
          childPages.map((seriesData) => (
            <div key={seriesData.id} className="series-card">
              <SeriesCard seriesData={seriesData} seriesFocus={seriesFocus} setSeriesFocus={setSeriesFocus} />
            </div>
          ))
          
        ) : (
          // <h1>Loading the series from this project...</h1>
          null
        )}
      </div>

      <div>


{/* Render series cards only if there are children */}
{console.log("About to render button")}
***
{currentPageObject.children && (
  
  <>
  {console.log("There are kids")}
    <p>Yo!</p>
    {currentPageObject.children.map((seriesData) => (
      <button onClick={() => handleButtonClick(seriesData.id)}>Child {seriesData.id}</button>
    ))}
  </>
)}


      </div>

      <div>
        <SeriesPage seriesFocus={seriesFocus} setSeriesFocus={setSeriesFocus} description={seriesDescription[seriesFocus]} />
      </div>
      
    </div>
  );
};

export default Page;
