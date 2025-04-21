// src/components/PropertyCarousel.jsx
import React, { useState } from "react";
import Slider from "react-slick";
import PropertyImg from "../../assets/property.jpg"; // Use different images if you have

const images = [PropertyImg, PropertyImg, PropertyImg];

const PropertyCarousel = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  return (
    <div>
      {/* Main Carousel */}
      <Slider
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        arrows={true}
        className="rounded-xl"
      >
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index}`} className="rounded-xl" />
          </div>
        ))}
      </Slider>

      {/* Thumbnails */}
      <Slider
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        slidesToShow={3}
        swipeToSlide
        focusOnSelect
        className="mt-2"
        arrows={true}
      >
        {images.map((img, index) => (
          <div key={index} className="px-1">
            <img src={img} alt={`Thumbnail ${index}`} className="rounded-md h-16" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PropertyCarousel;
