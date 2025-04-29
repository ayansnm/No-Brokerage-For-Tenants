import React, { useState } from "react";
import Navbar from "../../components/Fields/Navbar";
import { FiSearch } from "react-icons/fi";

const SuggestedCustomer = () => {
    const filters = ["All", "Interested", "Not Interested", "Not Connected"];
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [customerData, setCustomerData] = useState(
        Array.from({ length: 30 }, (_, i) => ({
            number: i + 1,
            name: `Customer ${i + 1}`,
            contactNumber: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
            email: `customer${i + 1}@example.com`,
            priceRange: `₹${(i + 1) * 500} - ₹${(i + 1) * 1000}`,
            status: ["Interested", "Not Connected", "Not Interested"][i % 3],
        }))
    );


    const filteredCustomers = customerData.filter((customer) => {
        const matchesFilter =
            activeFilter === "All" || customer.status === activeFilter;
        const matchesSearch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.contactNumber.includes(searchTerm);
        return matchesFilter && matchesSearch;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

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
                                        setCurrentPage(1); // reset page
                                    }}
                                    className={`px-3 py-1 rounded-lg transition ${activeFilter === filter
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
                                    setCurrentPage(1); // reset page
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
                                    <th className="py-2 px-4">Price Range</th>
                                    <th className="py-2 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCustomers.map((customer) => (
                                    <tr key={customer.number} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 text-gray-600">{customer.number}</td>
                                        <td className="py-2 px-4 text-gray-600">{customer.name}</td>
                                        <td className="py-2 px-4 text-gray-600">{customer.contactNumber}</td>
                                        <td className="py-2 px-4 text-gray-600">{customer.email}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col">
                                                <span>{customer.priceRange}</span>
                                                <span className="text-xs text-gray-500">INR</span>
                                            </div>
                                        </td>
                                        {/* <td className="py-2 px-4 text-gray-600">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${customer.status === "Interested"
                                                    ? "bg-green-100 text-green-800"
                                                    : customer.status === "Not Interested"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-blue-100 text-blue-800"
                                                    }`}
                                            >
                                                {customer.status}
                                            </span>
                                        </td> */}
                                        <td className="py-2 px-4 text-gray-600">
                                            <select
                                                value={customer.status}
                                                onChange={(e) => {
                                                    const updatedStatus = e.target.value;
                                                    const updatedCustomers = customerData.map((c) =>
                                                        c.number === customer.number ? { ...c, status: updatedStatus } : c
                                                    );
                                                    setCustomerData(updatedCustomers);
                                                }}
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${customer.status === "Interested"
                                                    ? "bg-green-100 text-green-800"
                                                    : customer.status === "Not Interested"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-blue-100 text-blue-800"
                                                    }`}
                                            >
                                                <option className="bg-green-100 text-green-800" value="Interested">Interested</option>
                                                <option className="bg-red-100 text-red-800" value="Not Interested">Not Interested</option>
                                                <option className="bg-blue-100 text-blue-800" value="Not Connected">Not Connected</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {currentCustomers.length === 0 && (
                            <p className="text-center py-6 text-gray-400">No customers found.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 px-1 text-sm text-gray-700">
                        <div>
                            Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length}
                        </div>
                        <div className="flex items-center gap-4 mt-2 sm:mt-0">
                            <span>Rows per page: {itemsPerPage}</span>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                                {"<"}
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
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
