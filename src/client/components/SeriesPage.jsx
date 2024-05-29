import { useEffect, useState } from "react";
import axios from "axios";

//seriesFocus is the slug for the series name, i.e. "works-on-paper"
const SeriesPage = ({ seriesFocus }) => {
  const baseURL = import.meta.env.VITE_API;
  const [seriesImages, setSeriesImages] = useState(null);

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
    console.log("i just fetched the images", seriesImages)
  }, [seriesFocus])

  return (
    <>
      <h1>This is the SERIES PAGE.<br />
        {seriesFocus}
      </h1>

      <div>
        {seriesImages ?
          <div>
            <h2>Here are the images within that page:</h2>
            {seriesImages.map((artwork) => (
              <div key={artwork.id}>
                <img key={artwork.id} src={artwork.link} alt={artwork.alt_text} style={{ maxHeight: "40vh" }} />
                <p>{artwork.title.rendered}</p>
                <div dangerouslySetInnerHTML={{ __html: artwork.caption.rendered }} />
              </div>

            ))}
          </div>


          : <h1>Images loading...</h1>}


      </div>
    </>
  )
}

export default SeriesPage;