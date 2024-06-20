import { useEffect, useState } from "react";
import axios from "axios";
import SeriesPage from "./SeriesPage";

const SeriesCard = ({ seriesData, seriesFocus, setSeriesFocus }) => {


  const [featuredImage, setFeaturedImage] = useState({})
  const baseURL = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/media/${seriesData.featured_media}`);
        setFeaturedImage({
          url: data.media_details.sizes.medium.source_url,
          alt_text: data.alt_text
        });
        console.log(featuredImage);
      } catch (error) {
        console.error("No image found");
      }
    };

    if (seriesData && seriesData.featured_media) {
      fetchImage();
    }
  }, [seriesData]);

  const handleSeriesClick = () => {
    setSeriesFocus(seriesData.slug);
    console.log(seriesFocus);
    // navigate(`/series/${seriesData.slug}`);
  };

  return (
    <div onClick={handleSeriesClick}>
      <h1>{seriesData.slug.toUpperCase().replaceAll("-"," ")}</h1>
      {featuredImage ? (
        <img className="series-card-image" src={featuredImage.url} alt={featuredImage.alt_text} />
      ) : (
        <h1>Featured Image Loading...</h1>
      )}

      {/* <p>Image number: {seriesData.featured_media}</p> */}
      {/* {seriesFocus===seriesData.slug? <SeriesPage /> : null} */}
    </div>
  )
}

export default SeriesCard;