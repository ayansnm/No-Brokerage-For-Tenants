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
import { MdApartment, MdEmail, MdVerified } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import useGetPropertyDetails from "../hooks/broker-hooks/useGetPropertyDetails";
import Footer from "../components/Fields/Footer";
import PropertyFeature from "./PropertyFeature";
import AgentCard from "./AgentCard";
import SimilarProperties from "./SimilarProperties";
import PropertyHighlights from "./PropertyHighlights";
import { GiSofa } from "react-icons/gi";
import { GrStatusInfo } from "react-icons/gr";
import { PiMapPinAreaFill } from "react-icons/pi";
import useGetAllSharedCustomersList from "../hooks/broker-hooks/useGetAllSharedCustomersList";

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
  const navigate = useNavigate();
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const {
    loading: getCustomersLoad,
    allCustomers,
    getAllCustomers,
  } = useGetAllSharedCustomersList();
  const showCustomers = allCustomers && allCustomers?.slice(0, 3);

  const { loading, property, getPropertyDetails } = useGetPropertyDetails();
  const API_URL = import.meta.env.VITE_API_URL;

  const getCustomers = async () => {
    await getAllCustomers({ propertyId: id });
  };

  useEffect(() => {
    if (localStorage.getItem("role") == "broker" || localStorage.getItem("role") == "admin") {
      getCustomers();
    }
  }, []);

  useEffect(() => {
    if (id) {
      getPropertyDetails(id);
    }
  }, [id]);

  const renderMediaItem = (item, isThumbnail = false) => {
    if (!item) return null;

    const isVideo =
      item.type === "video" ||
      item.path?.endsWith(".mp4") ||
      item.path?.endsWith(".webm");
    const heightClass = isThumbnail ? "h-20" : "h-96";

    if (isVideo) {
      return (
        <video
          className={`w-full ${heightClass} object-cover`}
          controls={!isThumbnail}
          muted={isThumbnail}
          playsInline
          disablePictureInPicture
          controlsList="nodownload"
        >
          <source src={`${API_URL}${item.path}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <img
          src={`${API_URL}${item.path}`}
          alt={item.title || "Property media"}
          className={`w-full ${heightClass} object-cover`}
          onError={(e) => {
            e.target.src = "/image-placeholder.jpg";
          }}
        />
      );
    }
  };

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
    media = [],
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

  // Fallback to images array if media array is empty (for backward compatibility)
  const displayMedia =
    media.length > 0
      ? media
      : (property.images || []).map((img) => ({
        path: img,
        type: img.endsWith(".mp4") ? "video" : "image",
      }));

      const mainSliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
        autoplaySpeed: 300000, // 5 minutes in milliseconds
        pauseOnHover: false,
        pauseOnFocus: false,
        pauseOnDotsHover: false,
        beforeChange: (current, next) => {
          if (nav1) {
            nav1.slickPause();
            nav1.slickPlay();
          }
        },
      };

  const thumbnailSliderSettings = {
    slidesToShow: Math.min(displayMedia.length, 4),
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(displayMedia.length, 3),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(displayMedia.length, 2),
        },
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen poppins-regular">
      <Navbar pageName="Property Details" />

      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Media and Details */}
          <div className="lg:w-2/3">
            <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    href={localStorage.getItem("role") == "broker" ? "/broker/dashboard" : localStorage.getItem("role") == "admin" ? "/admin/dashboard" : localStorage.getItem("role") == "customer" ? "/" : "/"}
                    className="inline-flex items-center text-gray-600 hover:text-primary"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    /
                    <a
                      href={`/PropertyDetails/${id}`}
                      className="ml-1 text-gray-600 hover:text-primary md:ml-2"
                    >
                      Property Details
                    </a>
                  </div>
                </li>
              </ol>
            </nav>

            <h1 className="text-3xl font-bold mb-2 text-primary">{title}</h1>
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <FaMapMarkerAlt className="text-primary" />
              <span>{location}</span>
            </div>

            {/* Media Gallery */}
            <div className="p-3 mb-5 bg-white rounded-xl border border-gray-300">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                {displayMedia.length <= 1 ? (
                  <div className="relative">
                    {renderMediaItem(displayMedia[0])}
                  </div>
                ) : (
                  <>
                    <div className="relative">
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

                      <Slider
                        {...mainSliderSettings}
                        asNavFor={nav2}
                        ref={setNav1}
                      >
                        {displayMedia.map((item, index) => (
                          <div key={index}>{renderMediaItem(item)}</div>
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
                        {displayMedia.map((item, index) => (
                          <div key={index} className="px-1">
                            <div
                              className={`rounded-md cursor-pointer transition-all duration-200 ${index === selectedThumbIndex
                                  ? "border-4 border-primary shadow-lg"
                                  : "border border-gray-300"
                                }`}
                            >
                              {renderMediaItem(item, true)}
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </>
                )}
              </div>

              <PropertyHighlights
                price={price}
                bedrooms={bedrooms}
                bathrooms={bathrooms}
                area={size}
                sizeType={sizeType}
              />
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-300">
              <h2 className="text-xl text-primary font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-300">
              <h2 className="text-xl font-bold mb-4 text-primary">Features</h2>
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
                  icon={<GiSofa />}
                  label="Furnishing"
                  value={furnished}
                />
                {/* <PropertyFeature
                  icon={<GrStatusInfo />}
                  label="Status"
                  value={status}
                /> */}
                <PropertyFeature
                  icon={<PiMapPinAreaFill />}
                  label="Area"
                  value={area}
                />
              </div>
            </div>

            {amenities.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
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

            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-300">
              <h2 className="text-xl font-bold mb-4 text-primary">Location</h2>
              <div className="mt-4">
                <p className="text-gray-700 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  {area}
                </p>
                <p className="text-gray-700">{location}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Agent and Contact */}
          <div className="lg:w-1/3 space-y-6">
            {localStorage.getItem("role") === "broker" ? (
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                <h3 className="text-xl font-bold mb-4">Contact Customers</h3>
                {showCustomers?.map((customer) => (
                  <div
                    key={customer._id}
                    className="border border-gray-400 mb-4 p-4 rounded-xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center bg-primary text-white text-2xl">
                          {customer?.sharedWith?.fullName
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h4 className="font-bold truncate">
                          {customer?.sharedWith?.fullName}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                          <FaPhoneAlt className="text-primary flex-shrink-0" />
                          <span className="truncate">
                            +91 {customer?.sharedWith?.mobileNo}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                          <MdEmail className="text-primary flex-shrink-0" />
                          <span className="truncate">
                            {customer?.sharedWith?.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-primary text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#01946f] transition">
                      <FaPhoneAlt /> Call Now
                    </button>
                  </div>
                ))}
                {allCustomers?.length > 0 && (
                  <button
                    onClick={() => navigate(`/broker/suggestedcustomer/${id}`)}
                    className="w-full mt-2 border bg-gray-100 py-2 rounded-lg font-medium hover:bg-[#265953] text-[#265953] hover:text-white transition cursor-pointer"
                  >
                    Show All Details of Customers
                  </button>
                )}
              </div>
            ) : localStorage.getItem("role") === "admin" ? (
              <>
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                  <h3 className="text-xl text-primary font-bold mb-4">Contact Agent</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                      {postedBy?.profilePicture ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}/${postedBy.profilePicture
                            }`}
                          alt={postedBy.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary text-white text-2xl">
                          {postedBy?.fullName?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{postedBy?.fullName}</h4>
                      <p className="text-sm text-gray-600">Real Estate Agent</p>
                      {postedBy?.verified && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                          <span className="bg-green-100 px-2 py-0.5 rounded-full">
                            Verified
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <FaPhoneAlt className="text-primary" />
                      <span>+91 {postedBy?.mobileNo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdEmail className="text-primary" />
                      <span>{postedBy?.email}</span>
                    </div>
                  </div>
                  <button className="w-full bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#01946f] transition">
                    <FaPhoneAlt /> Call Now
                  </button>
                  {allCustomers.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-xl text-primary font-bold mb-4">
                        Contact Customers
                      </h3>
                      {allCustomers?.map((customer) => (
                        <div
                          key={customer._id}
                          className="border border-gray-400 mb-4 p-4 rounded-xl"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                              <div className="w-full h-full flex items-center justify-center bg-primary text-white text-2xl">
                                {customer?.sharedWith?.fullName
                                  ?.charAt(0)
                                  ?.toUpperCase()}
                              </div>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <h4 className="font-bold text-primary truncate">
                                {customer?.sharedWith?.fullName}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                                <FaPhoneAlt className="text-primary flex-shrink-0" />
                                <span className="truncate">
                                  +91 {customer?.sharedWith?.mobileNo}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                                <MdEmail className="text-primary flex-shrink-0" />
                                <span className="truncate">
                                  {customer?.sharedWith?.email}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="w-full bg-primary text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#01946f] transition">
                            <FaPhoneAlt /> Call Now
                          </button>
                        </div>
                      ))}
                      {allCustomers?.length > 0 && (
                  <button
                    onClick={() => navigate(`/broker/suggestedcustomer/${id}`)}
                    className="w-full mt-2 border bg-gray-100 py-2 rounded-lg font-medium hover:bg-[#084040] text-primary hover:!text-white transition cursor-pointer"
                  >
                    Show All Details of Customers
                  </button>
                )}
                    </div>
                  )}
                </div>
                {/* <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                  
                </div> */}
              </>
            ) : (
              <AgentCard agent={postedBy} price={price} propertyTitle={title} />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
