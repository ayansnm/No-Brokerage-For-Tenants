import React, { useState } from 'react';
import Navbar from '../../components/Fields/Navbar';
import Sidebar from '../../components/Fields/Sidebar';
import { FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';
import { IoAddOutline } from 'react-icons/io5';

const AllPayments = () => {
    const brokers = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: `Broker ${i + 1}`,
        email: `broker${i + 1}@example.com`,
        status: i % 3 === 0 ? 'Payment Received' : 'Refunded',
        rate: `${20000 + i * 1000}`,
        properties: i % 2 === 0 ? 'Residential' : 'Commercial',
        share: ``,
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBrokers = brokers.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="flex min-h-screen bg-[#FAFAFA] poppins-regular">
            <Sidebar />

            <div className="flex-1">
                <Navbar />

                <div className="w-full px-5 my-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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

                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-900 hover:bg-green-800 text-white text-sm transition self-start sm:self-auto">
                        <IoAddOutline size={18} />
                        Add Broker
                    </button>
                </div>

                <div className="overflow-x-auto px-5 mt-4">
                    <table className="min-w-full bg-white rounded-lg shadow-sm overflow-hidden">
                        <thead className="bg-gray-100 text-gray-600 text-sm">
                            <tr>
                                <th className="text-left px-4 py-3">#</th>
                                <th className="text-left px-4 py-3">Name</th>
                                <th className="text-left px-4 py-3">Email</th>
                                <th className="text-left px-4 py-3">Amount</th>
                                <th className="text-left px-4 py-3">Status</th>
                                <th className="text-left px-4 py-3">Action</th>
                                <th className="text-left px-4 py-3">Properties</th>
                                <th className="text-left px-4 py-3">Share</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                            {currentBrokers.map((broker, index) => (
                                <tr key={broker.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-3">{indexOfFirstItem + index + 1}</td>
                                    <td className="px-4 py-3">{broker.name}</td>
                                    <td className="px-4 py-3">{broker.email}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col">
                                            <span>{broker.rate}</span>
                                            <span className="text-xs text-gray-500">INR</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${broker.status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {broker.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button className="text-white bg-red-600 p-1 rounded-full">
                                            <FiTrash2 size={16} />
                                        </button>
                                        <button className="text-white bg-blue-600 p-1 rounded-full">
                                            <FiEdit2 size={16} />
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">{broker.properties}</td>
                                    <td className="px-4 py-3">{broker.share}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 px-1 text-sm text-gray-700">
                        <div>
                            Showing {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, brokers.length)} of {brokers.length}
                        </div>

                        <div className="flex items-center gap-4 mt-2 sm:mt-0">
                            <span>Rows per page: {itemsPerPage}</span>
                            <span>Page {currentPage} of {Math.ceil(brokers.length / itemsPerPage)}</span>

                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                                {'<'}
                            </button>

                            <button
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={indexOfLastItem >= brokers.length}
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                                {'>'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPayments;
