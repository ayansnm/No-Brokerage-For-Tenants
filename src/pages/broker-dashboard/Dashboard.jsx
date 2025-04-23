import React, { useEffect, useState, useRef } from "react";
import { VscBell } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/profile.png";
import { BsFillBuildingsFill, BsFillHeartFill } from "react-icons/bs";
import {
  MdArrowOutward,
  MdOutlinePendingActions,
  MdOutlineSort,
} from "react-icons/md";
import { CiFilter, CiSearch } from "react-icons/ci";
import AnimatedRadioButtons from "../../components/Fields/AnimatedRadioButtons";
import PriceRangeSlider from "../../components/Fields/PriceRangeSlider";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import { FiSearch, FiUser } from "react-icons/fi";
import PropertyCard from "../../components/Cards/PropertyCard";
import { IoClose } from "react-icons/io5";
import notfound from "../../assets/notfound.png";
import Navbar from "../../components/Fields/Navbar";
import { FaHandsHelping, FaPlus, FaUserTie } from "react-icons/fa";
import useGetProperties from "../../hooks/broker-hooks/useGetProperties";

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

  const { loading, properties, getProperties } = useGetProperties()
  // console.log(properties);
  const fetchProp = async () => {
    getProperties();
  }
  useEffect(() => {
    fetchProp()
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
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { label: "All", value: "all" },
    { label: "Residential", value: "residential" },
    { label: "Commercial", value: "commercial" },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen poppins-regular">
      {/* Top Navbar */}
      <Navbar />

      <div className="w-full flex justify-center p-3">
        <div className="w-full md:w-[90vw] lg:w-[75vw] flex flex-col md:flex-row justify-between bg-white rounded-2xl border border-[#D4D4D4] p-4 sm:p-6 gap-6">
          {/* Total Properties Suggested */}
          <div className="flex items-start gap-3 flex-1">
            {/* Icon */}
            <div className="p-3 h-14 w-14 rounded-full flex justify-center items-center bg-primary">
              <BsFillBuildingsFill size={24} className="text-white" />
            </div>

            {/* Text Block */}
            <div className="flex flex-col">
              <p className="text-lg sm:text-xl text-[#777777] poppins-medium font-semibold">
                Total Properties
              </p>

              {/* Number + Growth block */}
              <div className="flex items-end gap-3 mt-1">
                {/* Number */}
                <p className="poppins-medium text-2xl sm:text-3xl">4578</p>

                {/* Percentage & Text */}
                {/* <div className="flex flex-col">
                  <div className="poppins-semibold text-xs bg-[#beffd3] text-[#3fbe67] flex flex-row justify-center items-center rounded-full px-2 w-fit">
                    <MdArrowOutward size={15} />
                    <p className="poppins-medium ml-1">15.35%</p>
                  </div>
                  <p className="poppins-medium text-[#777777] text-xs sm:text-sm">
                    Growth in properties
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Total Brokers */}
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 h-14 w-14 rounded-full flex justify-center items-center bg-[#2ad284]">
              <MdOutlinePendingActions size={26} className="text-white" />
            </div>
            <div>
              <p className="text-lg sm:text-lg text-[#777777] poppins-medium font-semibold">
                Pending Properties
              </p>
              <p className="poppins-medium text-2xl sm:text-3xl mt-1">5729</p>
            </div>
          </div>
          {/* {JSON.stringify(properties)} */}

          {/* Wishlist */}
          <div className="flex items-start gap-4 flex-1">
            {/* <div className="w-px h-16 bg-gray-400 hidden sm:block"></div> */}
            <div className="p-3 h-14 w-14 rounded-full flex justify-center items-center bg-[#2ad235]">
              <FaHandsHelping size={24} className="text-white" />
            </div>
            <div>
              <p className="text-lg sm:text-lg text-[#777777] poppins-medium font-semibold">
                Deal Closed
              </p>
              <p className="poppins-medium text-2xl sm:text-3xl mt-1">5729</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="w-full flex justify-center p-4">
          <div className="w-full md:w-[90vw] lg:w-[75vw] flex flex-col md:flex-row gap-4">
            {/* Left Section */}
            <div className="w-full md:w-2/3 flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <p className="text-lg poppins-semibold text-gray-800">
                  Your all properties!
                </p>
                <button className="flex flex-row justify-center items-center bg-primary text-white px-3 rounded-full text-sm gap-2 hover:opacity-95" onClick={() => navigate("/broker/addproperty")}>
                  <FaPlus />
                  Add Property
                </button>
              </div>
              {/* Search & Sort container */}
              <div className="flex flex-col sm:flex-row text-sm justify-between gap-2 w-full sm:w-auto">
                {/* Tabs */}
                <div className="flex gap-1 bg-white p-1 rounded-full border border-gray-300">
                  {tabs.map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={`px-3 py-0.5 text-xs rounded-full border transition-all ${activeTab === tab.value
                        ? "bg-[#174c45] text-white"
                        : "bg-white text-[#7f7f7f] border-[#e7e4e7]"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                {/* <div className="flex flex-row"> */}
                {/* Search input */}
                <div className="flex flex-row items-center px-2 bg-white border rounded-lg py-1 border-[#e7e4e7] focus-within:border-[#7f7f7f] focus-within:ring-1 focus-within:ring-[#7f7f7f]  transition-all h-[33px] w-full sm:w-[230px]">
                  <FiSearch size={21} color="#7f7f7f" />
                  <input
                    type="text"
                    className="p-2 py-1 outline-none w-full"
                    placeholder="Search..."
                  />
                </div>

                {/* Sort dropdown */}
                <div className="flex flex-row items-center px-2 bg-white border rounded-lg border-[#e7e4e7] text-[#7f7f7f] pr-2 focus-within:border-[#7f7f7f] focus-within:ring-1 focus-within:ring-[#7f7f7f] transition-all h-[33px] w-full sm:w-[140px]">
                  <MdOutlineSort size={25} className="mr-1 text-[#7f7f7f]" />
                  <select className="w-full px-1 py-2 outline-none border-none bg-transparent rounded-lg transition-all">
                    <option value="">Sort by</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
              {/* Property Cards */}
              <div className="flex flex-col gap-4 mt-2">
                {/* <PropertyCard /> */}
                {properties && properties.map((item, index) => {
                  console.log("Floor :", properties.floor);
                  return (
                    <PropertyCard key={index} title={item.title} price={item.price} address={item.address} image={item.images[0]} area={item.area} floor={item.floor} sizeType={item.sizeType} description={item.description} type={item.type} />
                  )
                })}
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
                  <PriceRangeSlider
                    value={filter.priceRange}
                    onChange={(range) =>
                      setFilter((prev) => ({ ...prev, priceRange: range }))
                    }
                  />
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
                  <AnimatedButton
                    text={"Clear"}
                    otherStyles={"bg-gray-200 text-black"}
                  />
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
                    <button
                      onClick={() => setFilterModalOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
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
                        selectedColor={
                          "bg-[#E9FFFC] text-primary border-primary"
                        }
                        value={filter.floor}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-3">
                      <PriceRangeSlider
                        value={filter.priceRange}
                        onChange={(range) =>
                          setFilter((prev) => ({ ...prev, priceRange: range }))
                        }
                      />
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
                        selectedColor={
                          "bg-[#E9FFFC] text-primary border-primary"
                        }
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
                        selectedColor={
                          "bg-[#E9FFFC] text-primary border-primary"
                        }
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
                        selectedColor={
                          "bg-[#E9FFFC] text-primary border-primary"
                        }
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
                        selectedColor={
                          "bg-[#E9FFFC] text-primary border-primary"
                        }
                        value={filter.furnished}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-6 flex flex-row gap-2 sticky bottom-0 bg-white py-3 border-t">
                      <AnimatedButton
                        text={"Apply Filters"}
                        onClick={() => setFilterModalOpen(false)}
                        fullWidth
                      />
                      <AnimatedButton
                        text={"Clear All"}
                        otherStyles={"bg-red-200"}
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
