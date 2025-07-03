import React, { useState } from "react";
import Navbar from "../../components/Fields/Navbar";
import Sidebar from "../../components/Fields/Sidebar";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";

const AllPayments = () => {
  // const brokers = Array.from({ length: 30 }, (_, i) => ({
  //     id: i + 1,
  //     name: `Customer ${i + 1}`,
  //     email: `broker${i + 1}@example.com`,
  //     status: i % 3 === 0 ? 'Received Payment' : 'Refunded',
  //     rate: `${20000 + i * 1000}`,
  //     properties: i % 2 === 0 ? 'Residential' : 'Commercial',
  // }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentBrokers = brokers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] poppins-regular h-screen overflow-hidden">
      <Sidebar className="w-[250px] h-screen sticky top-0 overflow-hidden" />
      <div className="flex-1 overflow-y-auto h-screen">
        <Navbar pageName={"All Payments"} />

        <div className="w-full px-5 my-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fadeIn">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition">
              <FaFilter size={18} className="text-black" />
            </button>

            <div className="flex items-center w-full sm:w-[320px] px-3 py-1 bg-white border border-gray-300 rounded-lg focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-400 transition">
              <FiSearch size={18} className="text-black" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-2 py-1 text-sm outline-none bg-transparent"
              />
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-green-800 text-white cursor-pointer text-sm transition self-start sm:self-auto">
            <IoAddOutline size={18} />
            Add Payment
          </button>
        </div>

        <div className="overflow-x-auto px-5 mt-4 animate-fadeIn">
          <table className="min-w-full bg-white rounded-lg shadow-sm overflow-hidden">
            <thead className="bg-primary text-secondary text-sm">
              <tr>
                <th className="text-left px-4 py-3">#</th>
                <th className="text-left px-4 py-3">NAME</th>
                <th className="text-left px-4 py-3">EMAIL</th>
                <th className="text-left px-4 py-3">AMOUNT</th>
                <th className="text-left px-4 py-3">STATUS</th>
                <th className="text-left px-4 py-3">TYPE</th>
                <th className="text-left px-4 py-3">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Ramesh</td>
                <td className="px-4 py-3">ramesh@gmail.com</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-green-700">25,000</span>
                    <span className="text-xs text-gray-500">INR</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-primary">
                    Active
                  </span>
                </td>
                <td className="px-4 py-3">Customer</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-white bg-red-600 p-1 rounded-full">
                    <FiTrash2 size={16} />
                  </button>
                  <button className="text-white bg-blue-600 p-1 rounded-full">
                    <FiEdit2 size={16} />
                  </button>
                </td>
              </tr>

              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">Suresh</td>
                <td className="px-4 py-3">suresh@gmail.com</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-green-700">30,000</span>
                    <span className="text-xs text-gray-500">INR</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </td>
                <td className="px-4 py-3">Customer</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-white bg-red-600 p-1 rounded-full">
                    <FiTrash2 size={16} />
                  </button>
                  <button className="text-white bg-blue-600 p-1 rounded-full">
                    <FiEdit2 size={16} />
                  </button>
                </td>
              </tr>

              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">3</td>
                <td className="px-4 py-3">Priya</td>
                <td className="px-4 py-3">priya@gmail.com</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-green-700">40,000</span>
                    <span className="text-xs text-gray-500">INR</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium">
                    Inactive
                  </span>
                </td>
                <td className="px-4 py-3">Customer</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-white bg-red-600 p-1 rounded-full">
                    <FiTrash2 size={16} />
                  </button>
                  <button className="text-white bg-blue-600 p-1 rounded-full">
                    <FiEdit2 size={16} />
                  </button>
                </td>
              </tr>

              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">4</td>
                <td className="px-4 py-3">Anjali</td>
                <td className="px-4 py-3">anjali@gmail.com</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-green-700">20,000</span>
                    <span className="text-xs text-gray-500">INR</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </td>
                <td className="px-4 py-3">Customer</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-white bg-red-600 p-1 rounded-full">
                    <FiTrash2 size={16} />
                  </button>
                  <button className="text-white bg-blue-600 p-1 rounded-full">
                    <FiEdit2 size={16} />
                  </button>
                </td>
              </tr>

              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">5</td>
                <td className="px-4 py-3">Vikas</td>
                <td className="px-4 py-3">vikas@gmail.com</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-green-700">50,000</span>
                    <span className="text-xs text-gray-500">INR</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </td>
                <td className="px-4 py-3">Customer</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-white bg-red-600 p-1 rounded-full">
                    <FiTrash2 size={16} />
                  </button>
                  <button className="text-white bg-blue-600 p-1 rounded-full">
                    <FiEdit2 size={16} />
                  </button>
                </td>
              </tr>

              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">6</td>
                <td className="px-4 py-3">Pooja</td>
                <td className="px-4 py-3">pooja@gmail.com</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-green-700">15,000</span>
                    <span className="text-xs text-gray-500">INR</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium">
                    Inactive
                  </span>
                </td>
                <td className="px-4 py-3">Customer</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-white bg-red-600 p-1 rounded-full">
                    <FiTrash2 size={16} />
                  </button>
                  <button className="text-white bg-blue-600 p-1 rounded-full">
                    <FiEdit2 size={16} />
                  </button>
                </td>
              </tr>

              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">7</td>
                <td className="px-4 py-3">Rahul</td>
                <td className="px-4 py-3">rahul@gmail.com</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-green-700">35,000</span>
                    <span className="text-xs text-gray-500">INR</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </td>
                <td className="px-4 py-3">Customer</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-white bg-red-600 p-1 rounded-full">
                    <FiTrash2 size={16} />
                  </button>
                  <button className="text-white bg-blue-600 p-1 rounded-full">
                    <FiEdit2 size={16} />
                  </button>
                </td>
              </tr>

              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">8</td>
                <td className="px-4 py-3">Meena</td>
                <td className="px-4 py-3">meena@gmail.com</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-green-700">45,000</span>
                    <span className="text-xs text-gray-500">INR</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium">
                    Inactive
                  </span>
                </td>
                <td className="px-4 py-3">Customer</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-white bg-red-600 p-1 rounded-full">
                    <FiTrash2 size={16} />
                  </button>
                  <button className="text-white bg-blue-600 p-1 rounded-full">
                    <FiEdit2 size={16} />
                  </button>
                </td>
              </tr>

              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">9</td>
                <td className="px-4 py-3">Amit</td>
                <td className="px-4 py-3">amit@gmail.com</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-green-700">22,000</span>
                    <span className="text-xs text-gray-500">INR</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </td>
                <td className="px-4 py-3">Customer</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-white bg-red-600 p-1 rounded-full">
                    <FiTrash2 size={16} />
                  </button>
                  <button className="text-white bg-blue-600 p-1 rounded-full">
                    <FiEdit2 size={16} />
                  </button>
                </td>
              </tr>

              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">10</td>
                <td className="px-4 py-3">Sneha</td>
                <td className="px-4 py-3">sneha@gmail.com</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-green-700">28,000</span>
                    <span className="text-xs text-gray-500">INR</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium">
                    Inactive
                  </span>
                </td>
                <td className="px-4 py-3">Customer</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-white bg-red-600 p-1 rounded-full">
                    <FiTrash2 size={16} />
                  </button>
                  <button className="text-white bg-blue-600 p-1 rounded-full">
                    <FiEdit2 size={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex pb-4 flex-col sm:flex-row sm:items-center justify-between mt-4 px-1 text-sm text-gray-700">
            <div>Showing 2 – 2 of 2</div>

            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span>Rows per page: {itemsPerPage}</span>
              <span>Page 1 of 1</span>

              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                {"<"}
              </button>

              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={indexOfLastItem >= 0}
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

export default AllPayments;
