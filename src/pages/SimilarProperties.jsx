import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

const SimilarProperties = ({ currentPropertyId }) => {
  // In a real app, you would fetch similar properties based on currentPropertyId
  const similarProperties = [
    {
      id: 1,
      title: "Luxury Apartment in Downtown",
      price: "85,00,000",
      beds: 3,
      baths: 2,
      area: 1800,
      sizeType: "sq.ft",
      image: "/property1.jpg"
    },
    {
      id: 2,
      title: "Modern Villa with Pool",
      price: "1,20,00,000",
      beds: 4,
      baths: 3,
      area: 3200,
      sizeType: "sq.ft",
      image: "/property2.jpg"
    },
    {
      id: 3,
      title: "Cozy Studio Apartment",
      price: "45,00,000",
      beds: 1,
      baths: 1,
      area: 800,
      sizeType: "sq.ft",
      image: "/property3.jpg"
    },
  ].filter(property => property.id !== currentPropertyId);

  const navigate = useNavigate();

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProperties.map(property => (
          <div 
            key={property.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/app/property/${property.id}`)}
          >
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{property.title}</h3>
              <p className="text-primary font-bold text-xl mb-3">₹{property.price}</p>
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FaBed />
                  <span>{property.beds} Beds</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaBath />
                  <span>{property.baths} Baths</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaRulerCombined />
                  <span>{property.area} {property.sizeType}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProperties;