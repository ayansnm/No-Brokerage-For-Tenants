import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFillBuildingsFill,
  BsFillHeartFill,
  BsGraphUp,
  BsFilter,
} from "react-icons/bs";
import { FaHandsHelping, FaSearch } from "react-icons/fa";
import {
  MdOutlinePendingActions,
  MdArrowOutward,
  MdOutlineSort,
} from "react-icons/md";
import { IoClose } from "react-icons/io5";
import PropertyCard from "../../components/Cards/PropertyCard";
import Navbar from "../../components/Fields/Navbar";
import Footer from "../../components/Fields/Footer";
import AnimatedRadioButtons from "../../components/Fields/AnimatedRadioButtons";
import PriceRangeSlider from "../../components/Fields/PriceRangeSlider";
import notfound from "../../assets/notfound.png";
import useGetMyProperties from "../../hooks/customer-hooks/useGetMyProperties";
import useGetSuggestedProperty from "../../hooks/customer-hooks/useGetSuggestedProperty";

const Dashboard = () => {
  const navigate = useNavigate();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filter, setFilter] = useState({});

  // Define the page name
  const pageName = "Dashboard";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const { loading, properties, requirement, getProperties } =
    useGetMyProperties();
  const fetchProperties = async () => {
    await getProperties({
      searchQuery,
      // category: activeTab || "",
      floor: filter.floor || "",
      format: filter.format || "",
      // priceRange: filter.priceRange[1],
      type: filter.type || "",
      furnished: filter.furnished || "",
    });
  };
  const applyFilters = () => {
    fetchProperties();
  };

  useEffect(() => {
    fetchProperties();
  }, [searchQuery]);

  const { totalSharedWithCount, getSuggestedProperties } =
    useGetSuggestedProperty();

  useEffect(() => {
    getSuggestedProperties();
  }, []);

  // Stats cards data
  const stats = [
    {
      title: "Total Properties Suggested",
      value: totalSharedWithCount,
      icon: <BsFillBuildingsFill size={24} />,
      color: "bg-primary",
      trend: "12 NEW",
    },
    {
      title: "Whishlisted",
      value: "00",
      icon: <BsFillHeartFill size={24} />,
      color: "bg-[#d24d2a]",
      trend: "5.2% increase",
    },
    // {
    //   title: "Pending Properties",
    //   value: "5,729",
    //   icon: <MdOutlinePendingActions size={26} />,
    //   color: "bg-yellow-500",
    //   trend: "8.2% increase",
    // },
    // {
    //   title: "Revenue",
    //   value: "₹12.8M",
    //   icon: <BsGraphUp size={24} />,
    //   color: "bg-purple-500",
    //   trend: "18.7% increase",
    // },
  ];

  return (
    <div className="min-h-screen bg-gray-50 poppins-regular">
      <Navbar pageName={pageName} />

      <div data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Name Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-primary">{pageName}</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-primary hover:!bg-[#B7A380] transition-all duration-300 rounded-xl shadow-sm sm:p-6 p-2 group">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500 group-hover:text-[#084040]">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Property List Section */}
          <div className="lg:w-2/3">
            {/* Header with actions */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <h2 className="text-xl font-bold text-primary mb-6">
                Your all Shared properties!
              </h2>

              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265953] focus:border-primary sm:text-sm"
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265953] focus:border-primary sm:text-sm"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="">Sort by</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="date-asc">Date: Oldest</option>
                    <option value="date-desc">Date: Newest</option>
                  </select>
                  <button
                    onClick={() => setFilterModalOpen(true)}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-50 text-sm font-medium text-gray-700 md:hidden"
                  >
                    <BsFilter size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Cards */}
            <div className="bg-white rounded-xl flex flex-col gap-5 shadow-sm p-8 text-center">
              {properties && properties.length > 0 ? (
                properties.map((item) => (
                  <PropertyCard
                    key={item?.property?._id}
                    id={item?.property?._id}
                    title={item?.property?.title}
                    price={item?.property?.price}
                    address={item?.property?.address}
                    media={item?.property?.media}
                    area={item?.property?.area}
                    floor={item?.property?.floor}
                    sizeType={item?.property?.sizeType}
                    size={item?.property?.size}
                    description={item?.property?.description}
                    type={item?.property?.type}
                  />
                ))
              ) : (
                <div className="max-w-md mx-auto">
                  <p className="text-xl poppins-semibold mb-2 text-primary">Thank you!</p>
                  <p className="text-xl poppins-semibold mb-6 text-primary">
                    Soon we will share properties with you!
                  </p>
                  <img
                    src={notfound}
                    className="w-2/3 mx-auto mb-6"
                    alt="No data found"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-2">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-primary">
                <BsFilter size={18} /> Filters
              </h3>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </h4>
                  <PriceRangeSlider
                    value={filter.priceRange}
                    onChange={(range) =>
                      setFilter((prev) => ({ ...prev, priceRange: range }))
                    }
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Property Type
                  </h4>
                  <AnimatedRadioButtons
                    name="type"
                    options={[
                      { value: "House", label: "House" },
                      { value: "Bunglow", label: "Bunglow" },
                      { value: "Flat", label: "Flat" },
                      { value: "Office", label: "Office" },
                      { value: "Shop", label: "Shop" },
                    ]}
                    selectedColor="bg-green-100 text-primary border-primary"
                    value={filter.type}
                    onChange={handleChange}
                  />
                </div>
                {/* {requirement?.propertyType !== "House" && */}
                {/* // requirement?.propertyType !== "Office" && */}
                {/* // requirement?.propertyType !== "Flat" ? ( */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Floor
                  </h4>
                  <AnimatedRadioButtons
                    name="floor"
                    options={[
                      { value: "Top", label: "Top (Nineth and Above)" },
                      {
                        value: "Middle",
                        label: "Middle (Fourth to Nineth floor)",
                      },
                      {
                        value: "Bottom",
                        label: "Bottom (Ground to Fourth floor)",
                      },
                    ]}
                    selectedColor="bg-green-100 text-primary border-primary"
                    value={filter.floor}
                    onChange={handleChange}
                  />
                </div>
                {/* // ) : null} */}

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Size Type
                  </h4>
                  <AnimatedRadioButtons
                    name="sizetype"
                    options={[
                      { label: "sqft", value: "sqft" },
                      { label: "Vigha", value: "vigha" },
                      { label: "SqYard", value: "sqyard" },
                    ]}
                    selectedColor="bg-green-100 text-primary border-primary"
                    value={filter.sizetype}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Furnished
                  </h4>
                  <AnimatedRadioButtons
                    name="furnished"
                    options={[
                      { label: "Unfurnished", value: "Unfurnished" },
                      { label: "Furnished", value: "Fully" },
                      { label: "Semi-furnished", value: "Semi" },
                    ]}
                    selectedColor="bg-green-100 text-primary border-primary"
                    value={filter.furnished}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    className="flex-1 bg-primary hover:opacity-90 text-white py-2 rounded-lg font-medium transition-colors"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                  <button
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors"
                    onClick={() => {
                      setFilter({ priceRange: [0, 1000000] });
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal - Mobile */}
      {filterModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={() => setFilterModalOpen(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal container */}
            <div
              className="inline-block align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                margin: "0 auto",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Modal header */}
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <BsFilter size={18} /> Filters
                  </h3>
                  <button
                    onClick={() => setFilterModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                    aria-label="Close"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                {/* Modal content */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </h4>
                    <PriceRangeSlider
                      value={filter.priceRange}
                      onChange={(range) =>
                        setFilter((prev) => ({ ...prev, priceRange: range }))
                      }
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Property Type
                    </h4>
                    <AnimatedRadioButtons
                      name="type"
                      options={[
                        { value: "House", label: "House" },
                        { value: "Bunglow", label: "Bunglow" },
                        { value: "Flat", label: "Flat" },
                        { value: "Office", label: "Office" },
                        { value: "Shop", label: "Shop" },
                      ]}
                      selectedColor="bg-green-100 text-primary border-primary"
                      value={filter.type}
                      onChange={handleChange}
                    />
                  </div>
                  {/* {requirement?.propertyType !== "House" && */}
                  {/* // requirement?.propertyType !== "Office" && */}
                  {/* // requirement?.propertyType !== "Flat" ? ( */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Floor
                    </h4>
                    <AnimatedRadioButtons
                      name="floor"
                      options={[
                        { value: "Top", label: "Top (Nineth and Above)" },
                        {
                          value: "Middle",
                          label: "Middle (Fourth to Nineth floor)",
                        },
                        {
                          value: "Bottom",
                          label: "Bottom (Ground to Fourth floor)",
                        },
                      ]}
                      selectedColor="bg-green-100 text-primary border-primary"
                      value={filter.floor}
                      onChange={handleChange}
                    />
                  </div>
                  {/* // ) : null} */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Size Type
                    </h4>
                    <AnimatedRadioButtons
                      name="sizetype"
                      options={[
                        { label: "sqft", value: "sqft" },
                        { label: "Vigha", value: "vigha" },
                        { label: "SqYard", value: "sqyard" },
                      ]}
                      selectedColor="bg-green-100 text-primary border-primary"
                      value={filter.sizetype}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Furnished
                    </h4>
                    <AnimatedRadioButtons
                      name="furnished"
                      options={[
                        { label: "Unfurnished", value: "Unfurnished" },
                        { label: "Furnished", value: "Fully" },
                        { label: "Semi-furnished", value: "Semi" },
                      ]}
                      selectedColor="bg-green-100 text-primary border-primary"
                      value={filter.furnished}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-2 sticky bottom-0 bg-white pb-4">
                    <button
                      className="flex-1 bg-primary hover:opacity-90 text-white py-3 rounded-lg font-medium transition-colors"
                      onClick={() => {
                        applyFilters();
                        setFilterModalOpen(false); // Close modal after applying filters
                      }}
                    >
                      Apply Filters
                    </button>
                    <button
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-colors"
                      onClick={() => {
                        setFilter({ priceRange: [0, 1000000] });
                        setFilterModalOpen(false); // Close modal after clearing
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;