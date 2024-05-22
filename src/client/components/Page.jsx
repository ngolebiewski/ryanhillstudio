import { useEffect, useState } from "react";
import axios from "axios";

const Page = ({ parentPage, setParentPage }) => {
  const baseURL = import.meta.env.VITE_API;
  const [pageData, setPageData] = useState({});
  const [pageDescription, setPageDescription] = useState("Loading...");
  const [pageImages, setPageImages] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/pages?slug=${parentPage}`);
        setPageData(response.data);
        if (response.data.length > 0 && response.data[0].content) {
          setPageDescription(response.data[0].content.rendered);
        } else {
          setPageDescription("Page not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setPageDescription("Error fetching data");
      }
    };

    const fetchImages = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/media?search=series-${parentPage}`);
        setPageImages(data);
      }
      catch (error) {
        console.error("No images to be found.")
      }
    }

    fetchData(); 
    fetchImages();
    console.log(pageImages)

  }, [parentPage])


  return (
    <>
      <h5>This is the curent "parent" page: {parentPage.toUpperCase()}</h5>
      <div dangerouslySetInnerHTML={{ __html: pageDescription }} />
      <div>
      <h1>IMAGES</h1>
      {pageImages.length > 0 ? (
        // Render images if pageImages array is not empty
        pageImages.map((pic) => (
          <div key={pic.id} >
            <img key={pic.id} src={pic.link} alt={pic.alt_text} style={{ maxHeight: "50vh" }}/>
            <p>{pic.title.rendered}</p>
            <div dangerouslySetInnerHTML={{ __html: pic.caption.rendered }} />
          </div>
        ))
      ) : (
        // Render loading message if pageImages array is empty
        <h1></h1>
        //Set something if no images are found. Perhaps time out images loading after 3 seconds and then show nothing.
      )}
    </div>
    </>
  )
}

export default Page;