import React from "react";

const AnimatedRadioButtons = ({
  label,
  name,
  options,
  value,
  onChange,
  selectedColor,
}) => {
  return (
    <div className="space-y-1">
      <label className="text-black text-sm poppins-medium ">{label}</label>
      <div className="flex flex-wrap gap-2 mt-1">
        {options.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer px-6 p-2 rounded-full poppins-regular text-sm border-2 transition-all duration-300 ${
              value === option.value
                ? `${selectedColor || "bg-primary text-white"} border-transparent`
                : "bg-[#B7A380] text-primary border-primary"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="hidden"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default AnimatedRadioButtons;