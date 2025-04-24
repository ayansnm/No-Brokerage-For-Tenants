import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceRangeSlider = ({ 
  value = [0, 1000000],  // Default value if not provided
  onChange, 
  min = 0, 
  max = 1000000 
}) => {
  const [minValue, maxValue] = value;

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full rounded-md">
      <label className="text-black poppins-medium text-sm mt-1 block">Price</label>

      {/* Show current price values above */}
      <div className="flex justify-between poppins-regular text-xs mb-1 mt-1 text-gray-800">
        <span>Min: ₹{minValue.toLocaleString()}</span>
        <span>Max: ₹{maxValue.toLocaleString()}</span>
      </div>

      <Slider
        range
        min={min}
        max={max}
        step={1000}
        value={value}
        onChange={handleChange}
        trackStyle={[{ backgroundColor: "#265953", height: 10,  }]}
        handleStyle={[
          {
            borderColor: "#265953",
            backgroundColor: "white",
            height: 24,
            width: 24,
            marginTop: -7,
            borderWidth: 4,
          },
          {
            borderColor: "#265953",
            backgroundColor: "white",
            height: 24,
            width: 24,
            marginTop: -7,
            borderWidth: 4,
          },
        ]}
        railStyle={{ backgroundColor: "#ddd", height: 10, borderRadius: 20, margin:"0px 5px" }}
      />

      {/* Static labels below slider */}
      <div className="flex justify-between mt-2 poppins-regular text-gray-600 text-xs px-1">
        <span>₹{min.toLocaleString()}</span>
        <span>₹{max.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;