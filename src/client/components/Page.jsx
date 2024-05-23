import { useEffect, useState } from "react";
import axios from "axios";
import SeriesCard from "./SeriesCard";

const Page = ({ parentPage, setParentPage }) => {
  const baseURL = import.meta.env.VITE_API;
  const [pageData, setPageData] = useState({});
  const [pageDescription, setPageDescription] = useState("Loading...");
  const [pageImages, setPageImages] = useState([]);
  const [childPages, setChildPages] = useState([]); //each an object

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
    <>
      <h5>This is the current page: {parentPage.toUpperCase()}</h5>
      <div dangerouslySetInnerHTML={{ __html: pageDescription }} />

      <div>
        {childPages.length > 0 ? (
          childPages.map((seriesData) => (
            <div key={seriesData.id} className="series-card">
            <SeriesCard  seriesData={seriesData} />
            </div>
          ))
          
          ) : (
          <h1>No FORMS</h1>
        )}
      </div>


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
      </div>
    </>
  );
};

export default Page;
