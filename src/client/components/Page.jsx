import { useEffect, useState } from "react";
import axios from "axios";
import SeriesCard from "./SeriesCard";
import SeriesPage from "./SeriesPage";
import ContactForm from "./ContactForm";

const Page = ({ parentPage, setParentPage }) => {
  const baseURL = import.meta.env.VITE_API;
  const [pageData, setPageData] = useState({});
  const [pageDescription, setPageDescription] = useState("Loading...");
  const [pageImages, setPageImages] = useState([]);
  const [childPages, setChildPages] = useState([]); //each an object
  const [seriesFocus, setSeriesFocus] = useState(); //slug for selected button i.e. "works-on-paper"
  const [seriesArtworks, setSeriesArtworks] = useState([]); //stores all the images plus descriptive text in a series 
  const [seriesDescription, setSeriesDescription] = useState({}); //make hash table for series descriptions

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/pages?slug=${parentPage}`);
        const data = response.data;
        if (data.length > 0 && data[0].content) {
          setPageData(data[0]);
          setPageDescription(data[0].content.rendered);
        } else {
          setPageDescription("Page not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setPageDescription("Error fetching data");
      }
    };

    fetchData();
  }, [parentPage, baseURL]);

  useEffect(() => {
    const fetchChildPages = async () => {
      if (!pageData.id) return;
      try {
        const { data } = await axios.get(`${baseURL}/pages?parent=${pageData.id}`);
        setChildPages(data);
        console.log(`Child Pages Fetched:`);
        console.log({ data })
      } catch (error) {
        console.error("Error fetching children page data", error);
      }
    };

    fetchChildPages();
  }, [pageData.id, baseURL]);

  useEffect(() => {
    if (childPages.length === 0) return;

    const fetchSeriesDescriptions = async () => {
      try {
        const descriptionPromises = childPages.map((page) =>
          axios.get(`${baseURL}/pages/${page.id}`).then((response) => ({
            slug: page.slug,
            description: response.data.content.rendered,
          }))
        );

        const descriptions = await Promise.all(descriptionPromises);
        const descriptionHash = descriptions.reduce((acc, { slug, description }) => {
          acc[slug] = description;
          return acc;
        }, {});

        setSeriesDescription(descriptionHash);
        console.log("series description hash", descriptionHash);
      } catch (error) {
        console.error("Error fetching series descriptions", error);
      }
    };

    fetchSeriesDescriptions();
  }, [childPages, baseURL]);


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

  return (
    <div className="sub-container">
      <div className="sub-header">
        <h1>{parentPage.toUpperCase()}</h1>
        <div dangerouslySetInnerHTML={{ __html: pageDescription }} />
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

        <SeriesPage seriesFocus={seriesFocus} setSeriesFocus={setSeriesFocus} description={seriesDescription[seriesFocus]} />
      </div>
      {/* 
      <div>
        {pageImages.length > 0 ? (
          pageImages.map((pic) => (
            <div key={pic.id}>
              <img src={pic.link} alt={pic.alt_text} style={{ maxHeight: "50vh" }} />
              <p>{pic.title.rendered}</p>
              <div dangerouslySetInnerHTML={{ __html: pic.caption.rendered }} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div> */}

      {/* Un comment this code below to add in the contact form */}
      {/* {parentPage === 'contact' ? <div><h1>Contact</h1><ContactForm /></div> : null} */}
    </div>
  );
};

export default Page;
