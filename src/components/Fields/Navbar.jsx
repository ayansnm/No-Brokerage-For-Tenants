import React, { useRef, useState, useEffect } from "react";
import { VscBell, VscMenu } from "react-icons/vsc";
import Profile from "../../assets/profile.png";
import { useNavigate, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaUsers, FaChevronDown } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuTickets } from "react-icons/lu";
import { TbCashBanknote } from "react-icons/tb";
import { RiCustomerServiceFill, RiLogoutCircleRLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHome } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const mobileMenuRef = useRef();

  // Format current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Menu items
  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <RxDashboard size={20} />,
      role: "admin",
    },
    {
      label: "Properties",
      path: "/admin/properties",
      icon: <HiOutlineBuildingOffice2 size={20} />,
      role: "admin",
    },
    {
      label: "Customers",
      path: "/admin/customers",
      icon: <FiUser size={20} />,
      role: "admin",
    },
    {
      label: "Brokers",
      path: "/admin/brokers",
      icon: <FaUsers size={20} />,
      role: "admin",
    },
    {
      label: "Tickets",
      path: "/admin/tickets",
      icon: <LuTickets size={20} />,
      role: "admin",
    },
    {
      label: "Payments",
      path: "/admin/payments",
      icon: <TbCashBanknote size={20} />,
      role: "admin",
    },
  ];

  const role = localStorage.getItem("role");
  const currentMenuItem = menuItems.find(
    (item) => item.path === location.pathname
  );
  const pageHeading = currentMenuItem?.label || "Dashboard";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-white shadow-sm border-b  border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Hamburger menu and page title */}
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
            >
              <VscMenu size={24} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {pageHeading}
              </h1>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
          </div>

          {/* Right side - Icons and profile */}
          <div className="flex items-center space-x-4">
            {role === "user" && (
              <button
                onClick={() => navigate("/MyTickets")}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                title="Support"
              >
                <RiCustomerServiceFill size={20} />
              </button>
            )}

            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative">
              <VscBell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            {localStorage.getItem("role") == "user" && (
              <button onClick={()=>navigate("/MyTickets")} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative">
                <TfiHeadphoneAlt size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            )}

            {/* Profile dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={Profile}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  {localStorage.getItem("userName") || "User"}
                </span>
                <FaChevronDown
                  className={`hidden md:inline text-gray-500 text-xs transition-transform ${
                    dropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium">
                      {localStorage.getItem("userName")}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {role || "user"}
                    </p>
                  </div>
                  <a
                    href="#"
                    onClick={() => navigate("/Profile")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <IoSettingsOutline /> Profile Settings
                  </a>
                  <a
                    href="#"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/Login");
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <RiLogoutCircleRLine /> Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="px-2 py-4">
              <ul className="space-y-1">
                {role === "admin" ? (
                  menuItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(item.path);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          location.pathname === item.path
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                      </a>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/");
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                      >
                        <span className="mr-3">
                          <MdOutlineHome size={20} />
                        </span>
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/MyTickets");
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                      >
                        <span className="mr-3">
                          <RiCustomerServiceFill size={20} />
                        </span>
                        Customer Support
                      </a>
                    </li>
                  </>
                )}
                <li className="border-t border-gray-200 mt-2 pt-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.clear();
                      navigate("/Login");
                    }}
                    className="flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-gray-100"
                  >
                    <span className="mr-3">
                      <RiLogoutCircleRLine size={20} />
                    </span>
                    Sign Out
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
