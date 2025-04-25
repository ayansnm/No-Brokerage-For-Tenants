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
                    {/* <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 20V14H14V20H19V12H16L10 3L4 12H1V20H6V14H10V20Z" />
                    </svg> */}
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    /
                    {/* <svg
                      className="w-4 h-4 text-gray-400 mx-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 9L12 15L18 9H6Z" />
                    </svg> */}
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

            {/* Property Title */}
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <FaMapMarkerAlt className="text-primary" />
              <span>{location}</span>
            </div>

            {/* Image Gallery */}
            <div className="p-3 mb-5 bg-white rounded-xl border border-gray-300">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                {uniqueImages.length <= 1 ? (
                  <img
                    src={`${API_URL}/${uniqueImages[0]}`}
                    alt={`Property 0`}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <>
                    <div className="relative">
                      {/* Heart Icon - stays fixed in the top-right corner */}
                      <button
                        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                        onClick={() => setIsFavorite(!isFavorite)}
                        aria-label={
                          isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <BsFillHeartFill
                          className={
                            isFavorite ? "text-red-500" : "text-gray-400"
                          }
                        />
                      </button>

                      {/* Main Image Slider */}
                      <Slider
                        {...mainSliderSettings}
                        asNavFor={nav2}
                        ref={setNav1}
                      >
                        {uniqueImages.map((img, index) => (
                          <div key={index}>
                            <img
                              src={`${API_URL}/${img}`}
                              alt={`Property ${index}`}
                              className="w-full h-96 object-cover"
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>

                    <div className="p-4 pt-9">
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
                              className={`h-20 w-full object-cover rounded-md cursor-pointer transition-all duration-200 ${
                                index === selectedThumbIndex
                                  ? "border-4 border-primary shadow-lg"
                                  : "border border-gray-300"
                              }`}
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
                {/* <PropertyFeature icon={<FaBed />} label="Bedrooms" value={bedrooms || "N/A"} /> */}
                {/* <PropertyFeature icon={<FaBath />} label="Bathrooms" value={bathrooms || "N/A"} /> */}
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
              {/* <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map would be displayed here</p>
              </div> */}
              <div className="mt-4">
                {/* <p className="font-semibold">Address: </p> */}
                <p className="text-gray-700 flex items-center gap-2">
                  <FaMapMarkerAlt />
                  {area}
                </p>
                <p className="text-gray-700">{location}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Agent and Contact */}
          <div className="lg:w-1/3 space-y-6">
            <AgentCard agent={postedBy} price={price} propertyTitle={title} />

            {/* Price Summary */}
            {/* <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Price Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Listing Price</span>
                  <span className="font-medium">₹{price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per {sizeType}</span>
                  <span className="font-medium">₹{(price / size).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{price}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-3 text-blue-800">Safety Tips</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Don't pay any amount before visiting the property</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Verify all documents before making any payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Meet the agent in person before finalizing the deal</span>
                </li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* Similar Properties */}
        {/* <SimilarProperties currentPropertyId={id} /> */}
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
