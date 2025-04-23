import React from "react";
import { motion } from "framer-motion"; // Import framer-motion for animation

const Button = ({ text, icon, onClick }) => {

  return (
    <div>
      <motion.a
        // href="#_"
        className="relative inline-block text-lg group w-[280px] sm:w-[180px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClick}
        onAnimationComplete={() => {
          // Optional: Do something else after animation completes (like state update)
        }}
      >
        <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-[130%] h-[190%] px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-96 h-96 -ml-2 mt-18 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>

          {/* Icon + Text Centered Vertically */}
          <span className="relative p-3 flex flex-col  items-center justify-center gap-4">
            <span className="text-xl">{icon}</span>
            <span className="text-center">{text}</span>
          </span>
        </span>

        <span
          className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
          data-rounded="rounded-lg"
        ></span>
      </motion.a>
    </div>
  );
};

export default Button;
