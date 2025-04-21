import React, { useRef, useState } from "react";
import Navbar from "../../components/Fields/Navbar";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import TextInput from "../../components/Fields/TextInput";
import { MdOutlineFileUpload } from "react-icons/md";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const TicketCard = () => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-full">
    <div className="flex gap-4 h-full">
      <div className="w-40 bg-gray-200 rounded-md flex items-center justify-center h-full">
        <span className="text-gray-400 text-xl">🖼️</span>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Question</h3>
          <p className="text-sm text-gray-500 mb-2">
            This is the description This is the description This is the
            description
          </p>
        </div>
        <a
          href="#"
          className="text-sm text-primary font-medium hover:underline mt-auto"
        >
          View Response →
        </a>
      </div>
    </div>
  </div>
);

const MyTickets = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // Store the uploaded file in formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: files[0], // Store the file in the formData
      }));
    }
  };

  const handleSubmit = async () => {
    console.log(formData); // formData now contains the image file
    toast.success("Ticket Added!");
    setShowModal(false);
    // You can further handle the form submission here, like sending data to an API
  };
  return (
    <div className="min-h-screen poppins-regular bg-[#f9f9f9]">
      <Navbar />

      {/* Main Content */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <TicketCard key={index} />
            ))}
          </div>
        </div>
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
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-xl w-[90%] max-w-md p-6 relative"
            >
              {/* Close Button */}
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
                {/* Upload Image */}
                <div>
                  <p className="text-sm poppins-medium">Images of your query</p>
                  <div
                    className="w-full cursor-pointer hover:bg-gray-100 flex-col text-sm px-5 poppins-regular border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] border-primary h-[120px] flex justify-center items-center"
                    onClick={handleClick}
                  >
                    <MdOutlineFileUpload className="text-primary w-16 h-16" />
                    <p className="text-primary poppins-medium">Upload Images</p>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Question Input */}
                <div>
                  <TextInput
                    label={"Question"}
                    placeholder={"Ask your question"}
                    name={"question"}
                    type="text"
                    value={formData.question}
                    onChange={(text) => {
                      setFormData({
                        ...formData,
                        question: text.target.value,
                      });
                    }}
                  />
                </div>

                {/* Description Input */}
                <div>
                  <p className="text-sm poppins-medium">Description</p>
                  <textarea
                    className="w-full cursor-pointer hover:bg-gray-100 flex-col text-sm px-4 py-2 poppins-regular border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] border-primary h-[80px] flex justify-center items-center"
                    placeholder="Enter description"
                    onChange={(text) => {
                      setFormData({
                        ...formData,
                        description: text.target.value,
                      });
                    }}
                  />
                </div>

                <AnimatedButton text={"Submit Ticket"} onClick={handleSubmit} />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyTickets;
