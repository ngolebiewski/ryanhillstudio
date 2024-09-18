import React, { useState } from 'react';

const FullscreenSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="relative w-full h-full">
        {/* Current Image */}
        <img
          src={images[currentIndex]}
          alt="Slide"
          className="object-cover w-full h-full"
        />

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-4"
        >
          Prev
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-4"
        >
          Next
        </button>
      </div>
    </div>
  );
};
