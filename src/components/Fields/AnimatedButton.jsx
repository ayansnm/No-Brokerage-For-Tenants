import React from "react";

const AnimatedButton = ({ text, type = "button", onClick, otherStyles = "" }) => {
  const hasCustomBg = /bg-/.test(otherStyles);

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full ${!hasCustomBg ? "bg-primary hover:bg-[#1c413c] text-white" : ""} cursor-pointer h-[35px] rounded-full text-sm  poppins-regular mt-4 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${otherStyles}`}
    >
      {text}
    </button>
  );
};

export default AnimatedButton;
