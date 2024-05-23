import { useEffect, useState } from "react";
import axios from "axios";

const SeriesCard = ({ seriesData }) => {


  const [featuredImage, setFeaturedImage] = useState({})
  const baseURL = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/media/${seriesData.featured_media}`);
        setFeaturedImage({
          url: data.media_details.sizes.large.source_url,
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




  return (
    <>
      <h1>{seriesData.slug.toUpperCase().replaceAll("-"," ")}</h1>
      {featuredImage ? (
        <img className="series-card-image" src={featuredImage.url} alt={featuredImage.alt_text} />
      ) : (
        <h1>Featured Image Loading...</h1>
      )}

      <p>Image number: {seriesData.featured_media}</p>
    </>
  )
}

export default SeriesCard;