// src/components/TextInput.jsx
import React from "react";

const TextInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className = "",
}) => {
  return (
    <div className="relative group !text-white">
      <label className= "text-[#B7A380] text-sm poppins-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full text-sm px-5 poppins-regular border-2 h-[35px] rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] ${
          error ? "border-red-500" : "border-secondary"
        } ${className}`}
      />
      {error && <p className="text-xs poppins-regular  text-red-600">{error}</p>}
    </div>
  );
};

export default TextInput;
