import React from 'react';

const PropertyFeature = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="text-primary text-xl">
        {icon}
      </div>
      <div>
        <p className="font-medium text-primary">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default PropertyFeature;