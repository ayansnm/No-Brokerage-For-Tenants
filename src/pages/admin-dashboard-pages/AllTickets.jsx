import React, { useState } from 'react';
import Navbar from '../../components/Fields/Navbar';
import Sidebar from '../../components/Fields/Sidebar';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineSort } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';

const AllTickets = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#FAFAFA] poppins-regular">
            <Sidebar />

            <div className="flex-1">
                <Navbar />

                {/* Search & Sort */}
                <div className="flex justify-center mt-6 px-4">
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl">
                        <div className="flex items-center px-3 py-2 bg-white border rounded-lg border-[#e7e4e7] w-full focus-within:border-[#7f7f7f] focus-within:ring-1 focus-within:ring-[#7f7f7f] transition-all">
                            <FiSearch size={20} className="text-[#7f7f7f] mr-2" />
                            <input
                                type="text"
                                className="flex-1 outline-none text-sm"
                                placeholder="Search..."
                            />
                        </div>
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

                {/* Ticket Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 m-5 gap-5">
                    {[...Array(6)].map((_, index) => (
                        <TicketCard key={index} onResponseClick={() => setShowModal(true)} />
                    ))}
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {showModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/50 bg-opacity-40 flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                className="bg-white rounded-xl w-[90%] max-w-md p-6 relative"
                            >
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-3 right-3 text-gray-600 hover:text-black"
                                >
                                    <IoMdClose size={22} />
                                </button>

                                <div className="flex flex-col gap-4">
                                    {/* Header */}
                                    <h2 className="text-xl font-semibold text-primary">Ticket Response :</h2>
                                    <div className="flex items-center gap-4">
                                        <div className="w-[50%] h-32 bg-gray-200 rounded-md flex items-center justify-center">
                                            <span className="text-gray-400 text-4xl">🖼️</span>
                                        </div>
                                        {/* Ticket Info */}
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p><strong>Username:</strong> John Doe</p>
                                            <p><strong>Question:</strong> Is this property for rent?</p>
                                            <p><strong>Description:</strong> I want to know whether this listing is for rent or sale.</p>
                                        </div>
                                    </div>


                                    {/* Textarea */}
                                    <textarea
                                        rows={4}
                                        className="w-full cursor-pointer hover:bg-gray-100 flex-col text-sm px-4 py-2 poppins-regular border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] border-primary h-[80px]"
                                        placeholder="Write your response here..."
                                    ></textarea>
                                </div>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="mt-4 w-full bg-green-900 text-white py-2 rounded-lg hover:bg-green-800"
                                >
                                    Submit Response
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const TicketCard = ({ onResponseClick }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-full h-40 max-h-40 overflow-hidden">
        <div className="flex gap-4 h-full">
            <div className="w-32 h-full bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-gray-400 text-2xl">🖼️</span>
            </div>
            <div className="flex flex-col justify-between h-full overflow-hidden flex-1">
                <div className="overflow-hidden">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800 mb-1 text-ellipsis whitespace-nowrap overflow-hidden">
                            ABCD NAME
                        </h3>
                        <button
                            className="bg-green-900 rounded-full p-1 px-2 text-sm text-white cursor-pointer"
                            onClick={onResponseClick}
                        >
                            Give Response
                        </button>
                    </div>
                    <h3 className="font-semibold text-gray-800 mt-2 text-ellipsis whitespace-nowrap overflow-hidden">
                        Is this property for rent?
                    </h3>
                    <p className="text-sm text-gray-500 my-2 line-clamp-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, earum assumenda, id aspernatur quibusdam dolores...
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default AllTickets;
