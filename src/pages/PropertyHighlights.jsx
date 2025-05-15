import React from 'react';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

const PropertyHighlights = ({ price, bedrooms, bathrooms, area, sizeType }) => {
  return (
    <div className="bg-primary text-white rounded-xl shadow-md p-6 mb-2">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="text-3xl font-bold">₹{price}</div>
        <div className="flex gap-6">
          {/* <div className="text-center">
            <FaBed className="mx-auto text-2xl mb-1" />
            <p>{bedrooms || "N/A"} Beds</p>
          </div> */}
          {/* <div className="text-center">
            <FaBath className="mx-auto text-2xl mb-1" />
            <p>{bathrooms || "N/A"} Baths</p>
          </div> */}
          <div className="text-center">
            <FaRulerCombined className="mx-auto text-2xl mb-1" />
            <p>{area} {sizeType}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="bg-[#B7A380] bg-opacity-20 px-3 py-1 rounded-full text-sm text-primary">For Rent</span>
        {/* <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Ready to Move</span>
        <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Premium Property</span> */}
      </div>
    </div>
  );
};

export default PropertyHighlights;