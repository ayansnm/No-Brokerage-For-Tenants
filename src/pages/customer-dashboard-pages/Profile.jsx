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
import AOS from "aos";
import "aos/dist/aos.css";

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

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

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
    <div className="min-h-screen bg-[#f8f5f0]">
      <Navbar pageName="Profile" />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8" data-aos="fade-down">
          <h1 className="text-3xl font-bold text-[#084040]">My Profile</h1>
          <p className="text-[#5a5a5a]">View and update your personal information</p>
        </div>

        {/* Profile Card */}
        <div 
          className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e0d6c2]"
          data-aos="fade-up"
        >
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/3">
              <div className="relative">
                <img
                  src={userProfile?.profilePicture || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="h-40 w-40 rounded-full object-cover border-4 border-[#B7A380] shadow-md"
                  data-aos="zoom-in"
                />
                <button 
                  className="absolute bottom-2 right-2 bg-[#084040] text-white p-2 rounded-full hover:bg-[#052929] transition-colors shadow-lg"
                  onClick={() => setShowEditModal(true)}
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <FiEdit size={18} />
                </button>
              </div>
              
              <div className="text-center md:text-left" data-aos="fade-up" data-aos-delay="300">
                <h2 className="text-2xl font-semibold text-[#084040]">
                  {userProfile?.fullName || "John Doe"}
                </h2>
                <p className="text-[#5a5a5a]">{userProfile?.email || "johndoe@example.com"}</p>
              </div>
            </div>

            {/* Profile Details Section */}
            <div className="w-full md:w-2/3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info Card */}
                <div 
                  className="bg-[#f9f7f2] p-4 rounded-lg border border-[#e0d6c2]"
                  data-aos="fade-right"
                  data-aos-delay="200"
                >
                  <h3 className="text-lg font-semibold text-[#084040] mb-4 flex items-center gap-2">
                    <FiUser className="text-[#B7A380]" /> Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-[#5a5a5a]">Full Name</p>
                      <p className="font-medium text-[#084040]">{userProfile?.fullName || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5a5a5a]">Email</p>
                      <p className="font-medium text-[#084040]">{userProfile?.email || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                {/* Address Info Card */}
                <div 
                  className="bg-[#f9f7f2] p-4 rounded-lg border border-[#e0d6c2]"
                  data-aos="fade-left"
                  data-aos-delay="300"
                >
                  <h3 className="text-lg font-semibold text-[#084040] mb-4 flex items-center gap-2">
                    <FiMapPin className="text-[#B7A380]" /> Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-[#5a5a5a]">Phone</p>
                      <p className="font-medium text-[#084040]">{userProfile?.mobileNo || "+91 9876543210"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5a5a5a]">Address</p>
                      <p className="font-medium text-[#084040]">
                        {userProfile?.address || "Ahmedabad, Gujarat, India"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center" data-aos="fade-up" data-aos-delay="400">
                <div className="w-[40%]">
                <AnimatedButton
                  text="Edit Profile"
                  onClick={() => setShowEditModal(true)}
                  otherStyles="bg-[#084040] hover:bg-[#052929] text-white"
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
              className="bg-white rounded-xl shadow-xl w-full max-w-md border border-[#e0d6c2]"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#084040]">Edit Profile</h2>
                  <button 
                    onClick={() => setShowEditModal(false)}
                    className="text-[#5a5a5a] hover:text-[#084040]"
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
                    icon={<FiUser className="text-[#B7A380]" />}
                    borderColor="border-[#B7A380]"
                    focusColor="focus:ring-[#084040]"
                  />

                  <TextInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={<FiMail className="text-[#B7A380]" />}
                    borderColor="border-[#B7A380]"
                    focusColor="focus:ring-[#084040]"
                  />

                  <TextInput
                    label="Phone Number"
                    name="mobileNo"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    icon={<FiPhone className="text-[#B7A380]" />}
                    disabled
                    borderColor="border-[#B7A380]"
                    focusColor="focus:ring-[#084040]"
                  />

                  <div>
                    <label className="block text-sm font-medium text-[#084040] mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                        <FiMapPin className="text-[#B7A380]" />
                      </div>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Enter your full address"
                        className="w-full cursor-pointer pl-8 hover:bg-gray-100 flex-col text-sm px-4 py-2 poppins-regular border-2 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#084040] border-[#B7A380] h-[80px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 rounded-lg border border-[#084040] text-[#084040] hover:bg-[#f0f0f0] transition-colors"
                  >
                    Cancel
                  </button>
                  <AnimatedButton
                    text={editLoading ? "Saving..." : "Save Changes"}
                    onClick={handleSubmit}
                    disabled={editLoading}
                    otherStyles="bg-[#084040] hover:bg-[#052929] text-white"
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