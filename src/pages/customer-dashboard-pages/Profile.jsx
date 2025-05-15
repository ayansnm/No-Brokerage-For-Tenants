import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiUser, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Navbar from "../../components/Fields/Navbar";
import TextInput from "../../components/Fields/TextInput";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import useGetProfile from "../../hooks/customer-hooks/useGetProfile";
import useProfileEdit from "../../hooks/useProfileEdit";

const Profile = () => {
  const navigate = useNavigate();
  const { loading, getProfile, userProfile } = useGetProfile();
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    address: ""
  });

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      await getProfile();
    };
    fetchProfile();
  }, []);

  // Update form data when profile loads
  useEffect(() => {
    if (userProfile) {
      setFormData({
        fullName: userProfile.fullName || "",
        email: userProfile.email || "",
        mobileNo: userProfile.mobileNo || "",
        address: userProfile.address || ""
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
    await getProfile();
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar pageName="Profile" />
      
      <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
        {/* Profile Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">My Profile</h1>
          <p className="text-gray-600">View and update your personal information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/3">
              <div className="relative">
                <img
                  src={userProfile?.profilePicture || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="h-40 w-40 rounded-full object-cover border-4 border-[#265953] shadow-md"
                />
                <button 
                  className="absolute bottom-2 right-2 bg-[#265953] text-white p-2 rounded-full hover:bg-[#1d4a42] transition-colors"
                  onClick={() => setShowEditModal(true)}
                >
                  <FiEdit size={18} />
                </button>
              </div>
              
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-semibold text-primary">
                  {userProfile?.fullName || "John Doe"}
                </h2>
                <p className="text-gray-600">{userProfile?.email || "johndoe@example.com"}</p>
              </div>
            </div>

            {/* Profile Details Section */}
            <div className="w-full md:w-2/3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info Card */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiUser className="text-[#265953]" /> Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{userProfile?.fullName || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{userProfile?.email || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                {/* Address Info Card */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiMapPin className="text-[#265953]" /> Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{userProfile?.mobileNo || "+91 9876543210"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">
                        {userProfile?.address || "Ahmedabad, Gujarat, India"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-[40%]">
                <AnimatedButton
                  text="Edit Profile"
                  onClick={() => setShowEditModal(true)}
                  otherStyles=""
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
                  <button 
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <TextInput
                    label="Full Name"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    icon={<FiUser className="text-gray-400" />}
                  />

                  <TextInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={<FiMail className="text-gray-400" />}
                  />

                  <TextInput
                    label="Phone Number"
                    name="mobileNo"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    icon={<FiPhone className="text-gray-400" />}
                    disabled
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                        <FiMapPin className="text-gray-400" />
                      </div>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Enter your full address"
                        className="w-full cursor-pointer pl-8 hover:bg-gray-100 flex-col text-sm px-4 py-2 poppins-regular border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#265953] border-primary h-[80px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <AnimatedButton
                    text={editLoading ? "Saving..." : "Save Changes"}
                    onClick={handleSubmit}
                    disabled={editLoading}
                    otherStyles=""
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