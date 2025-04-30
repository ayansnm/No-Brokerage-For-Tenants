import React, { useEffect, useState } from "react";
import Navbar from "../../components/Fields/Navbar";
import { FiSearch } from "react-icons/fi";
import useGetAllSharedCustomersList from "../../hooks/broker-hooks/useGetAllSharedCustomersList";
import { useParams } from "react-router-dom";
import useSharePropertyStatusChange from "../../hooks/admin-hooks/useSharePropertyStatusChange";

const SuggestedCustomer = () => {
  const filters = ["All", "Interested", "Not-Interested", "Pending"];
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { id } = useParams();
  const {
    loading: getCustomersLoad,
    allCustomers,
    pagination,
    getAllCustomers,
  } = useGetAllSharedCustomersList();

  // Fetch customers when page or filter changes
  useEffect(() => {
    if (localStorage.getItem("role") === "broker" || localStorage.getItem("role") === "admin") {
      getAllCustomers({ 
        propertyId: id,
        page: currentPage,
        limit: itemsPerPage,
        status: activeFilter === "All" ? undefined : activeFilter,
        search: searchTerm || undefined
      });
    }
  }, [currentPage, activeFilter, searchTerm, id]);

  const filteredCustomers = allCustomers || [];
  const totalPages = pagination?.totalPages || 1;
  const totalCustomers = pagination?.total || 0;

  const {sharePropertyStatusChange, loading} = useSharePropertyStatusChange();

  const handleStatusChange = async (customerId, newStatus) => {
    // Implement your API call to update customer status here
    // After successful update, you might want to refetch the current page
    // await updateCustomerStatus(customerId, newStatus);
    // getAllCustomers({ 
    //   propertyId: id,
    //   page: currentPage,
    //   limit: itemsPerPage,
    //   status: activeFilter === "All" ? undefined : activeFilter,
    //   search: searchTerm || undefined
    // });
    await sharePropertyStatusChange({ id: customerId, status: newStatus });
    getAllCustomers({ 
      propertyId: id,
      page: currentPage,
      limit: itemsPerPage,
      status: activeFilter === "All" ? undefined : activeFilter,
      search: searchTerm || undefined
    });
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] poppins-regular">
      <div className="flex-1">
        <Navbar pageName="Suggested Customer" />

        <div className="p-4 mx-10 border rounded-2xl border-gray-300 bg-white">
          {/* Filters and Search */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1); // reset to first page when filter changes
                  }}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeFilter === filter
                      ? "bg-green-900 text-white"
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="flex items-center w-full sm:w-[500px] px-3 py-1 bg-white border border-gray-300 rounded-lg focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-400 transition">
              <FiSearch size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by Name and Mobile no."
                className="w-full pl-2 py-1 text-sm outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // reset to first page when search changes
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-100 text-gray-600 text-left">
                <tr>
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Contact Number</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Purpose</th>
                  <th className="py-2 px-4">Furnishing</th>
                  <th className="py-2 px-4">Location</th>
                  <th className="py-2 px-4">Size</th>
                  <th className="py-2 px-4">Price Range</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {getCustomersLoad ? (
                  <tr>
                    <td colSpan="10" className="py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="py-4 text-center text-gray-400">
                      No customers found
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer, index) => (
                    <tr key={customer._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {customer?.sharedWith?.fullName}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {customer?.sharedWith?.mobileNo}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {customer?.sharedWith?.email}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {customer?.customerRequirements[0]?.propertyPurpose}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {customer?.customerRequirements[0]?.furnished}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {customer?.customerRequirements[0]?.state +
                          ", " +
                          customer?.customerRequirements[0]?.city +
                          ", " +
                          customer?.customerRequirements[0]?.area}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">
                        {customer?.customerRequirements[0]?.size}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col text-gray-800 text-sm">
                          <span>
                            ₹{customer?.customerRequirements[0]?.priceRange}
                          </span>
                          <span className="text-xs text-gray-500">INR</span>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-gray-600">
                        <select
                          value={customer.status}
                          onChange={(e) =>
                            handleStatusChange(customer._id, e.target.value)
                          }
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            customer.status === "Interested"
                              ? "bg-green-100 text-green-800"
                              : customer.status === "Not-Interested"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          <option
                            className="bg-green-100 text-green-800"
                            value="Interested"
                          >
                            Interested
                          </option>
                          <option
                            className="bg-red-100 text-red-800"
                            value="Not-Interested"
                          >
                            Not Interested
                          </option>
                          <option
                            className="bg-blue-100 text-blue-800"
                            value="Pending"
                          >
                            Pending
                          </option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 px-1 text-sm text-gray-700">
            <div>
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, totalCustomers)} of{" "}
              {totalCustomers}
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span>Rows per page: {itemsPerPage}</span>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || getCustomersLoad}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                {"<"}
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || getCustomersLoad}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedCustomer;