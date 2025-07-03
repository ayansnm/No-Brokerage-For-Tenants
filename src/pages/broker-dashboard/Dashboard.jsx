"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BsFillBuildingsFill, BsFilter, BsGrid3X3Gap, BsList, BsGraphUp, BsEye, BsHeart } from "react-icons/bs"
import { FaHandsHelping, FaPlus, FaSearch, FaUsers, FaMapMarkerAlt, FaDownload } from "react-icons/fa"
import {
  MdOutlinePendingActions,
  MdTrendingUp,
  MdTrendingDown,
  MdNotifications,
  MdMessage,
  MdAnalytics,
} from "react-icons/md"
import { IoClose, IoTimeOutline } from "react-icons/io5"
import { HiOutlineChartBar, HiOutlineLightBulb } from "react-icons/hi"
import PropertyCard from "../../components/Cards/PropertyCard"
import Navbar from "../../components/Fields/Navbar"
import useGetProperties from "../../hooks/broker-hooks/useGetProperties"
import Footer from "../../components/Fields/Footer"
import AnimatedRadioButtons from "../../components/Fields/AnimatedRadioButtons"
import PriceRangeSlider from "../../components/Fields/PriceRangeSelector"
import useGetBrokerDashboard from "../../hooks/broker-hooks/useGetBrokerDashboard"
import { FiCalendar, FiPhone, FiMail } from "react-icons/fi"
import { HiOutlineBuildingOffice2 } from "react-icons/hi2"
import { VscMenu } from "react-icons/vsc"
import React from "react"

const Dashboard = ({ pageName }) => {
  const navigate = useNavigate()
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [filter, setFilter] = useState({
    priceRange: [0, 0],
  })
  const [filter2, setFilter2] = useState()

  const { loading, properties, getProperties } = useGetProperties()
  const applyFilters = () => {
    console.log(filter)
    fetchData()
  }
  const fetchData = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/app/Login")
    }
    await getProperties({
      searchQuery,
      category: activeTab || "",
      floor: filter.floor || "",
      format: filter.format || "",
      priceRange: filter.priceRange[1],
      type: filter.type || "",
      furnished: filter.furnished || "",
    })
  }

  useEffect(() => {
    fetchData()
  }, [searchQuery, activeTab, filter2])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const tabs = [
    {
      label: "All Properties",
      value: "",
      icon: <BsFillBuildingsFill size={16} />,
    },
    { label: "Residential", value: "Residential", icon: <FaUsers size={16} /> },
    {
      label: "Commercial",
      value: "Commercial",
      icon: <HiOutlineBuildingOffice2 size={16} />,
    },
  ]

  const { loading: dashboardLoad, dashboard, getBrokerDashboard } = useGetBrokerDashboard()
  const getDashboard = async () => {
    await getBrokerDashboard()
  }
  useEffect(() => {
    getDashboard()
  }, [])

  // Stats cards data
  const stats = [
    {
      title: "Total Properties",
      value: dashboard?.totalProperties || 0,
      icon: <BsFillBuildingsFill size={28} />,
      color: "bg-[#084040]",
      textColor: "text-white",
      trend: "+15.3%",
      trendUp: true,
      description: "Properties listed",
    },
    {
      title: "Active Properties",
      value: dashboard?.activeProperties || 0,
      icon: <MdOutlinePendingActions size={28} />,
      color: "bg-[#B7A380]",
      textColor: "text-[#084040]",
      trend: "+8.2%",
      trendUp: true,
      description: "Currently active",
    },
    {
      title: "Deals Closed",
      value: dashboard?.closedDeals || 0,
      icon: <FaHandsHelping size={28} />,
      color: "bg-green-500",
      textColor: "text-white",
      trend: "+22.1%",
      trendUp: true,
      description: "Successful deals",
    },
  ]

  // Mock data for additional content
  const recentActivities = [
    {
      id: 1,
      type: "inquiry",
      message: "New inquiry for 3BHK Apartment in Satellite",
      time: "2 hours ago",
      icon: <MdMessage className="text-blue-500" />,
    },
    {
      id: 2,
      type: "view",
      message: "Property viewed 15 times today",
      time: "4 hours ago",
      icon: <BsEye className="text-green-500" />,
    },
    {
      id: 3,
      type: "favorite",
      message: "Property added to 3 wishlists",
      time: "6 hours ago",
      icon: <BsHeart className="text-red-500" />,
    },
  ]

  const quickTips = [
    {
      title: "Optimize Your Listings",
      description: "Add high-quality photos to increase views by 40%",
      icon: <HiOutlineLightBulb className="text-yellow-500" />,
    },
    {
      title: "Respond Quickly",
      description: "Reply to inquiries within 1 hour for better conversion",
      icon: <IoTimeOutline className="text-blue-500" />,
    },
    {
      title: "Update Regularly",
      description: "Keep your property details updated for better visibility",
      icon: <MdAnalytics className="text-green-500" />,
    },
  ]

  const marketInsights = [
    {
      area: "Satellite",
      avgPrice: "₹25,000",
      trend: "+5.2%",
      trendUp: true,
    },
    {
      area: "Vastrapur",
      avgPrice: "₹30,000",
      trend: "+3.8%",
      trendUp: true,
    },
    {
      area: "Bodakdev",
      avgPrice: "₹35,000",
      trend: "-1.2%",
      trendUp: false,
    },
  ]

  // Format current date
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  const handleDownloadExcel = async () => {
  try {
    const API_URL = import.meta.env.VITE_API_URL;
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/property/downloadexcel/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to download file");

    const blob = await response.blob();

    // Create a temporary URL and trigger download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "properties.xlsx"; // or the actual filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Error : ", error.message);
  }
};


  const role = localStorage.getItem("role")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Header Section */}
      <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-[#084040] hover:bg-gray-100 rounded-lg transition-colors md:hidden"
            >
              <VscMenu size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#084040]">{pageName || "Dashboard"}</h1>
              <div className="flex items-center gap-2 mt-1">
                <FiCalendar className="text-gray-400" size={14} />
                <p className="text-sm text-gray-600">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg ${stat.color} ${stat.textColor}`}>
                  {React.cloneElement(stat.icon, { size: 20 })}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {stat.trendUp ? (
                      <MdTrendingUp className="text-green-500" size={12} />
                    ) : (
                      <MdTrendingDown className="text-red-500" size={12} />
                    )}
                    <span className={`text-xs font-semibold ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[#084040]">{stat.value}</p>
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#084040] mb-1">{stat.title}</h3>
                <p className="text-xs text-gray-600">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Sidebar - Only visible on very large screens */}
          <div className="hidden 2xl:block 2xl:col-span-2">
            <div className="space-y-6">
              {/* Recent Activities */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-[#084040] mb-4 flex items-center gap-2">
                  <MdNotifications className="text-[#B7A380]" size={20} />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg">{activity.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-medium">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-[#084040] mb-4 flex items-center gap-2">
                  <HiOutlineLightBulb className="text-[#B7A380]" size={20} />
                  Quick Tips
                </h3>
                <div className="space-y-4">
                  {quickTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg">{tip.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800">{tip.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-8 2xl:col-span-7">
            {/* Controls Panel */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 mb-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#084040] mb-1">Your Properties</h2>
                  <p className="text-sm text-gray-600">Manage and track your property listings</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <button
                    onClick={() => handleDownloadExcel()}
                    className="flex items-center gap-2 bg-[#084040] hover:bg-[#0a4d4d] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                  >
                    <FaDownload size={14} />
                    Download Excel
                  </button>
                  <button
                    onClick={() => navigate("/app/broker/addproperty")}
                    className="flex items-center gap-2 bg-[#084040] hover:bg-[#0a4d4d] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                  >
                    <FaPlus size={14} />
                    Add Property
                  </button>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === "grid" ? "bg-[#084040] text-white shadow-md" : "text-gray-500 hover:text-[#084040]"
                      }`}
                    >
                      <BsGrid3X3Gap size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === "list" ? "bg-[#084040] text-white shadow-md" : "text-gray-500 hover:text-[#084040]"
                      }`}
                    >
                      <BsList size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.value
                        ? "bg-[#084040] text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#084040]"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" size={16} />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#B7A380] focus:border-[#084040] transition-all text-sm"
                    placeholder="Search properties by name, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    className="px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#B7A380] focus:border-[#084040] transition-all min-w-[120px] text-sm"
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
                    className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-medium transition-all xl:hidden"
                  >
                    <BsFilter size={16} />
                    Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Property Cards */}
            {loading ? (
              <div className="flex justify-center items-center h-64 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#B7A380] border-t-[#084040] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading properties...</p>
                </div>
              </div>
            ) : properties && properties.length > 0 ? (
              <div
                className={`${
                  viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-3"
                }`}
              >
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
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
                <div className="max-w-sm mx-auto">
                  <div className="w-16 h-16 bg-[#B7A380] rounded-full flex items-center justify-center mx-auto mb-4">
                    <BsFillBuildingsFill className="text-[#084040] text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-[#084040] mb-2">No properties found</h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    You don't have any properties listed yet. Start by adding your first property to attract potential
                    tenants and grow your business.
                  </p>
                  <button
                    onClick={() => navigate("/app/broker/addproperty")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#084040] text-white font-semibold rounded-lg hover:bg-[#0a4d4d] transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                  >
                    <FaPlus size={14} />
                    Add Your First Property
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-4 2xl:col-span-3">
            <div className="space-y-6">
              {/* Filter Sidebar - Desktop */}
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-[#B7A380] rounded-lg">
                    <BsFilter className="text-[#084040]" size={16} />
                  </div>
                  <h3 className="text-lg font-bold text-[#084040]">Filters</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-[#084040] mb-2 flex items-center gap-2">
                      <HiOutlineChartBar size={14} />
                      Price Range
                    </h4>
                    <PriceRangeSlider
                      value={filter.priceRange}
                      onChange={(range) => setFilter((prev) => ({ ...prev, priceRange: range }))}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#084040] mb-3 flex items-center gap-2">
                      <BsFillBuildingsFill size={16} />
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
                      selectedColor="bg-[#084040] text-white border-[#084040]"
                      value={filter.type}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#084040] mb-3">Furnished Status</h4>
                    <AnimatedRadioButtons
                      name="furnished"
                      options={[
                        { label: "Unfurnished", value: "Unfurnished" },
                        { label: "Furnished", value: "Fully" },
                        { label: "Semi-furnished", value: "Semi" },
                      ]}
                      selectedColor="bg-[#084040] text-white border-[#084040]"
                      value={filter.furnished}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#084040] mb-3">Floor Level</h4>
                    <AnimatedRadioButtons
                      name="floor"
                      options={[
                        { value: "Top", label: "Top (9th+)" },
                        { value: "Middle", label: "Middle (4-8)" },
                        { value: "Bottom", label: "Bottom (G-3)" },
                      ]}
                      selectedColor="bg-[#084040] text-white border-[#084040]"
                      value={filter.floor}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#084040] mb-3">Property Format</h4>
                    <AnimatedRadioButtons
                      name="format"
                      options={[
                        { label: "1BHK", value: "1BHK" },
                        { label: "2BHK", value: "2BHK" },
                        { label: "3BHK", value: "3BHK" },
                        { label: "4BHK", value: "4BHK" },
                      ]}
                      selectedColor="bg-[#084040] text-white border-[#084040]"
                      value={filter.format}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                    <button
                      className="w-full bg-[#084040] hover:bg-[#0a4d4d] text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                      onClick={applyFilters}
                    >
                      Apply Filters
                    </button>
                    <button
                      className="w-full bg-[#B7A380] hover:bg-[#a69670] text-[#084040] py-3 rounded-xl font-semibold transition-all duration-200"
                      onClick={() => {
                        setFilter({ priceRange: [0, 0] })
                        fetchData()
                      }}
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>

              {/* Market Insights - Only visible on large screens */}
              <div className="hidden xl:block bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-[#084040] mb-4 flex items-center gap-2">
                  <BsGraphUp className="text-[#B7A380]" size={20} />
                  Market Insights
                </h3>
                <div className="space-y-4">
                  {marketInsights.map((insight, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-[#B7A380]" size={14} />
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{insight.area}</p>
                          <p className="text-xs text-gray-600">Avg. Rent</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#084040] text-sm">{insight.avgPrice}</p>
                        <div className="flex items-center gap-1">
                          {insight.trendUp ? (
                            <MdTrendingUp className="text-green-500" size={12} />
                          ) : (
                            <MdTrendingDown className="text-red-500" size={12} />
                          )}
                          <span
                            className={`text-xs font-medium ${insight.trendUp ? "text-green-500" : "text-red-500"}`}
                          >
                            {insight.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Support - Only visible on large screens */}
              <div className="hidden xl:block bg-[#084040] rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Need Help?</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Our support team is here to help you maximize your property listings.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-[#B7A380]" size={16} />
                    <span className="text-sm">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMail className="text-[#B7A380]" size={16} />
                    <span className="text-sm">support@realestate.com</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-[#B7A380] hover:bg-[#a69670] text-[#084040] py-2 rounded-lg font-semibold transition-colors">
                  Contact Support
                </button>
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
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setFilterModalOpen(false)}
            />
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-t-3xl overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:rounded-3xl">
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-[#084040] flex items-center gap-2">
                    <BsFilter size={20} /> Filters
                  </h3>
                  <button
                    onClick={() => setFilterModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                  <div>
                    <h4 className="text-sm font-semibold text-[#084040] mb-3">Price Range</h4>
                    <PriceRangeSlider
                      value={filter.priceRange}
                      onChange={(range) => setFilter((prev) => ({ ...prev, priceRange: range }))}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#084040] mb-3">Property Type</h4>
                    <AnimatedRadioButtons
                      name="type"
                      options={[
                        { value: "House", label: "House" },
                        { value: "Bunglow", label: "Bunglow" },
                        { value: "Flat", label: "Flat" },
                        { value: "Office", label: "Office" },
                        { value: "Shop", label: "Shop" },
                      ]}
                      selectedColor="bg-[#084040] text-white border-[#084040]"
                      value={filter.type}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#084040] mb-3">Floor Level</h4>
                    <AnimatedRadioButtons
                      name="floor"
                      options={[
                        { value: "Top", label: "Top (9th and Above)" },
                        { value: "Middle", label: "Middle (4th to 8th)" },
                        { value: "Bottom", label: "Bottom (Ground to 3rd)" },
                      ]}
                      selectedColor="bg-[#084040] text-white border-[#084040]"
                      value={filter.floor}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#084040] mb-3">Format</h4>
                    <AnimatedRadioButtons
                      name="format"
                      options={[
                        { label: "1BHK", value: "1BHK" },
                        { label: "2BHK", value: "2BHK" },
                        { label: "3BHK", value: "3BHK" },
                        { label: "4BHK", value: "4BHK" },
                      ]}
                      selectedColor="bg-[#084040] text-white border-[#084040]"
                      value={filter.format}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t">
                <button
                  type="button"
                  className="flex-1 bg-[#084040] text-white py-3 rounded-xl font-semibold hover:bg-[#0a4d4d] transition-colors"
                  onClick={() => {
                    applyFilters()
                    setFilterModalOpen(false)
                  }}
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  className="flex-1 bg-[#B7A380] text-[#084040] py-3 rounded-xl font-semibold hover:bg-[#a69670] transition-colors"
                  onClick={() => {
                    setFilter({ priceRange: [0, 0] })
                    setFilterModalOpen(false)
                    fetchData()
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
  )
}

export default Dashboard
