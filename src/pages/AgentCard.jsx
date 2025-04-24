import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const AgentCard = ({ agent, price, propertyTitle }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
      <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          {agent?.profilePicture ? (
            <img 
              src={`${import.meta.env.VITE_API_URL}/${agent.profilePicture}`} 
              alt={agent.fullName} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary text-white text-2xl">
              {agent?.fullName?.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold">{agent?.fullName}</h4>
          <p className="text-sm text-gray-600">Real Estate Agent</p>
          {agent?.verified && (
            <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
              <span className="bg-green-100 px-2 py-0.5 rounded-full">Verified</span>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-primary" />
          <span>+91 {agent?.mobileNo}</span>
        </div>
        <div className="flex items-center gap-2">
          <MdEmail className="text-primary" />
          <span>{agent?.email}</span>
        </div>
      </div>
      <button className="w-full bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#01946f] transition">
        <FaPhoneAlt /> Call Now
      </button>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Interested in: <span className="font-medium">{propertyTitle}</span></p>
        <p className="text-sm font-bold mt-1">₹{price}</p>
      </div>
    </div>
  );
};

export default AgentCard;