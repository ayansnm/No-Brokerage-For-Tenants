import React, { useRef, useState } from "react";
import { VscBell } from "react-icons/vsc";
import Profile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuTickets } from "react-icons/lu";
import { TbCashBanknote } from "react-icons/tb";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <RxDashboard /> },
    {
      label: "All Properties",
      path: "/admin/properties",
      icon: <HiOutlineBuildingOffice2 />,
    },
    { label: "All Customers", path: "/admin/customers", icon: <FiUser /> },
    { label: "All Brokers", path: "/admin/brokers", icon: <FaUsers /> },
    { label: "All Tickets", path: "/admin/tickets", icon: <LuTickets /> },
    { label: "Payments", path: "/admin/payments", icon: <TbCashBanknote /> },
  ];

  return (
    <>
      <nav className="p-4 sm:p-4 md:p-5 pt-4">
        <div className="flex flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-2xl sm:text-3xl poppins-semibold">Dashboard</p>
            <p className="poppins-medium text-gray-600 text-sm sm:text-base">
              {formattedDate}
            </p>
          </div>

          <div className="relative" ref={dropdownRef}>
            <div className="flex flex-row items-center gap-4 cursor-pointer">
              <div className="rounded-full p-2 bg-white border border-gray-500">
                <VscBell size={24} className="text-gray-500" />
              </div>
              <div className="w-px h-10 bg-gray-400 hidden sm:block"></div>
              <div
                className="flex flex-row gap-2 items-center"
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setMobileMenuOpen(!mobileMenuOpen); // toggle mobile menu
                }}
              >
                <img
                  src={Profile}
                  alt=""
                  className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover"
                />
                <div className="hidden sm:block">
                  <p className="poppins-medium text-sm">
                    {localStorage.getItem("userName") || "No Name"}
                  </p>
                  <p className="poppins-medium text-sm text-gray-600">
                    Customer
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50 hidden sm:block">
                <ul className="py-2 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Profile
                  </li>
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

      {/* Mobile Sidebar Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-300 shadow-md p-4 z-50 fixed top-20 right-4 left-4 rounded-xl">
          <ul className="space-y-2 text-gray-800 text-sm">
            {menuItems.map((item) => (
              <li
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className="cursor-pointer p-2 rounded-lg flex items-center gap-2 hover:bg-gray-100"
              >
                {item.icon} <span>{item.label}</span>
              </li>
            ))}
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
            <li
              onClick={() => {
                localStorage.clear();
                navigate("/Login");
              }}
              className="cursor-pointer px-4 rounded-lg flex items-center gap-2 hover:bg-gray-100 text-red-600"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
