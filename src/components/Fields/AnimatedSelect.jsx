import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedSelect = ({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  className = "",
  placeholder = "Select an option",
  search = "",
  setSearch = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
    setSearchTerm("");
    setSearch("");
  };

  const selectedOption = options.find((opt) => opt.value === value);
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`relative group ${className} ${isOpen ? "z-50" : "z-10"}`}
      ref={selectRef}
    >
      <label className="text-black text-sm poppins-medium">{label}</label>

      <div
        className={`w-full mt-1 px-5 poppins-regular text-sm border-2 h-[35px] rounded-full transition-all duration-300 flex items-center justify-between cursor-pointer ${
          error ? "border-red-500" : "border-primary"
        } ${isOpen ? "ring-2 ring-[#265953]" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${!value ? "text-gray-400" : ""}`}>
          {selectedOption?.label || value || placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 1, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200"
          >
            {/* Search input */}
            <div className="px-3 py-2 border-b border-gray-200">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchTerm.trim() !== "") {
                    handleSelect(searchTerm.trim());
                  }
                }}
                placeholder="Search..."
                className="w-full px-3 py-1 text-sm border rounded-md outline-none"
              />
            </div>

            {/* Filtered Options + Custom Entry */}
            <ul className="py-1 z-50 max-h-60 overflow-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <motion.li
                    key={option.value}
                    whileHover={{ backgroundColor: "#f0f0f0" }}
                    transition={{ duration: 0.1 }}
                    className={`px-4 py-2 cursor-pointer ${
                      value === option.value ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </motion.li>
                ))
              ) : searchTerm.trim() !== "" ? (
                <motion.li
                  whileHover={{ backgroundColor: "#f0f0f0" }}
                  transition={{ duration: 0.1 }}
                  className="px-4 py-2 cursor-pointer text-primary"
                  onClick={() => handleSelect(searchTerm.trim())}
                >
                  Use "{searchTerm.trim()}" as custom area
                </motion.li>
              ) : (
                <li className="px-4 py-2 text-sm text-gray-400">
                  No options found
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default AnimatedSelect;
