import React from 'react';
import { FiSearch } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuTickets } from "react-icons/lu";
import { TbCashBanknote } from "react-icons/tb";
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from "../../assets/nbftlogo.jpg";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-4 hidden md:block border-r-2 border-[#b5b5b5]">
                {/* <h1 className="text-2xl font-semibold mb-4 text-primary">NBFT</h1> */}
                <img src={Logo} alt="Logo" className="h-15 w-30 mb-2 object-contain" />

                <hr className="mb-4" />

                {/* Search Bar */}
                {/* <div className="relative mb-6">
                    <input type="text" placeholder="Search..." className="w-full px-4 py-2 pl-10 text-sm border rounded-md focus:outline-none" />
                    <FiSearch className="absolute left-3 top-3 text-gray-500" />
                </div> */}

                {/* Navigation Menu */}
                <ul className="space-y-3 text-gray-700 text-sm">
                    <li
                        onClick={() => navigate('/app/admin/dashboard')}
                        className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 ${location.pathname === '/admin/dashboard' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                            }`}
                    >
                        <RxDashboard /> <span>Dashboard</span>
                    </li>
                    <li
                        onClick={() => navigate('/app/admin/properties')}
                        className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 ${location.pathname === '/admin/properties' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                            }`}
                    >
                        <HiOutlineBuildingOffice2 /> <span>All Properties</span>
                    </li>
                    <li
                        onClick={() => navigate('/app/admin/customers')}
                        className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 ${location.pathname === '/admin/customers' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                            }`}
                    >
                        <FiUser /> <span>All Customers</span>
                    </li>
                    <li
                        onClick={() => navigate('/app/admin/brokers')}
                        className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 ${location.pathname === '/admin/brokers' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                            }`}
                    >
                        <FaUsers /> <span>All Brokers</span>
                    </li>
                    <li
                        onClick={() => navigate('/app/admin/tickets')}
                        className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 ${location.pathname === '/admin/tickets' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                            }`}
                    >
                        <LuTickets /> <span>All Tickets</span>
                    </li>
                    <li
                        onClick={() => navigate('/app/admin/payments')}
                        className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 ${location.pathname === '/admin/payments' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                            }`}
                    >
                        <TbCashBanknote /> <span>Payments</span>
                    </li>
                    <li
                        onClick={() => navigate('/app/admin/areamanagement')}
                        className={`cursor-pointer p-2 rounded-lg flex items-center gap-2 ${location.pathname === '/admin/payments' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                            }`}
                    >
                        <TbCashBanknote /> <span>Areas</span>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar;
