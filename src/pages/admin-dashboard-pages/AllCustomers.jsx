import React from 'react';
import Navbar from '../../components/Fields/Navbar';
import Sidebar from '../../components/Fields/Sidebar';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineSort } from 'react-icons/md';

const AllTickets = () => {
    return (
        <div className="flex min-h-screen bg-[#FAFAFA] poppins-regular">
            <Sidebar />

            <div className="flex-1">
                <Navbar />

                {/* Container for search and sort */}
                <div className="flex justify-center mt-6 px-4">
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl">
                        {/* Search input */}
                        <div className="flex items-center px-3 py-2 bg-white border rounded-lg border-[#e7e4e7] w-full focus-within:border-[#7f7f7f] focus-within:ring-1 focus-within:ring-[#7f7f7f] transition-all">
                            <FiSearch size={20} className="text-[#7f7f7f] mr-2" />
                            <input
                                type="text"
                                className="flex-1 outline-none text-sm"
                                placeholder="Search..."
                            />
                        </div>

                        {/* Sort dropdown */}
                        <div className="flex items-center px-3 py-2 bg-white border rounded-lg border-[#e7e4e7] w-full sm:w-56 text-sm text-[#7f7f7f] focus-within:border-[#7f7f7f] focus-within:ring-1 focus-within:ring-[#7f7f7f] transition-all">
                            <MdOutlineSort size={22} className="mr-2 text-[#7f7f7f]" />
                            <select className="w-full outline-none bg-transparent">
                                <option value="">Sort</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllTickets;
