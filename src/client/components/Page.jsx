import { useEffect, useState } from "react";
import axios from "axios";

const Page = ({ parentPage, setParentPage }) => {
  const baseURL = import.meta.env.VITE_API;
  const [pageData, setPageData] = useState({});
  const [pageDescription, setPageDescription] = useState("Loading...");
  

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

    fetchData(); 
  }, [parentPage])


  return (
    <>
      <h5>This is the curent "parent" page: {parentPage.toUpperCase()}</h5>
      <div dangerouslySetInnerHTML={{ __html: pageDescription }} />
    </>
  )
}

export default Page;