import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

//seriesFocus is the slug for the series name, i.e. "sketches"
const SeriesPage = ({ seriesFocus }) => {
  const baseURL = import.meta.env.VITE_API;
  const [seriesImages, setSeriesImages] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log(`${baseURL}/media?search=series-${seriesFocus}`)
        const { data } = await axios.get(`${baseURL}/media?search=series-${seriesFocus}`);

        // Sort data based on number after series name within the description, i.e. "series-sketches-10" vs. "series-sketches-20"
        const regex = new RegExp(`series-${seriesFocus}-(\\d+)[^0-9]`);

        // Sort data based on the number extracted from the description using Regular Expressions
        data.sort((a, b) => {
          const aMatch = a.description.rendered.match(regex);
          const bMatch = b.description.rendered.match(regex);

          const aNum = aMatch ? parseInt(aMatch[1], 10) : 0;
          const bNum = bMatch ? parseInt(bMatch[1], 10) : 0;

          return aNum - bNum;
        });


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
            {/* <h2>Here are the images within the {seriesFocus} page:</h2> */}
            {seriesImages.map((artwork) => (
              <div key={artwork.id}>
                <img key={artwork.id} src={artwork.link} alt={artwork.alt_text} style={{ maxHeight: "40vh" }} />
                <p className="courier-prime-regular-italic">{artwork.title.rendered}</p>
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