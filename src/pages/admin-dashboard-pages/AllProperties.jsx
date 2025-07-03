import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFilter, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaDownload, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import PropertyCard from "../../components/Cards/PropertyCard";
import Navbar from "../../components/Fields/Navbar";
import Sidebar from "../../components/Fields/Sidebar";
import AnimatedRadioButtons from "../../components/Fields/AnimatedRadioButtons";
import PriceRangeSlider from "../../components/Fields/PriceRangeSelector";
import useGetAllProperties from "../../hooks/admin-hooks/useGetAllProperties";

const AllProperties = () => {
  const navigate = useNavigate();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    priceRange: [0, 1000000],
  });

  const { loading, properties, pagination, getAllProperties } =
    useGetAllProperties();

  const applyFilters = () => {
    setCurrentPage(1); // Reset to first page when filters change
    fetchData();
  };

  const fetchData = async () => {
    await getAllProperties({
      searchQuery,
      category: activeTab || "",
      floor: filter.floor || "",
      format: filter.format || "",
      priceRange: filter.priceRange[1],
      type: filter.type || "",
      furnished: filter.furnished || "",
      page: currentPage, // Add page parameter
    });
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, activeTab, currentPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination?.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const tabs = [
    { label: "All", value: "" },
    { label: "Residential", value: "Residential" },
    { label: "Commercial", value: "Commercial" },
  ];

  const handleDownloadExcel = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/property/downloadexcel/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-[#FAFAFA] poppins-regular h-screen overflow-hidden">
      <Sidebar className="w-[250px] h-screen sticky top-0 overflow-hidden" />

      <div className="flex-1 overflow-y-auto h-screen">
        <Navbar pageName="All Properties" />

        <div
          data-aos="zoom-up"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        >
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Property List Section */}
            <div className="lg:w-2/3">
              {/* Header with actions */}
              <div className="bg-white rounded-xl shadow-sm p-3 mb-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {/* Tabs */}
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    {tabs.map((tab) => (
                      <button
                        key={tab.value}
                        onClick={() => {
                          setActiveTab(tab.value);
                          setCurrentPage(1);
                        }}
                        className={`px-4 py-2 text-sm rounded-md transition-colors ${
                          activeTab === tab.value
                            ? "bg-white shadow-sm text-primary poppins-semibold"
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
                      <div className="absolute inset-y-0 mb-1 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full sm:w-96 pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265953] focus:border-primary sm:text-sm"
                        placeholder="Search properties..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                    <button
                      onClick={() => setFilterModalOpen(true)}
                      className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-50 text-sm font-medium text-gray-700 md:hidden"
                    >
                      <BsFilter size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDownloadExcel()}
                    className="flex items-center gap-2 bg-[#084040] hover:bg-[#0a4d4d] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm mt-3"
                  >
                    <FaDownload size={14} />
                    Download Excel
                  </button>
                </div>
              </div>

              {/* Property Cards */}
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : properties && properties.length > 0 ? (
                <>
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

                  {/* Pagination */}
                  {pagination?.totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <nav
                        className="flex items-center gap-1"
                        aria-label="Pagination"
                      >
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <BsChevronLeft className="h-5 w-5" />
                        </button>

                        {Array.from(
                          { length: pagination.totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-1 rounded-md border ${
                              currentPage === page
                                ? "border-primary bg-primary text-white"
                                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === pagination.totalPages}
                          className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <BsChevronRight className="h-5 w-5" />
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No properties found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      There are no properties matching your criteria.
                    </p>
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
                        setFilter({ priceRange: [0, 1000000] });
                        setCurrentPage(1);
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
                        {
                          value: "Middle",
                          label: "Middle (Fourth to Nineth floor)",
                        },
                        {
                          value: "Bottom",
                          label: "Bottom (Ground to Fourth floor)",
                        },
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
                  onClick={() => {
                    applyFilters();
                    setFilterModalOpen(false);
                  }}
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setFilter({ priceRange: [0, 1000000] });
                    setCurrentPage(1);
                    setFilterModalOpen(false);
                    fetchData();
                  }}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProperties;
