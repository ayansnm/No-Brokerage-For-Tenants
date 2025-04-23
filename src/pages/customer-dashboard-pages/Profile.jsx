import React, { useState, useRef, useEffect } from "react";
import { VscBell } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import ProfileImg from "../../assets/profile.png";
import { RxDashboard } from "react-icons/rx";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import useGetProfile from "../../hooks/customer-hooks/useGetProfile";
import TextInput from "../../components/Fields/TextInput";
import useProfileEdit from "../../hooks/useProfileEdit";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";

const Profile = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const { loading, getProfile, userProfile } = useGetProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile();
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    // When userProfile updates, update formData
    setData();
  }, [userProfile]);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const [formData, setFormData] = useState({
    fullName: userProfile?.fullName || "",
    email: userProfile?.email || "",
    mobileNo: userProfile?.mobileNo || "",
    address: userProfile?.address || "",
  });
  const setData = () => {
    setFormData({
      fullName: userProfile?.fullName || "",
      email: userProfile?.email || "",
      mobileNo: userProfile?.mobileNo || "",
      address: userProfile?.address || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Real data from API fallback to dummy values
  const userName = userProfile?.fullName || "John Doe";
  const userEmail = userProfile?.email || "johndoe@example.com";
  const userPhone = userProfile?.mobileNo || "+91 9876543210";
  const userAddress = userProfile?.address || "Ahmedabad, Gujarat, India";
  const [showEditModal, setShowEditModal] = useState(false);

  const { loading: editLoading, editProfile } = useProfileEdit();
  const handleSubmit = async () => {
    await editProfile({
      data: {
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
      },
      userId: null,
    });
    await getProfile(); // Refresh the data in UI
    setShowEditModal(false);
  };

  const role = localStorage.getItem('role')

  return (
    <div className="bg-[#FAFAFA] min-h-screen poppins-regular">
      {/* Top Navbar */}
      <nav className="p-5">
        <div className="flex justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">Profile</h1>
            <p className="text-sm text-gray-600">{currentDate}</p>
          </div>

          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-4 cursor-pointer">
              <div className="p-2 rounded-full bg-white border border-gray-400">
                <VscBell size={24} className="text-gray-600" />
              </div>

              <div className="hidden sm:block w-px h-8 bg-gray-400" />

              <div
                className="flex items-center gap-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={ProfileImg}
                  alt="Profile"
                  className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover"
                />
                <div className="hidden sm:block">
                  <p className="font-medium text-sm">{userName}</p>
                  <p className="text-sm text-gray-600">Customer</p>
                </div>
              </div>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white border rounded-md shadow-lg z-50">
                <ul className="py-2 text-sm">
                {role === 'admin' ?
                    <>
                      <li
                        className="cursor-pointer p-2 flex items-center gap-2 hover:bg-gray-100"
                        onClick={() => navigate("/admin/dashboard")}
                      >
                        <RxDashboard /> Dashboard
                      </li>
                    </> : <>
                      <li
                        className="cursor-pointer p-2 flex items-center gap-2 hover:bg-gray-100"
                        onClick={() => navigate("/")}
                      >
                        <RxDashboard /> Home
                      </li>
                    </>}
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/Login");
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Profile Card */}
      <div className="flex justify-center p-4">
        <div className="w-full max-w-4xl bg-white border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center text-center gap-2 w-full md:w-1/3">
            <img
              src={ProfileImg}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover border"
            />
            <h2 className="text-xl font-semibold">{userName}</h2>
            <p className="text-sm text-gray-600">{userEmail}</p>
          </div>

          {/* User Info Section */}
          <div className="w-full md:w-2/3 space-y-4 text-sm sm:text-base">
            <div>
              <label className="font-medium text-gray-700">
                Mobile Number:
              </label>
              <p>{userPhone}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Email:</label>
              <p>{userEmail}</p>
            </div>
            <div>
              <label className="font-medium text-gray-700">Address:</label>
              <p>{userAddress}</p>
            </div>
            <AnimatedButton
              text={"Edit Profile"}
              otherStyles="w-[120px]"
              onClick={() => {
                setData();
                setShowEditModal(true);
              }}
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showEditModal && (
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
                onClick={() => setShowEditModal(false)}
                className="flex  justify-end items-end "
              >
                <IoCloseSharp
                  size={25}
                  className="text-gray-700 hover:text-gray-600"
                />
              </div>
              <h2 className="text-lg font-semibold mb-4">Edit User</h2>
              <div className="text-start">
                <TextInput
                  label="Full Name"
                  name="fullName"
                  type="text"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <label htmlFor="" className="text-sm poppins-medium">Address</label>
                <textarea
                  className="w-full cursor-pointer hover:bg-gray-100 flex-col text-sm px-4 py-2 poppins-regular border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] border-primary h-[80px]"
                  placeholder="Enter description"
                  value={formData.address}
                  onChange={(text) =>
                    setFormData({
                      ...formData,
                      address: text.target.value,
                    })
                  }
                />

                <div className="flex justify-end">
                  <AnimatedButton
                    text={"Update Profile"}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default Profile;
