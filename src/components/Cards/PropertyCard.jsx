import React from "react";
import { FiMapPin } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import PropertyImg from "../../assets/property.jpg";
import { useNavigate } from "react-router-dom";

const PropertyCard = () => {
  const navigate = useNavigate();
  return (
    <div
      
      className="w-full  bg-white border border-gray-200 rounded-xl h-auto sm:h-[160px] flex flex-col sm:flex-row items-stretch px-3 py-2 shadow-sm gap-3 sm:gap-0"
    >
      {/* Image - Full width on mobile, 35% on desktop */}
      <div
        className="h-40 sm:h-full w-full sm:w-[35%] rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${PropertyImg})` }}
      ></div>

      {/* Details - Full width on mobile, 45% on desktop */}
      <div className="flex flex-col justify-between w-full sm:w-[45%] px-0 sm:px-4 h-full py-1 sm:py-2">
        <div className="flex justify-between items-start">
          <h3 className="text-sm sm:text-[15px] font-semibold line-clamp-2">
            Swarnim Business Center
          </h3>
          <span className="bg-green-100 text-green-600 text-xs sm:text-[10px] font-semibold px-2 mx-2 py-1 rounded-full whitespace-nowrap ml-2">
            NEW
          </span>
        </div>

        <div className="text-sm sm:text-[14px] font-bold mt-1">25,751/-</div>
        <div className="text-xs sm:text-[12px] text-gray-500">
          750 Sqft · Ground floor
        </div>

        <div className="flex items-center gap-1 text-xs sm:text-[12px] text-gray-500 mt-1">
          <FiMapPin size={13} />
          <span className="line-clamp-1">South bopal, Ahmedabad</span>
        </div>

        <p className="text-xs sm:text-[12px] text-gray-400 mt-1 leading-tight line-clamp-2">
          Golden swarnim business center is a commercial development in
          khoraj...
        </p>

        <div className="flex flex-row justify-between items-center">
        <a
          // href="#"
          onClick={() => navigate("/PropertyDetails")}
          className="text-blue-500 cursor-pointer text-xs sm:text-[12px] mt-1 inline-block"
        >
          View Details →
        </a>
        <p className="text-xs mt-2 poppins-medium text-gray-600">Commercial</p>
        </div>
      </div>

      {/* Right Actions - Full width on mobile, 20% on desktop */}
      <div className={`w-full sm:w-[20%] flex flex-row sm:flex-col justify-between items-center sm:items-end h-auto sm:h-full py-2 ${localStorage.getItem("role") == "broker" ? 'sm:py-8' : ""} gap-2 sm:gap-0`}>
        {localStorage.getItem("role") == "user" && (
          <>
            <button className="bg-[#265953] cursor-pointer text-white text-xs sm:text-[12px] font-medium px-3 sm:px-4 py-[6px] rounded-full hover:bg-[#15452d] transition whitespace-nowrap">
              Contact Broker
            </button>
            <BsFillHeartFill className="text-red-500 text-[18px]" />
          </>
        )}
        {localStorage.getItem("role") == "broker" && (
          <>
            <button className="bg-[#265953] cursor-pointer text-white text-xs sm:text-[12px] font-medium px-3 sm:px-4 py-[6px] rounded-full hover:bg-[#15452d] transition whitespace-nowrap">
              Edit Property
            </button>
            <button className="bg-[#265953] cursor-pointer text-white text-xs sm:text-[12px] font-medium px-3 sm:px-4 py-[6px] rounded-full hover:bg-[#15452d] transition whitespace-nowrap">
              Customer Details
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
