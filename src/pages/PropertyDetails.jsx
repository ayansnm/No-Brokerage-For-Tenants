import React, { useEffect, useState } from "react";
import Navbar from "../components/Fields/Navbar";
import { BsFillHeartFill, BsShareFill } from "react-icons/bs";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdApartment, MdVerified } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import useGetPropertyDetails from "../hooks/broker-hooks/useGetPropertyDetails";
import Footer from "../components/Fields/Footer";
import PropertyFeature from "./PropertyFeature";
import AgentCard from "./AgentCard";
import SimilarProperties from "./SimilarProperties";
import PropertyHighlights from "./PropertyHighlights";

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 z-10 text-gray-800"
    onClick={onClick}
    aria-label="Previous image"
  >
    <IoIosArrowBack size={20} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 z-10 text-gray-800"
    onClick={onClick}
    aria-label="Next image"
  >
    <IoIosArrowForward size={20} />
  </button>
);

const PropertyDetails = () => {
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentFullScreenIndex, setCurrentFullScreenIndex] = useState(0);
  const { id } = useParams();

  const { loading, property, getPropertyDetails } = useGetPropertyDetails();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (id) {
      getPropertyDetails(id);
    }
  }, [id]);



  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (!property)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Property not found
      </div>
    );

  const {
    images = [],
    title,
    price,
    size,
    floor,
    description,
    type,
    area,
    category,
    format,
    sizeType,
    furnished,
    status,
    postedBy,
    location,
    bedrooms,
    bathrooms,
    amenities = [],
  } = property;

  const uniqueImages = [...new Set(images)];

  const mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const thumbnailSliderSettings = {
    slidesToShow: Math.min(uniqueImages.length, 4),
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(uniqueImages.length, 3),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(uniqueImages.length, 2),
        },
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen poppins-regular">
      <Navbar />

      {/* Main Property Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:w-2/3">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    href="/broker/dashboard"
                    className="inline-flex items-center text-gray-600 hover:text-primary"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    /
                    <a
                      href="/properties"
                      className="ml-1 text-gray-600 hover:text-primary md:ml-2"
                    >
                      Property Details
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="p-3 mb-5 rounded-xl ">
              {/* Property Title */}
              <h1 className="text-3xl font-bold mb-2 p-3">{title}</h1>
              <div className="bg-white rounded-xl border border-gray-300 shadow-md overflow-hidden mb-8">
                {uniqueImages.length <= 1 ? (
                  <img
                    src={`${API_URL}/${uniqueImages[0]}`}
                    alt={`Property 0`}
                    className="w-full h-96 object-cover cursor-pointer"
                    onClick={() => {
                      setCurrentFullScreenIndex(0);
                      setIsFullScreen(true);
                    }}
                  />
                ) : (
                  <>
                    <Slider
                      {...mainSliderSettings}
                      asNavFor={nav2}
                      ref={setNav1}
                    >
                      {uniqueImages.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={`${API_URL}/${img}`}
                            alt={`Property ${index}`}
                            className="w-full h-[500px] object-cover cursor-pointer"
                            onClick={() => {
                              setCurrentFullScreenIndex(index);
                              setIsFullScreen(true);
                            }}
                          />
                        </div>
                      ))}
                    </Slider>

                    <div className="p-4 pt-9 border-t border-gray-300">
                      <Slider
                        {...thumbnailSliderSettings}
                        asNavFor={nav1}
                        ref={setNav2}
                        beforeChange={(oldIndex, newIndex) =>
                          setSelectedThumbIndex(newIndex)
                        }
                      >
                        {uniqueImages.map((img, index) => (
                          <div key={index} className="px-1">
                            <img
                              src={`${API_URL}/${img}`}
                              alt={`Thumbnail ${index}`}
                              className={`h-36 w-full object-cover rounded-md cursor-pointer transition-all duration-200 ${
                                index === selectedThumbIndex
                                  ? "border-4 border-primary shadow-lg"
                                  : "border-4 border-gray-300"
                              }`}
                              onClick={() => {
                                setCurrentFullScreenIndex(index);
                                setIsFullScreen(true);
                              }}
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </>
                )}
              </div>

              {/* Property Highlights */}
              <PropertyHighlights
                price={price}
                bedrooms={bedrooms}
                bathrooms={bathrooms}
                area={size}
                sizeType={sizeType}
              />
            </div>

            {/* Property Description */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-300">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            {/* Property Features */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-300">
              <h2 className="text-xl font-bold mb-4">Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <PropertyFeature
                  icon={<MdApartment />}
                  label="Type"
                  value={type}
                />
                <PropertyFeature
                  icon={<FaRulerCombined />}
                  label="Area"
                  value={`${size} ${sizeType}`}
                />
                <PropertyFeature
                  icon={<MdVerified />}
                  label="Furnishing"
                  value={furnished}
                />
                <PropertyFeature
                  icon={<MdVerified />}
                  label="Status"
                  value={status}
                />
                <PropertyFeature
                  icon={<MdVerified />}
                  label="Area"
                  value={area}
                />
              </div>
            </div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8 ">
                <h2 className="text-xl font-bold mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-4">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
                    >
                      <span className="text-primary">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Map */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-300">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map would be displayed here</p>
              </div>
              <div className="mt-4">
                <p className="font-semibold">Address: </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <FaMapMarkerAlt />
                  {area}
                </p>
                <p className="text-gray-700">{location?.address}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Agent and Contact */}
          <div className="lg:w-1/3 space-y-6">
            <AgentCard agent={postedBy} price={price} propertyTitle={title} />
          </div>
        </div>
      </div>

      

      <Footer />
    </div>
  );
};

export default PropertyDetails;