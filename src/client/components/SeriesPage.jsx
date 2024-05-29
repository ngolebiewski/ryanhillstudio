import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

//seriesFocus is the slug for the series name, i.e. "works-on-paper"
const SeriesPage = ({ seriesFocus }) => {
  const baseURL = import.meta.env.VITE_API;
  const [seriesImages, setSeriesImages] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log(`${baseURL}/media?search=series-${seriesFocus}`)
        const { data } = await axios.get(`${baseURL}/media?search=series-${seriesFocus}`);
        setSeriesImages(data)
      } catch (error) {
        console.error("Error obtaining images from the server.", error);
      }
    };

    fetchImages();
  }, [seriesFocus])

  useEffect(() => {
    // Reset the seriesImages state to null when location changes
    console.log(location.pathname)
    setSeriesImages(null);
  }, [location]);

  return (
    <>
      <div>
        {seriesImages ?
          <div>
            {console.log("i just got the fetched the images", seriesImages)}
            <h2>Here are the images within the {seriesFocus} page:</h2>
            {seriesImages.map((artwork) => (
              <div key={artwork.id}>
                <img key={artwork.id} src={artwork.link} alt={artwork.alt_text} style={{ maxHeight: "40vh" }} />
                <p>{artwork.title.rendered}</p>
                <div dangerouslySetInnerHTML={{ __html: artwork.caption.rendered }} />
              </div>

            ))}
          </div>
          : null}
      </div>
    </>
  )
}

export default SeriesPage;