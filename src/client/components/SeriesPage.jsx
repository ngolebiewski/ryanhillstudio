import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { updateImageInHash } from "../redux/pageSlice";
import { useSwipeable } from 'react-swipeable';

const SeriesPage = () => {
  const baseURL = import.meta.env.VITE_API;
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pages.currentPage);
  const seriesFocus = page?.title?.rendered.replace(/\s+/g, '-').toLowerCase();
  const imageHash = useSelector((state) => state.pages.imageHash[seriesFocus]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/media?search=series-${seriesFocus}`);
        const regex = new RegExp(`series-${seriesFocus}-(\\d+)[^0-9]`);
        const sortedImages = data.sort((a, b) => {
          const aNum = parseInt(a.description.rendered.match(regex)?.[1] || 0, 10);
          const bNum = parseInt(b.description.rendered.match(regex)?.[1] || 0, 10);
          return aNum - bNum;
        });

        dispatch(updateImageInHash({ seriesKey: seriesFocus, images: sortedImages }));
      } catch (error) {
        console.error("Error obtaining images from the server.", error);
      }
    };

    if (seriesFocus && !imageHash) {
      fetchImages();
    }
  }, [baseURL, seriesFocus, dispatch, imageHash]);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [currentIndex, imageHash]);

  const handleNext = () => {
    if (imageHash && currentIndex < imageHash.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentImage = imageHash && imageHash[currentIndex];

  // Swipeable configuration
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    delta: 10, // minimum distance (in pixels) to detect a swipe
  });

  return (
    <div
      className="relative w-full h-screen bg-white overflow-hidden"
      {...handlers}
    >
      {currentImage ? (
        <div className="flex flex-col items-center justify-center h-full w-full">
          {/* Image Section */}
          <div className="relative flex-grow w-full flex items-center justify-center">
            <img
              src={currentImage.media_details.sizes.large?.source_url ||
                   currentImage.media_details.sizes.medium?.source_url ||
                   currentImage.media_details.sizes.thumbnail?.source_url}
              alt={currentImage.alt_text}
              className="object-contain w-full max-h-[80vh]"  // Set max height to 80% of viewport height
            />
            {/* Previous Button */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-3xl"
              >
                &lt;
              </button>
            )}
            {/* Next Button */}
            {currentIndex < imageHash.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black text-3xl"
              >
                &gt;
              </button>
            )}
          </div>

          {/* Caption Section */}
          <div className="text-center mt-4 px-4">
            <div
              className="art-title mb-2 text-lg font-semibold"
              dangerouslySetInnerHTML={{ __html: currentImage.title.rendered }}
            />
            <div
              className="art-caption text-gray-700"
              dangerouslySetInnerHTML={{ __html: currentImage.caption.rendered }}
            />
          </div>
        </div>
      ) : (
        <p className="text-gray-800 text-center">Loading images...</p>
      )}
    </div>
  );
};

export default SeriesPage;
