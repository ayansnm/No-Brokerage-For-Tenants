
import React, { useState, useRef } from "react";
import { VscBell } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import ProfileImg from "../../assets/profile.png";
import { RxDashboard } from "react-icons/rx";

const Profile = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Dummy data - Replace with real data or backend fetch
  const userName = localStorage.getItem("userName") || "John Doe";
  const userEmail = localStorage.getItem("userEmail") || "johndoe@example.com";
  const userPhone = localStorage.getItem("userPhone") || "+91 9876543210";
  const userAddress = localStorage.getItem("userAddress") || "Ahmedabad, Gujarat, India";

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
                  <li
                    className="cursor-pointer p-2 flex items-center gap-2 hover:bg-gray-100"
                    onClick={() => navigate("/")}
                  >
                    <RxDashboard /> Dashboard
                  </li>
                  {/* <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/Profile")}
                  >
                    Profile
                  </li> */}
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
              <label className="font-medium text-gray-700">Mobile Number:</label>
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
            <button
              onClick={() => alert("Edit functionality coming soon!")}
              className="mt-4 px-4 py-2 bg-gray-700 hover:bg-black text-white rounded-lg transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
