import React, { useEffect, useState, useRef } from "react";
import { VscBell } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/profile.png";
import { BsFillBuildingsFill, BsFillHeartFill } from "react-icons/bs";
import { MdArrowOutward, MdOutlineSort } from "react-icons/md";
import { CiFilter, CiSearch } from "react-icons/ci";
import AnimatedRadioButtons from "../../components/Fields/AnimatedRadioButtons";
import PriceRangeSlider from "../../components/Fields/PriceRangeSlider";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import { FiSearch } from "react-icons/fi";
import PropertyCard from "../../components/Cards/PropertyCard";
import { IoClose } from "react-icons/io5";
import notfound from "../../assets/notfound.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [filter, setFilter] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-[#FAFAFA] min-h-screen poppins-regular">
      {/* Top Navbar */}
      <nav className="p-4 sm:p-4 md:p-5 pt-4">
        <div className="flex flex-row md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-2xl sm:text-3xl poppins-semibold">Dashboard</p>
            <p className="poppins-medium text-gray-600 text-sm sm:text-base">{formattedDate}</p>
          </div>

          <div className="relative" ref={dropdownRef}>
            <div className="flex flex-row items-center gap-4 cursor-pointer">
              <div className="rounded-full p-2 bg-white border border-gray-500">
                <VscBell size={24} className="text-gray-500" />
              </div>
              <div className="w-px h-10 bg-gray-400 hidden sm:block"></div>
              <div className="flex flex-row gap-2 items-center" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img src={Profile} alt="" className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover" />
                <div className="hidden sm:block">
                  <p className="poppins-medium text-sm">{localStorage.getItem("userName") || "No Name"}</p>
                  <p className="poppins-medium text-sm text-gray-600">Customer</p>
                </div>
              </div>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                <ul className="py-2 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                  {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </li> */}
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/Login");
                    }}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full flex justify-center p-3">
        <div className="w-full md:w-[90vw] lg:w-[75vw] flex flex-col md:flex-row justify-between bg-white rounded-2xl border border-[#D4D4D4] p-4 sm:p-6 gap-6">
          {/* Card 1 */}
          <div className="flex-4">
            <p className="text-lg sm:text-xl text-[#777777] poppins-medium font-semibold">Total Properties suggested</p>
            <div className="mt-3 flex flex-row items-end gap-2">
              <div className="p-2 h-12 w-12 sm:h-14 sm:w-14 rounded-full flex justify-center items-center bg-primary">
                <BsFillBuildingsFill size={24} className="text-white" />
              </div>
              <p className="poppins-medium text-2xl sm:text-3xl">000</p>
              <div className="ml-3 sm:ml-5">
                <div className="flex">
                  <div className="bg-[#eaf7ee] poppins-semibold text-xs text-[#56ce7b] flex flex-row justify-center items-center rounded-full px-2 py-1">
                    <MdArrowOutward size={15} />
                    <p className="poppins-medium ml-1">12 NEW</p>
                  </div>
                </div>
                <p className="poppins-medium text-[#777777] text-xs sm:text-sm mt-1">New Properties Today</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-1">
            <p className="text-lg sm:text-xl text-[#777777] poppins-medium font-semibold">Whishlisted</p>
            <div className="mt-3 flex flex-row items-end gap-2">
              <div className="p-2 h-12 w-12 sm:h-14 sm:w-14 rounded-full flex justify-center items-center bg-[#d24d2a]">
                <BsFillHeartFill size={24} className="text-white" />
              </div>
              <p className="poppins-medium text-2xl sm:text-3xl">00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Button - Only visible on mobile */}
      <div className="md:hidden flex justify-center px-3">
        <button onClick={() => setFilterModalOpen(true)} className="w-full bg-white border border-[#D4D4D4] rounded-lg py-2 flex items-center justify-center gap-2 shadow-sm">
          <CiFilter size={20} />
          <span className="poppins-medium">Filter Properties</span>
        </button>
      </div>

      <div className="w-full flex justify-center p-3">
        <div className="w-full md:w-[90vw] lg:w-[75vw] flex flex-col md:flex-row gap-4">
          {/* Left Section - 2/3 width */}
          <div className="w-full md:w-2/3 p-1 rounded-xl">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-700">Your all Shared properties!</p>
            </div>

            <div className="flex flex-row justify-between">
              {/* Search input */}
              <div className="mt-3 w-[66%] sm:w-[47%] flex flex-row items-center px-2 bg-white border rounded-lg py-1 border-[#e7e4e7] focus-within:border-[#7f7f7f] focus-within:ring-1 focus-within:ring-[#7f7f7f] transition-all">
                <FiSearch size={21} color="#7f7f7f" />
                <input type="text" className="p-2 py-1 outline-none w-full" placeholder="Search..." />
              </div>

              {/* Sort dropdown */}
              <div className="mt-3 w-[32%] sm:w-[28%] bg-white border rounded-lg border-[#e7e4e7] text-[#7f7f7f] pr-2 flex flex-row items-center px-2 focus-within:border-[#7f7f7f] focus-within:ring-1 focus-within:ring-[#7f7f7f] transition-all">
                <MdOutlineSort size={25} className="mr-1 text-[#7f7f7f]" />
                <select className="w-full px-1 py-2 outline-none border-none bg-transparent rounded-lg transition-all">
                  <option value="">Sort</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            <div className="my-2 gap-4 w-full h-[400px] flex flex-col justify-center items-center">
              <p className="text-xl poppins-semibold">Thank you!</p>
              <p className="text-xl poppins-semibold">Soon we will share properties with you!</p>
              <img src={notfound} className="w-2/3 mx-auto" alt="No data found" />
            </div>
          </div>

          {/* Right Section - 1/3 width - Hidden on mobile */}
          <div className="hidden md:block md:w-1/3 bg-white rounded-2xl border border-[#D4d4d4] shadow-sm">
            <p className="text-lg flex gap-2 pt-4 px-4 flex-row items-center font-semibold text-gray-700">
              <CiFilter size={25} /> Filter
            </p>
            <hr className="mt-4 text-gray-300" />
            <div className="p-4">
              <div>
                <AnimatedRadioButtons
                  label="Floor"
                  name="floor"
                  options={[
                    { label: "Ground", value: "Ground" },
                    { label: "First", value: "First" },
                    { label: "Second", value: "Second" },
                    { label: "Third", value: "Third" },
                    { label: "Fourth", value: "Fourth" },
                  ]}
                  selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                  value={filter.floor}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3">
                <PriceRangeSlider value={filter.priceRange} onChange={(range) => setFilter((prev) => ({ ...prev, priceRange: range }))} />
              </div>
              <div className="mt-3">
                <AnimatedRadioButtons
                  label="Category"
                  name="type"
                  options={[
                    { value: "House", label: "House" },
                    { value: "Bunglow", label: "Bunglow" },
                    { value: "Flat", label: "Flat" },
                    { value: "Office", label: "Office" },
                    { value: "Shop", label: "Shop" },
                  ]}
                  selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                  value={filter.type}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3">
                <AnimatedRadioButtons
                  label="Format"
                  name="format"
                  options={[
                    { label: "1BHK", value: "1BHK" },
                    { label: "2BHK", value: "2BHK" },
                    { label: "3BHK", value: "3BHK" },
                    { label: "4BHK", value: "4BHK" },
                  ]}
                  selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                  value={filter.format}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3">
                <AnimatedRadioButtons
                  label="Size Type"
                  name="sizetype"
                  options={[
                    { label: "sqft", value: "sqft" },
                    { label: "Vigha", value: "vigha" },
                    { label: "SqYard", value: "sqyard" },
                  ]}
                  selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                  value={filter.sizetype}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3">
                <AnimatedRadioButtons
                  label="Furnished"
                  name="furnished"
                  options={[
                    { label: "Un Furnished", value: "any" },
                    { label: "Fully", value: "fully-furnished" },
                    { label: "Semi", value: "semi-furnished" },
                  ]}
                  selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                  value={filter.furnished}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3 flex flex-row gap-2">
                <AnimatedButton text={"Filter"} />
                <AnimatedButton text={"Clear"} otherStyles={"bg-gray-200 text-black"} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal - Only for mobile */}
      {filterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end md:hidden">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto px-4">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <p className="text-lg font-semibold flex items-center gap-2">
                <CiFilter size={25} /> Filter Properties
              </p>
              <button onClick={() => setFilterModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                <IoClose size={24} />
              </button>
            </div>

            <div className="p-4">
              <div>
                <AnimatedRadioButtons
                  label="Floor"
                  name="floor"
                  options={[
                    { label: "Ground", value: "Ground" },
                    { label: "First", value: "First" },
                    { label: "Second", value: "Second" },
                    { label: "Third", value: "Third" },
                    { label: "Fourth", value: "Fourth" },
                  ]}
                  selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                  value={filter.floor}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3">
                <PriceRangeSlider value={filter.priceRange} onChange={(range) => setFilter((prev) => ({ ...prev, priceRange: range }))} />
              </div>
              <div className="mt-3">
                <AnimatedRadioButtons
                  label="Category"
                  name="type"
                  options={[
                    { value: "House", label: "House" },
                    { value: "Bunglow", label: "Bunglow" },
                    { value: "Flat", label: "Flat" },
                    { value: "Office", label: "Office" },
                    { value: "Shop", label: "Shop" },
                  ]}
                  selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                  value={filter.type}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3">
                <AnimatedRadioButtons
                  label="Format"
                  name="format"
                  options={[
                    { label: "1BHK", value: "1BHK" },
                    { label: "2BHK", value: "2BHK" },
                    { label: "3BHK", value: "3BHK" },
                    { label: "4BHK", value: "4BHK" },
                  ]}
                  selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                  value={filter.format}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3">
                <AnimatedRadioButtons
                  label="Size Type"
                  name="sizetype"
                  options={[
                    { label: "sqft", value: "sqft" },
                    { label: "Vigha", value: "vigha" },
                    { label: "SqYard", value: "sqyard" },
                  ]}
                  selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                  value={filter.sizetype}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3">
                <AnimatedRadioButtons
                  label="Furnished"
                  name="furnished"
                  options={[
                    { label: "Un Furnished", value: "any" },
                    { label: "Fully", value: "fully-furnished" },
                    { label: "Semi", value: "semi-furnished" },
                  ]}
                  selectedColor={"bg-[#E9FFFC] text-primary border-primary"}
                  value={filter.furnished}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-6 flex flex-row gap-2 sticky bottom-0 bg-white py-3 border-t">
                <AnimatedButton text={"Apply Filters"} onClick={() => setFilterModalOpen(false)} fullWidth />
                <AnimatedButton text={"Clear All"} otherStyles={"bg-red-200"} fullWidth />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
