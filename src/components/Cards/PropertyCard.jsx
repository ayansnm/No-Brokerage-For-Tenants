import React from "react";
import { FiMapPin, FiEdit2, FiUsers, FiHeart } from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({
  id,
  title = "No Title",
  price = "000",
  image = "NO",
  area = "NO DATA",
  floor = "",
  sizeType = "",
  description = "",
  type = "",
  size = "00",
  isNew = true,
}) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Property Image */}
      <div
        onClick={() => navigate(`/PropertyDetails/${id}`)}
        className="relative h-48 w-full bg-gray-100 bg-cover bg-center"
        style={{ backgroundImage: `url(http://145.223.20.218:2025/${image})` }}
      >
        {/* Status Badge */}
        {isNew && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            NEW
          </span>
        )}

        {/* Favorite Button */}
        {role === "user" && (
          <button className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:bg-red-100 transition-colors">
            <FiHeart className="text-gray-600 hover:text-red-500" />
          </button>
        )}
      </div>

      {/* Property Details */}
      <div className="p-4">
        <div  onClick={() => navigate(`/PropertyDetails/${id}`)}>
          {/* Title and Price */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {title}
            </h3>
            <p className="text-lg font-bold text-primary whitespace-nowrap ml-2">
              ₹{price}
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <FiMapPin className="mr-1" />
            <span className="line-clamp-1">{area}</span>
          </div>

          {/* Size and Type */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span className="mr-2">
              {size} {sizeType}
            </span>
            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
            <span>{type}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2"></div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate(`/PropertyDetails/${id}`)}
            className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {role === "user" ? (
            <button className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center transition-colors">
              <FaHandshake className="mr-1" />
              Contact
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                onClick={() => navigate(`/broker/editproperty/${id}`)}
                title="Edit Property"
              >
                <FiEdit2 />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                title="Customer Details"
              >
                <FiUsers />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
