import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillBuildingsFill, BsGraphUp, BsFilter } from "react-icons/bs";
import { FaHandsHelping, FaPlus, FaSearch } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import PropertyCard from "../../components/Cards/PropertyCard";
import Navbar from "../../components/Fields/Navbar";
import useGetProperties from "../../hooks/broker-hooks/useGetProperties";
import Footer from "../../components/Fields/Footer";
import AnimatedRadioButtons from "../../components/Fields/AnimatedRadioButtons";
import PriceRangeSlider from "../../components/Fields/PriceRangeSelector";
import useGetBrokerDashboard from "../../hooks/broker-hooks/useGetBrokerDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filter, setFilter] = useState({
    priceRange: [0, 0],
  });
  const [filter2, setFilter2] = useState();

  const { loading, properties, getProperties } = useGetProperties();
  const applyFilters = () => {
    console.log(filter);
    fetchData();
  };
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
    }
    await getProperties({
      searchQuery,
      category: activeTab || "",
      floor: filter.floor || "",
      format: filter.format || "",
      priceRange: filter.priceRange[1],
      type: filter.type || "",
      furnished: filter.furnished || "",
    });
  };
  useEffect(() => {
    fetchData();
  }, [searchQuery, activeTab, filter2]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tabs = [
    { label: "All", value: "" },
    { label: "Residential", value: "Residential" },
    { label: "Commercial", value: "Commercial" },
  ];
  const {loading:dashboardLoad, dashboard, getBrokerDashboard} = useGetBrokerDashboard();
  const getDashboard = async()=>{
    await getBrokerDashboard();
  }
  useEffect(()=>{
    getDashboard();
  },[]);
  // useEffect(()=>{
  //   getDashboard();
  // },[]);
  // Stats cards data
  const stats = [
    {
      title: "Total Properties",
      value: dashboard?.totalProperties,
      icon: <BsFillBuildingsFill size={24} />,
      color: "bg-primary",
      // trend: "15.35% increase",
    },
    {
      title: "Pending Properties",
      value: dashboard?.activeProperties,
      icon: <MdOutlinePendingActions size={26} />,
      color: "bg-yellow-500",
      trend: "8.2% increase",
    },
    {
      title: "Deal Closed",
      value: dashboard?.closedDeals,
      icon: <FaHandsHelping size={24} />,
      color: "bg-green-500",
      trend: "22.1% increase",
    },
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
      <Navbar pageName="Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-green-600 font-medium">
                  <span className="inline-flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {stat.trend}
                  </span>
                </p>
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Your Properties
                </h2>
                <button
                  onClick={() => navigate("/broker/addproperty")}
                  className="flex items-center gap-2 bg-primary hover:opacity-90 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <FaPlus size={14} />
                  Add Property
                </button>
              </div>

              {/* Tabs, Search and Filter */}
              <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  {tabs.map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={`px-4 py-2 text-sm rounded-md transition-colors ${
                        activeTab === tab.value
                          ? "bg-green-900 text-white shadow-sm poppins-semibold"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Search and Sort */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
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
            </div>

            {/* Property Cards */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : properties && properties.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {properties.map((item) => (
                  <PropertyCard
                    key={item?._id}
                    id={item?._id}
                    title={item?.title}
                    price={item?.price}
                    address={item?.address}
                    media={item?.media}
                    area={item?.area}
                    floor={item?.floor}
                    sizeType={item?.sizeType}
                    size={item?.size}
                    description={item?.description}
                    type={item?.type}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="max-w-md mx-auto">
                  {/* <img
                    src="/empty-state.svg"
                    alt="No properties found"
                    className="mx-auto h-40 w-40 mb-4"
                  /> */}
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No properties found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    You don't have any properties listed yet. Add your first
                    property to get started.
                  </p>
                  <button
                    onClick={() => navigate("/broker/addproperty")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaPlus className="-ml-1 mr-2 h-4 w-4" />
                    Add Property
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Filter Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-2">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
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
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Floor
                  </h4>
                  <AnimatedRadioButtons
                    name="floor"
                    options={[
                      { label: "Ground", value: "Ground" },
                      { label: "First", value: "First" },
                      { label: "Second", value: "Second" },
                      { label: "Third", value: "Third" },
                      { label: "Fourth", value: "Fourth" },
                    ]}
                    selectedColor="bg-green-100 text-primary border-primary"
                    value={filter.floor}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Format
                  </h4>
                  <AnimatedRadioButtons
                    name="format"
                    options={[
                      { label: "1BHK", value: "1BHK" },
                      { label: "2BHK", value: "2BHK" },
                      { label: "3BHK", value: "3BHK" },
                      { label: "4BHK", value: "4BHK" },
                    ]}
                    selectedColor="bg-green-100 text-primary border-primary"
                    value={filter.format}
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
                      setFilter({});
                    //   setFilter2({});
                      fetchData();
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
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setFilterModalOpen(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-t-xl overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <BsFilter size={18} /> Filters
                  </h3>
                  <button
                    onClick={() => setFilterModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                <div className="space-y-6 max-h-[70vh] overflow-y-auto">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
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
                      selectedColor="bg-blue-100 text-blue-700 border-blue-300"
                      value={filter.type}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Floor
                    </h4>
                    <AnimatedRadioButtons
                      name="floor"
                      options={[
                        { value: "Top", label: "Top (Nineth and Above)" },
                        { value: "Middle", label: "Middle (Fourth to Nineth floor)" },
                        { value: "Bottom", label: "Bottom (Ground to Fourth floor)" },
                      ]}
                      selectedColor="bg-blue-100 text-blue-700 border-blue-300"
                      value={filter.floor}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Format
                    </h4>
                    <AnimatedRadioButtons
                      name="format"
                      options={[
                        { label: "1BHK", value: "1BHK" },
                        { label: "2BHK", value: "2BHK" },
                        { label: "3BHK", value: "3BHK" },
                        { label: "4BHK", value: "4BHK" },
                      ]}
                      selectedColor="bg-blue-100 text-blue-700 border-blue-300"
                      value={filter.format}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sticky bottom-0 border-t">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setFilterModalOpen(false)}
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setFilter({});
                    setFilterModalOpen(false);
                  }}
                >
                  Clear All
                </button>
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
