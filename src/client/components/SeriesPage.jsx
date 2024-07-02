import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { updateImageInHash } from "../redux/pageSlice";

const SeriesPage = () => {
  const baseURL = import.meta.env.VITE_API;
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pages.currentPage);
  
  // Ensure `seriesFocus` is computed only if `page` and `page.title` are defined
  const seriesFocus = page && page.title ? page.title.rendered.replace(/\s+/g, '-').toLowerCase() : null;
  
  // Access the image hash from the state using seriesFocus
  const imageHash = useSelector((state) => state.pages.imageHash[seriesFocus]);
  console.log("series focus", seriesFocus);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/media?search=series-${seriesFocus}`);
        console.log(seriesFocus)

        // Sort data based on number after series name within the media description, e.g., "series-sketches-10"
        const regex = new RegExp(`series-${seriesFocus}-(\\d+)[^0-9]`);
        data.sort((a, b) => {
          const aMatch = a.description.rendered.match(regex);
          const bMatch = b.description.rendered.match(regex);
          const aNum = aMatch ? parseInt(aMatch[1], 10) : 0;
          const bNum = bMatch ? parseInt(bMatch[1], 10) : 0;
          return aNum - bNum;
        });

        dispatch(updateImageInHash({ seriesKey: seriesFocus, images: data }));
      } catch (error) {
        console.error("Error obtaining images from the server.", error);
      }
    };

    // Fetch images only if they are not already in the imageHash
    if (seriesFocus && !imageHash) {
      fetchImages();
    }
  }, [baseURL, seriesFocus, dispatch, imageHash]);

  return (
    <div className="series-page">
      {imageHash ? (
        <div className="series-images">
          {imageHash.map((artwork) => {
            // Use large size if available, otherwise fallback to medium or thumbnail
            const imageUrl = artwork.media_details.sizes.large?.source_url ||
                             artwork.media_details.sizes.medium?.source_url ||
                             artwork.media_details.sizes.thumbnail?.source_url;

            return (
              <div key={artwork.id} className="series-image">
                {imageUrl ? (
                  <img src={imageUrl} alt={artwork.alt_text} />
                ) : (
                  <p>No image available</p>
                )}
                <div dangerouslySetInnerHTML={{ __html: artwork.caption.rendered }} />
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default SeriesPage;
