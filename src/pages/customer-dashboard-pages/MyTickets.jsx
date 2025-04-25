import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Fields/Navbar";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import TextInput from "../../components/Fields/TextInput";
import { MdOutlineFileUpload } from "react-icons/md";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import useAddTicket from "../../hooks/customer-hooks/useAddTicket";
import useGetTickets from "../../hooks/customer-hooks/useGetTickets";

// Reusable Ticket Card Component
const TicketCard = ({ question, description, image, onClick, reply }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-full h-40 max-h-40 overflow-hidden">
    <div className="flex gap-4 h-full">
      {image && (
        <img
          src={`http://145.223.20.218:2025/${image}`}
          alt="Ticket Photo"
          className="w-32 h-full bg-gray-200 rounded-md flex items-center justify-center"
        />
      )}
      {/* <div className="w-32 h-full bg-gray-200 rounded-md flex items-center justify-center">
        <span className="text-gray-400 text-2xl">🖼️</span>
      </div> */}
      <div className="flex flex-col justify-between h-full overflow-hidden flex-1">
        <div className="overflow-hidden">
          <h3 className="font-semibold text-gray-800 mb-1 text-ellipsis whitespace-nowrap overflow-hidden">
            {question}
          </h3>
          <p className="text-sm text-gray-500 mb-2 line-clamp-3">
            {description}
          </p>
        </div>
        <button
          onClick={onClick}
          className="text-sm text-left text-primary font-medium hover:underline"
        >
          View Response →
        </button>
      </div>
    </div>
  </div>
);

const MyTickets = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedTicket, setSelectedTicket] = useState(null); // For View Response
  const fileInputRef = useRef(null);

  const handleClick = () => fileInputRef.current.click();
  const [imageName, setImageName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImageName(file.name); // Set only the name of the file
    }
  };

  const { loading: loadTicket, tickets, getTickets } = useGetTickets();
  const fetchTickets = async () => await getTickets();

  useEffect(() => {
    fetchTickets();
  }, []);

  const { loading, addTicket } = useAddTicket();

  const handleSubmit = async () => {
    await addTicket(formData);
    setShowModal(false);
    fetchTickets();
  };

  return (
    <div className="min-h-screen poppins-regular bg-[#f9f9f9]">
      <Navbar pageName="My Tickets" />

      <div className="w-full flex justify-center p-4">
        <div className="w-full md:w-[90vw] lg:w-[75vw] rounded-2xl p-2 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">All Tickets</h3>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-[#01946f]"
            >
              <FaPlus className="text-sm" />
              Add new Ticket
            </button>
          </div>

          {Array.isArray(tickets) && tickets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tickets.map((item, index) => (
                <TicketCard
                  key={index}
                  question={item.message}
                  description={item.description}
                  reply={item?.reply}
                  onClick={() => setSelectedTicket(item)}
                  image={item.photo}
                />
              ))}
            </div>
          ) : (
            <p>No tickets found.</p>
          )}
        </div>
      </div>

      {/* Add Ticket Modal */}
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
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-xl w-[90%] max-w-md p-6 relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                <IoMdClose size={22} />
              </button>

              <h2 className="text-lg font-semibold text-primary mb-4">
                Add Ticket
              </h2>

              <form className="space-y-4">
                <div>
                  <p className="text-sm poppins-medium mb-1">
                    Images of your query
                  </p>
                  <div
                    className="w-full cursor-pointer hover:bg-gray-100 flex-col text-sm px-5 poppins-regular border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] border-primary h-[120px] flex justify-center items-center"
                    onClick={handleClick}
                  >
                    <MdOutlineFileUpload className="text-primary w-16 h-16" />
                    <p className="text-primary poppins-medium">
                      {imageName || "Upload Image"}
                    </p>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                {/* {imageName && (
                  <p className="text-sm text-gray-700 mt-2">
                    Selected Image:{" "}
                    <span className="font-medium">{imageName}</span>
                  </p>
                )} */}

                <TextInput
                  label={"Question"}
                  placeholder={"Ask your question"}
                  name={"question"}
                  type="text"
                  value={formData.question}
                  onChange={(text) =>
                    setFormData({ ...formData, question: text.target.value })
                  }
                />

                <div>
                  <p className="text-sm poppins-medium">Description</p>
                  <textarea
                    className="w-full cursor-pointer hover:bg-gray-100 flex-col text-sm px-4 py-2 poppins-regular border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] border-primary h-[80px]"
                    placeholder="Enter description"
                    onChange={(text) =>
                      setFormData({
                        ...formData,
                        description: text.target.value,
                      })
                    }
                  />
                </div>

                <AnimatedButton text={"Submit Ticket"} onClick={handleSubmit} />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Response Modal */}
      <AnimatePresence>
        {selectedTicket && (
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
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-xl w-[90%] max-w-md p-6 relative"
            >
              <button
                onClick={() => setSelectedTicket(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                <IoMdClose size={22} />
              </button>

              <h2 className="text-lg font-semibold text-primary mb-2">
                Ticket Response
              </h2>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Question:</strong> {selectedTicket.message}
                </p>
                <p className="text-sm">
                  <strong>Description:</strong> {selectedTicket.description}
                </p>
                <p className="text-sm text-green-700">
                  <strong>Response:</strong>{" "}
                  {selectedTicket.reply || "No response yet."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyTickets;
