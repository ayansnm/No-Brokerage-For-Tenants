import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceRangeSlider = ({ 
  value = [0, 50000], 
  onChange, 
  min = 0, 
  max = 50000 
}) => {
  const [minValue, maxValue] = value;

  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleMinInput = (e) => {
    const newMin = Math.min(Number(e.target.value) || 0, maxValue);
    handleChange([newMin, maxValue]);
  };

  const handleMaxInput = (e) => {
    const newMax = Math.max(Number(e.target.value) || 0, minValue);
    handleChange([minValue, newMax]);
  };

  return (
    <div className="w-full rounded-md">
      <label className="text-black poppins-medium text-sm mt-1 block">Price-Range</label>

      <div className="flex justify-between poppins-regular text-xs mb-1 text-black">
        <span>Min</span>
        <span>Max</span>
      </div>
      {/* Min and Max Input Fields */}
      <div className="flex justify-between gap-2 mb-2 mt-1">
        <input
          type="number"
          value={minValue}
          min={min}
          max={maxValue}
          onChange={handleMinInput}
          className="w-1/2 px-3 py-1 border border-gray-300 rounded-md text-sm"
        />
        <input
          type="number"
          value={maxValue}
          min={minValue}
          max={max}
          onChange={handleMaxInput}
          className="w-1/2 px-3 py-1 border border-gray-300 rounded-md text-sm"
        />
      </div>

      {/* Show current price values above (optional) */}

      {/* <Slider
        range
        min={min}
        max={max}
        step={1000}
        value={[minValue, maxValue]}
        onChange={handleChange}
        trackStyle={[{ backgroundColor: "#265953", height: 10 }]}
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
        railStyle={{ backgroundColor: "#ddd", height: 10, borderRadius: 20, margin: "0px 5px" }}
      /> */}

      {/* Static labels below slider */}
      {/* <div className="flex justify-between mt-2 poppins-regular text-gray-600 text-xs px-1">
        <span>₹{min.toLocaleString()}</span>
        <span>₹{max.toLocaleString()}</span>
      </div> */}
    </div>
  );
};

export default PriceRangeSlider;
