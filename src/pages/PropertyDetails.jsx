"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navbar from "../components/Fields/Navbar"
import { BsFillHeartFill, BsShareFill, BsEyeFill, BsCamera } from "react-icons/bs"
import { FaPhoneAlt, FaMapMarkerAlt, FaRulerCombined, FaHome, FaUsers, FaChevronLeft } from "react-icons/fa"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { MdApartment, MdEmail, MdVerified, MdLocationOn, MdCall } from "react-icons/md"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useNavigate, useParams } from "react-router-dom"
import useGetPropertyDetails from "../hooks/broker-hooks/useGetPropertyDetails"
import Footer from "../components/Fields/Footer"
import PropertyFeature from "./PropertyFeature"
import AgentCard from "./AgentCard"
import PropertyHighlights from "./PropertyHighlights"
import { GiSofa } from "react-icons/gi"
import { PiMapPinAreaFill } from "react-icons/pi"
import useGetAllSharedCustomersList from "../hooks/broker-hooks/useGetAllSharedCustomersList"

const PrevArrow = ({ onClick }) => (
  <motion.button
    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm p-4 rounded-full shadow-2xl hover:bg-white z-20 text-gray-800 border border-gray-200"
    onClick={onClick}
    aria-label="Previous image"
    whileHover={{ scale: 1.1, x: -2 }}
    whileTap={{ scale: 0.9 }}
  >
    <IoIosArrowBack size={24} />
  </motion.button>
)

const NextArrow = ({ onClick }) => (
  <motion.button
    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm p-4 rounded-full shadow-2xl hover:bg-white z-20 text-gray-800 border border-gray-200"
    onClick={onClick}
    aria-label="Next image"
    whileHover={{ scale: 1.1, x: 2 }}
    whileTap={{ scale: 0.9 }}
  >
    <IoIosArrowForward size={24} />
  </motion.button>
)

const PropertyDetails = () => {
  const navigate = useNavigate()
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(0)
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const { id } = useParams()

  const { loading: getCustomersLoad, allCustomers, getAllCustomers } = useGetAllSharedCustomersList()
  const showCustomers = allCustomers && allCustomers?.slice(0, 3)

  const { loading, property, getPropertyDetails } = useGetPropertyDetails()
  const API_URL = import.meta.env.VITE_API_URL

  const getCustomers = async () => {
    await getAllCustomers({ propertyId: id })
  }

  useEffect(() => {
    if (localStorage.getItem("role") == "broker" || localStorage.getItem("role") == "admin") {
      getCustomers()
    }
  }, [])

  useEffect(() => {
    if (id) {
      getPropertyDetails(id)
    }
  }, [id])

  const renderMediaItem = (item, isThumbnail = false) => {
    if (!item) return null

    const isVideo = item.type === "video" || item.path?.endsWith(".mp4") || item.path?.endsWith(".webm")
    const heightClass = isThumbnail ? "h-24" : "h-[600px]"

    if (isVideo) {
      return (
        <div className="relative">
          <video
            className={`w-full ${heightClass} object-cover rounded-3xl`}
            controls={!isThumbnail}
            muted={isThumbnail}
            playsInline
            disablePictureInPicture
            controlsList="nodownload"
          >
            <source src={`${API_URL}${item.path}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {isThumbnail && (
            <div className="absolute inset-0 bg-black/20 rounded-3xl flex items-center justify-center">
              <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[6px] border-l-gray-800 border-y-[4px] border-y-transparent ml-0.5"></div>
              </div>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <img
          src={`${API_URL}${item.path}`}
          alt={item.title || "Property media"}
          className={`w-full ${heightClass} object-cover rounded-3xl`}
          onError={(e) => {
            e.target.src = "/image-placeholder.jpg"
          }}
        />
      )
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Property Details</h3>
          <p className="text-gray-600">Please wait while we fetch the information...</p>
        </motion.div>
      </div>
    )

  if (!property)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div className="text-center max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHome className="text-gray-400 text-4xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-8">The property you're looking for doesn't exist or has been removed.</p>
          <motion.button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronLeft />
            <span>Go Back</span>
          </motion.button>
        </motion.div>
      </div>
    )

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
    sizeType,
    furnished,
    status,
    postedBy,
    location,
    bedrooms,
    format,
    bathrooms,
    amenities = [],
  } = property

  const displayMedia =
    media.length > 0
      ? media
      : (property.images || []).map((img) => ({
          path: img,
          type: img.endsWith(".mp4") ? "video" : "image",
        }))

  const mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dotsClass: "slick-dots custom-dots",
  }

  const thumbnailSliderSettings = {
    slidesToShow: Math.min(displayMedia.length, 5),
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(displayMedia.length, 4),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(displayMedia.length, 3),
        },
      },
    ],
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar pageName="Property Details" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Breadcrumb */}
        <motion.nav
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center space-x-2 text-sm">
            <motion.a
              href={localStorage.getItem("role") == "broker" ? "#/app/broker/dashboard" : localStorage.getItem("role") == "admin" ? "#/app/admin/dashboard" : "#/app/customer/dashboard"}
              className="text-gray-500 hover:text-blue-600 transition-colors font-medium"
              whileHover={{ x: 2 }}
            >
              Home
            </motion.a>
            <span className="text-gray-300">/</span>
            
            <span className="text-blue-600 font-semibold">Property Details</span>
          </div>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Media and Details */}
          <div className="lg:col-span-2">
            {/* Property Header */}
            <motion.div
              className="mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">{title}</h1>
                  <div className="flex items-center space-x-6 text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <MdLocationOn className="text-blue-600" />
                      <span className="font-medium">{location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <motion.button
                    className={`p-4 rounded-2xl shadow-lg border-2 transition-all ${
                      isFavorite
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200"
                    }`}
                    onClick={() => setIsFavorite(!isFavorite)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BsFillHeartFill size={24} />
                  </motion.button>

                  <motion.button
                    className="p-4 bg-white rounded-2xl shadow-lg border-2 border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BsShareFill size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Media Gallery */}
            <motion.div
              className="mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {displayMedia.length <= 1 ? (
                <div className="relative">
                  {renderMediaItem(displayMedia[0])}
                  <div className="absolute top-6 right-6 bg-black/70 text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center space-x-2">
                    <BsCamera />
                    <span>1 Photo</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <Slider {...mainSliderSettings} asNavFor={nav2} ref={setNav1}>
                      {displayMedia.map((item, index) => (
                        <div key={index}>{renderMediaItem(item)}</div>
                      ))}
                    </Slider>
                    <div className="absolute top-6 right-6 bg-black/70 text-white px-3 py-2 rounded-xl text-sm font-medium flex items-center space-x-2">
                      <BsCamera />
                      <span>{displayMedia.length} Photos</span>
                    </div>
                  </div>

                  <div className="px-4 mt-20">
                    <Slider
                      {...thumbnailSliderSettings}
                      asNavFor={nav1}
                      ref={setNav2}
                      beforeChange={(oldIndex, newIndex) => setSelectedThumbIndex(newIndex)}
                    >
                      {displayMedia.map((item, index) => (
                        <div key={index} className="px-2">
                          <motion.div
                            className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                              index === selectedThumbIndex
                                ? "ring-4 ring-blue-500 shadow-xl rounded-xl"
                                : "ring-2 ring-gray-200 hover:ring-blue-300 rounded-xl"
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {renderMediaItem(item, true)}
                          </motion.div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              )}
            </motion.div>

            <PropertyHighlights
              price={price}
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              area={size}
              sizeType={sizeType}
            />

            {/* Description */}
            <motion.div
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <MdApartment className="text-blue-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Property Description</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
            </motion.div>

            {/* Features */}
            <motion.div
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <FaHome className="text-green-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Property Features</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PropertyFeature icon={<MdApartment />} label="Property Type" value={type} />
                <PropertyFeature icon={<MdApartment />} label="Format" value={format} />
                <PropertyFeature icon={<FaRulerCombined />} label="Total Area" value={`${size} ${sizeType}`} />
                <PropertyFeature icon={<GiSofa />} label="Furnishing" value={furnished} />
                <PropertyFeature icon={<PiMapPinAreaFill />} label="Location" value={area} />
              </div>
            </motion.div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <motion.div
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <MdVerified className="text-purple-600 text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Amenities & Features</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {amenities.map((amenity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="font-medium text-gray-800 text-sm">{amenity}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Location */}
            <motion.div
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                  <FaMapMarkerAlt className="text-red-600 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Location & Neighborhood</h2>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MdLocationOn className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2">{area}</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">{location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Agent and Contact */}
          <motion.div
            className="lg:col-span-1"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {localStorage.getItem("role") === "broker" ? (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <FaUsers className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Interested Customers</h3>
                </div>

                {showCustomers?.length > 0 ? (
                  <div className="space-y-6">
                    {showCustomers.map((customer, index) => (
                      <motion.div
                        key={customer._id}
                        className="bg-gray-50 border border-gray-200 p-6 rounded-2xl hover:shadow-lg transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-blue-600 overflow-hidden flex items-center justify-center">
                            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                              {customer?.sharedWith?.fullName?.charAt(0)?.toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate text-lg">
                              {customer?.sharedWith?.fullName}
                            </h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 truncate mt-1">
                              <FaPhoneAlt className="text-blue-600 flex-shrink-0" />
                              <span className="truncate">+91 {customer?.sharedWith?.mobileNo}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 truncate mt-1">
                              <MdEmail className="text-blue-600 flex-shrink-0" />
                              <span className="truncate">{customer?.sharedWith?.email}</span>
                            </div>
                          </div>
                        </div>
                        <motion.button
                          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors shadow-lg"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <MdCall />
                          <span>Call Customer</span>
                        </motion.button>
                      </motion.div>
                    ))}

                    {allCustomers?.length > 0 && (
                      <motion.button
                        onClick={() => navigate(`/app/broker/suggestedcustomer/${id}`)}
                        className="w-full mt-4 bg-gray-100 hover:bg-blue-600 py-4 rounded-2xl font-semibold text-gray-900 hover:text-white transition-all border-2 border-gray-200 hover:border-blue-600"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View All {allCustomers.length} Customers
                      </motion.button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaUsers className="text-gray-400 text-2xl" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No Customers Yet</h4>
                    <p className="text-gray-600">No customers have shown interest in this property.</p>
                  </div>
                )}
              </div>
            ) : (
              <AgentCard agent={postedBy} price={price} propertyTitle={title} />
            )}
          </motion.div>
        </div>
      </motion.div>

      <Footer />

      <style jsx>{`
        .custom-dots {
          bottom: -60px;
        }
        .custom-dots li {
          margin: 0 8px;
        }
        .custom-dots li button:before {
          font-size: 14px;
          color: #9CA3AF;
          opacity: 0.7;
        }
        .custom-dots li.slick-active button:before {
          color: #2563EB;
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

export default PropertyDetails
