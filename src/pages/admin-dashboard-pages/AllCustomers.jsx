import React, { useEffect, useState } from "react";
import Navbar from "../../components/Fields/Navbar";
import Sidebar from "../../components/Fields/Sidebar";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { IoAddOutline, IoCloseSharp } from "react-icons/io5";
import useFetchAllCustomers from "../../hooks/admin-hooks/useFetchAllCustomers";
import useDeleteUser from "../../hooks/admin-hooks/useDeleteUser";
import { motion, AnimatePresence } from "framer-motion";
import TextInput from "../../components/Fields/TextInput";
import useProfileEdit from "../../hooks/useProfileEdit";
import useHandleStatus from "../../hooks/admin-hooks/useHandleStatus";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AllCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { loading, allCustomers, fetchAllCustomers } = useFetchAllCustomers();
  const { loading: loadingDelete, deleteUser } = useDeleteUser();
  const [search, setSearch] = useState("");

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchAllCustomers(currentPage, itemsPerPage, search);
  }, [currentPage, search]);

  const confirmDelete = (userId) => {
    setSelectedUserId(userId);
    setShowDeletePopup(true);
  };

  const confirmEdit = (userId, fullName, email, address) => {
    setSelectedUserId(userId);
    setId(userId);
    setUser({
      fullName,
      email,
      address,
    });
    setShowEditPopup(true);
  };

  const [id, setId] = useState("");

  const handleConfirmDelete = async () => {
    if (selectedUserId) {
      await deleteUser(selectedUserId);
      setShowDeletePopup(false);
      setSelectedUserId(null);
      fetchAllCustomers(currentPage, itemsPerPage);
    }
  };
  const { loading: editLoading, editProfile } = useProfileEdit();

  const handleConfirmEdit = async () => {
    console.log(user);
    await editProfile({
      data: {
        fullName: user.fullName,
        email: user.email,
        address: user.address,
      },
      userId: id,
    });
    console.log({
      data: {
        fullName: user.fullName,
        email: user.email,
        address: user.address,
      },
    });

    fetchAllCustomers(currentPage, itemsPerPage);
    setShowEditPopup(false);
  };
  const { loading: loadStatus, handleStatus } = useHandleStatus();
  const handleStatusToggle = async (id, newStatus) => {
    // Call your API or update state here
    await handleStatus(id, newStatus);
    console.log("Toggle ID:", id, "New Status:", newStatus);
    fetchAllCustomers(currentPage, itemsPerPage);
    // Example: update status in DB or local state
  };

  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState({ id: null, status: null });

  const confirmStatusChange = () => {
    handleStatusToggle(pendingStatusChange.id, pendingStatusChange.status);
    setShowStatusPopup(false);
    setPendingStatusChange({ id: null, status: null });
  };

  const cancelStatusChange = () => {
    setShowStatusPopup(false);
    setPendingStatusChange({ id: null, status: null });
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] poppins-regular h-screen overflow-hidden">
      <Sidebar className="w-[250px] h-screen sticky top-0 overflow-hidden" />
      <div className="flex-1 overflow-y-auto h-screen">
        <Navbar pageName="All Customer" />

        {/* Top Filters & Button */}
        <div data-aos="zoom-up" className="w-full px-5 flex my-3 flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* <button className="p-3 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition">
              <FaFilter size={16} className="text-gray-500" />
            </button> */}
            <div className="flex items-center w-full sm:w-[320px] px-3 py-1 bg-white border border-gray-300 rounded-lg focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-400 transition">
              <FiSearch size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by Name and Mobile no."
                className="w-full pl-2 py-1 text-sm outline-none bg-transparent"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          {/* <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-900 hover:bg-green-800 text-white text-sm transition self-start sm:self-auto">
            <IoAddOutline size={18} />
            Add Customer
          </button> */}
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-5 mt-4 animate-fadeIn">
          <table className="min-w-full bg-white rounded-lg shadow-sm overflow-hidden">
            <thead className="bg-primary text-secondary text-sm">
              <tr>
                <th className="text-left px-4 py-3">#</th>
                <th className="text-left px-4 py-3">NAME</th>
                <th className="text-left px-4 py-3">EMAIL</th>
                <th className="text-left px-4 py-3">STATUS</th>
                <th className="text-left px-4 py-3">PRICE RANGE</th>
                <th className="text-left px-4 py-3">ACTION</th>
                <th className="text-left px-4 py-3">PROPERTY</th>
                <th className="text-left px-4 py-3">SHARE</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {allCustomers?.map((item, index) => (
                <tr
                  key={item?._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    {item?.fullName} <br /> {item?.mobileNo}
                  </td>
                  <td className="px-4 py-3">{item?.email}</td>
                  <td className="px-4 py-3">
                    <div
                      className={`px-2 py-1 rounded-full text-xs text-center font-medium ${item?.isSubscribedForCommercial ||
                        item?.isSubscribedForResidential
                        ? "text-green-700 bg-green-200"
                        : "text-red-700 bg-red-200"
                        }`}
                    >
                      {item?.isSubscribedForCommercial ||
                        item?.isSubscribedForResidential
                        ? "Deal Completed"
                        : "Unpaid"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span>
                        {item?.propertyRequirements?.[0]?.priceRange || "0000"}
                      </span>
                      <span className="text-xs text-gray-500">INR</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 flex flex-col items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => confirmDelete(item?._id)}
                        className="text-white cursor-pointer bg-red-600 p-1 rounded-full"
                      >
                        <FiTrash2 size={16} />
                      </button>
                      <button
                        onClick={() =>
                          confirmEdit(
                            item?._id,
                            item?.fullName,
                            item?.email,
                            item?.address
                          )
                        }
                        className="text-white cursor-pointer bg-blue-600 p-1 rounded-full"
                      >
                        <FiEdit2 size={16} />
                      </button>
                    </div>

                    {/* Toggle Switch for Active Status */}
                    <div className="mt-2">
                      <label className="inline-flex items-center cursor-pointer mt-1">
                        <input
                          type="checkbox"
                          checked={item?.isActive}
                          onChange={(e) => {
                            setPendingStatusChange({ id: item._id, status: e.target.checked });
                            setShowStatusPopup(true);
                          }}
                          className="sr-only"
                        />
                        <div className={`w-10 h-5 ${item?.isActive ? "bg-primary" : "bg-gray-500"} rounded-full shadow-inner relative transition-all duration-300`}>
                          <div className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${item?.isActive ? "translate-x-5 bg-green-500" : "bg-gray-500"}`}></div>
                        </div>
                      </label>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {item?.propertyRequirements?.[0]?.propertyPurpose
                      ? item.propertyRequirements[0].propertyPurpose
                        .charAt(0)
                        .toUpperCase() +
                      item.propertyRequirements[0].propertyPurpose.slice(1)
                      : "No Requirements"}
                  </td>
                  <td>
                    <p
                      onClick={() => {
                        if (item?.propertyRequirements?.[0]?.propertyPurpose) {
                          navigate(`/app/admin/shareproperty/${item?._id}`);
                        } else {
                          toast.error("This customer has not subscribed yet.");
                        }
                      }}
                      className="p-2 bg-primary rounded-full w-32 text-center text-xs text-white cursor-pointer"
                    >
                      Share Property
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AnimatePresence>
            {showStatusPopup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white rounded-lg shadow-lg p-6 w-80 text-center"
                >
                  <h2 className="text-lg font-semibold mb-4">Confirm Status Change</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to change the status?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={confirmStatusChange}
                      className={`text-white px-4 py-2 rounded hover:opacity-90 ${pendingStatusChange.status
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                        }`}
                    >
                      Yes
                    </button>

                    <button
                      onClick={cancelStatusChange}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      No
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delete Confirmation Popup */}
          <AnimatePresence>
            {showDeletePopup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white rounded-lg shadow-lg p-6 w-80 text-center"
                >
                  <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Do you want to delete this user?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleConfirmDelete}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowDeletePopup(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      No
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showEditPopup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-40 z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white rounded-lg shadow-lg p-6 w-80 text-center"
                >
                  <div
                    onClick={() => setShowEditPopup(false)}
                    className="flex  justify-end items-end "
                  >
                    <IoCloseSharp
                      size={25}
                      className="text-gray-700 hover:text-gray-600"
                    />
                  </div>
                  <h2 className="text-lg font-semibold mb-4">Edit Customer</h2>
                  <div className="text-start">
                    <TextInput
                      label={"User full name"}
                      placeholder={"Enter full name"}
                      className="text-start"
                      value={user.fullName}
                      onChange={(e) => {
                        setUser((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }));
                      }}
                    />
                    <TextInput
                      label={"Email"}
                      placeholder={"Enter full name"}
                      type="email"
                      className="text-start"
                      value={user.email}
                      onChange={(e) => {
                        setUser((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                      }}
                    />

                    <label htmlFor="" className="text-sm poppins-medium">
                      Address
                    </label>
                    <textarea
                      className="w-full cursor-pointer hover:bg-gray-100 flex-col text-sm px-4 py-2 poppins-regular border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] border-primary h-[80px]"
                      placeholder="Enter description"
                      value={user.address}
                      onChange={(text) =>
                        setUser({
                          ...user,
                          address: text.target.value,
                        })
                      }
                    />

                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handleConfirmEdit}
                        className="bg-primary text-white rounded-full px-4 py-2  cursor-pointer"
                      >
                        Update User
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination Controls */}
          <div className="flex pb-4 flex-col sm:flex-row sm:items-center justify-between mt-4 px-1 text-sm text-gray-700">
            <div>
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {(currentPage - 1) * itemsPerPage + allCustomers.length} of ?
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span>Rows per page: {itemsPerPage}</span>
              <span>Page {currentPage}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                {"<"}
              </button>
              <button
                onClick={() => {
                  if (allCustomers.length === itemsPerPage) {
                    setCurrentPage((prev) => prev + 1);
                  }
                }}
                disabled={allCustomers.length < itemsPerPage}
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

export default AllCustomers;
