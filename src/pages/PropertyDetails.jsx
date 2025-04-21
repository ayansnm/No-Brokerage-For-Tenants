import React, { useState } from "react";
import Navbar from "../components/Fields/Navbar";
import PropertyImg from "../assets/property.jpg";
import { BsFillHeartFill } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [PropertyImg, PropertyImg, PropertyImg];

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-lg shadow hover:bg-gray-100 z-10"
    onClick={onClick}
  >
    <FaArrowLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-lg shadow hover:bg-gray-100 z-10"
    onClick={onClick}
  >
    <FaArrowRight />
  </button>
);

const PropertyDetails = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  return (
    <div className="bg-[#FAFAFA] min-h-screen poppins-regular">
      <Navbar />
      <div className="w-full flex justify-center p-4">
        <div className="w-full md:w-[90vw] lg:w-[75vw] rounded-2xl p-6">
          {/* Image and Info */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 relative">
              {/* Main Image Carousel */}
              <Slider
                asNavFor={nav2}
                ref={(slider1) => setNav1(slider1)}
                arrows={false}
              >
                {images.map((img, index) => (
                  <div key={index}>
                    <img
                      src={img}
                      alt={`Property ${index}`}
                      className="rounded-xl w-full"
                    />
                  </div>
                ))}
              </Slider>

              {/* Thumbnail Carousel */}
              <div className="relative mt-3">
                <Slider
                  asNavFor={nav1}
                  ref={(slider2) => setNav2(slider2)}
                  slidesToShow={3}
                  swipeToSlide
                  focusOnSelect
                  arrows
                  prevArrow={<PrevArrow />}
                  nextArrow={<NextArrow />}
                  className="mx-6"
                >
                  {images.map((img, index) => (
                    <div key={index} className="px-1">
                      <img
                        src={img}
                        alt={`Thumbnail ${index}`}
                        className="rounded-md h-16 object-cover "
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            {/* Property Info */}
            <div className="md:w-1/2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">₹26,500</p>
                  <p className="text-md text-gray-500">Rent</p>
                </div>
                <BsFillHeartFill className="text-red-500 text-[25px]" />
              </div>
              <hr className="mt-2 text-gray-300" />
              <div className="flex  p-3 items-center">
                <p className="w-1/2">
                  <span className="font-semibold">750 sqft.</span>
                  <br />
                  Size
                </p>
                <p className="w-1/2">
                  <span className="font-semibold">2BHK</span>
                  <br />
                  Format
                </p>
              </div>
              <hr className=" text-gray-300" />
              <div className="flex  p-3 items-center">
                <p className="w-1/2">
                  <span className="font-semibold">Pent house</span>
                  <br />
                  Category
                </p>
                <p className="w-1/2">
                  <span className="font-semibold">Fully furnished</span>
                  <br />
                  Format
                </p>
              </div>
              <hr className=" text-gray-300" />
              <div className="flex  p-3 items-center">
                <p className="w-1/2">
                  <span className="font-semibold">South bopal</span>
                  <br />
                  Area
                </p>
                <p className="w-1/2">
                  <span className="font-semibold">4th Floor</span>
                  <br />
                  Floor
                </p>
              </div>
              <hr className=" text-gray-300" />
              <div className="flex  p-3 items-center">
                <p className="w-1/2">
                  <span className="font-semibold">Negotiable</span>
                  <br />
                  Price
                </p>
                <p className="w-1/2">
                  <span className="font-semibold">Water supply</span>
                  <br />
                  Utility
                </p>
              </div>

            </div>
            
          </div>
          <div className="mt-4">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Address: </span>
                  Vaishnodevi Circle, Ahmedabad I am going to rental this
                  property with full furniture 1 rk studio Vaishnodevi Circle,
                  Ahmedabad I am going to rental this property with full
                  furniture 1 rk studio
                </p>
              </div>

              <button className="mt-6 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full shadow hover:bg-[#01946f]">
                <FaPhoneAlt />
                Call on: +91 12345 67890
              </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
