import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import Button from '../../components/Fields/Button'; 

const RoleSelect = () => {
  return (
    <div className="flex items-center justify-center w-full h-[100vh] bg-gradient-to-r from-[#265953] via-[#1d4842] to-[#173a35]">
      <div className="bg-white mx-3 sm:mx-0 sm:p-12 rounded-xl shadow-xl max-w-md w-full flex flex-col items-center space-y-8">
        <h1 className="text-4xl font-extrabold text-[#265953] mb-4">
          Choose Your Role
        </h1>
        <p className="text-center text-lg text-[#265953] mb-6">
          Please select your role to proceed and enjoy a personalized experience.
        </p>

        <div className="w-full flex flex-col items-center gap-8">
          {/* Button for Customer Role */}
          <Button text="Customer" link="/Registration" />
          
          {/* Button for Broker Role */}
          <Button text="Broker" link="/Registration" />
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
