import React, { useEffect, useState } from "react";
import Navbar from "../../components/Fields/Navbar";
import Sidebar from "../../components/Fields/Sidebar";
import { FiSearch } from "react-icons/fi";
import { MdOutlineSort } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import useGetAllTickets from "../../hooks/admin-hooks/useGetAllTickets";
import useGiveResponseTicket from "../../hooks/admin-hooks/useGiveResponseTicket";

const AllTickets = () => {
  const [showModal, setShowModal] = useState(false);
  const { loading, tickets, getAllTickets } = useGetAllTickets();
  const API_URL = import.meta.env.VITE_API_URL;
  const [ticketSelected, setTicketSelected] = useState({});
  const fetchTickets = async () => {
    await getAllTickets();
  };

  const { giveResponse, loading: loadResponse } = useGiveResponseTicket();
  const [reply, setReply] = useState("");
  const handleResponse = async (reply) => {
    await giveResponse(reply, ticketSelected.id);
    fetchTickets();
    setShowModal(false);
  };
  useEffect(() => {
    fetchTickets();
  }, []);
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-[#FAFAFA] poppins-regular h-screen overflow-hidden">
      <Sidebar className="w-[250px] h-screen sticky top-0 overflow-hidden" />

      <div className="flex-1 overflow-y-auto h-screen">
        <Navbar pageName="All Tickets" />
        {/* {JSON.stringify(tickets.length)} */}
        {/* Search & Sort */}
        <div className="flex justify-between mt-6 px-4">
          <div className="flex w-full sm:w-96 items-center px-3 py-2 bg-white border rounded-lg border-[#e7e4e7]  focus-within:border-[#7f7f7f] focus-within:ring-1 focus-within:ring-[#7f7f7f] transition-all">
            <FiSearch size={20} className="text-[#7f7f7f] mr-2" />
            <input
              type="text"
              className="flex-1 outline-none text-sm"
              placeholder="Search..."
            />
          </div>
          <div className="flex items-center px-3 py-2 bg-white border rounded-lg border-[#e7e4e7] w-full sm:w-40 text-sm text-[#7f7f7f] focus-within:border-[#7f7f7f] focus-within:ring-1 focus-within:ring-[#7f7f7f] transition-all">
            <MdOutlineSort size={22} className="mr-2 text-[#7f7f7f]" />
            <select className="w-full outline-none bg-transparent">
              <option value="">Sort</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Ticket Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 m-5 gap-5">
          {tickets.map((item, index) => (
            <TicketCard
              key={index}
              photo={item?.photo}
              userName={item?.user?.fullName}
              message={item?.message}
              description={item?.description}
              response={item?.reply}
              onResponseClick={() => {
                setTicketSelected({
                  fullName: item?.user?.fullName,
                  message: item?.message,
                  description: item?.description,
                  id: item?._id,
                  photo: item?.photo,
                });
                setShowModal(true);
              }}
            />
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 bg-opacity-40 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-white rounded-xl w-full max-w-2xl p-6 relative"
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-black"
                >
                  <IoMdClose size={22} />
                </button>

                <div className="flex flex-col gap-4">
                  {/* Header */}
                  <h2 className="text-xl font-semibold text-[#265953]">
                    Ticket Response :
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-[50%] h-32 bg-gray-200 rounded-md flex items-center justify-center" style={{ backgroundImage: `url(${API_URL}/${ticketSelected?.photo})` }}>
                    </div>
                    {/* Ticket Info */}
                    <div className="space-y-2 text-sm text-gray-700 w-full sm:w-[50%]">
                      <p>
                        <strong>Username:</strong> {ticketSelected?.fullName}
                      </p>
                      <p>
                        <strong>Question:</strong> {ticketSelected?.message}
                      </p>
                      <p className="break-words whitespace-pre-wrap">
                        <strong>Description:</strong>{" "}
                        {ticketSelected?.description}
                      </p>
                    </div>
                  </div>

                  {/* Textarea */}
                  <textarea
                    rows={4}
                    className="w-full hover:bg-gray-100 flex-col text-sm px-4 py-2 poppins-regular border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] border-primary"
                    placeholder="Write your response here..."
                    onChange={(e) => setReply(e.target.value)}
                    value={reply}
                  />
                </div>

                <button
                  onClick={() => handleResponse(reply)}
                  className="mt-4 w-full bg-[#265953] text-white py-2 rounded-lg hover:bg-[#265953ee] cursor-pointer"
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

const TicketCard = ({
  onResponseClick,
  userName,
  message,
  description,
  photo,
  response,
}) => {
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Image Section - Fixed width */}
        <div className="w-full sm:w-40 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
          {photo ? (
            <img
              src={`${API_URL}/${photo}`}
              alt="Ticket attachment"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-4xl">📎</div>
          )}
        </div>

        {/* Content Section - Flexible but constrained */}
        <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex item overflow */}
          {/* Header with user and action button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
            <div className="min-w-0"> {/* Prevents text overflow */}
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">From:</span>
                <h3 className="font-semibold text-gray-900 truncate">
                  {userName}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Question:</span>
                <h4 className="font-semibold text-lg text-gray-800 mt-1 truncate">
                  {message}
                </h4>
              </div>
            </div>

            {response === null ? (
              <button
                className="bg-primary hover:opacity-95 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 flex-shrink-0"
                onClick={onResponseClick}
              >
                Respond
              </button>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 flex-shrink-0">
                Responded
              </span>
            )}
          </div>

          {/* Description with proper overflow handling */}
          <div className="bg-gray-50 rounded-lg mb-4">
            <span className="font-medium text-gray-700">Description:</span>
            <p className="text-gray-700 break-words whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Response section */}
          <div>
            {response ? (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-blue-600">Response</span>
                </div>
                <p className="text-gray-700 break-words whitespace-pre-line">
                  {response}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Awaiting response</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllTickets;
