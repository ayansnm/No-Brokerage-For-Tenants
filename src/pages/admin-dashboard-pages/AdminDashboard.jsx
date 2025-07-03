import React, { useEffect, useRef, useState } from "react";
import { FiUser } from "react-icons/fi";
import { BsFillBuildingsFill } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { VscVmActive } from "react-icons/vsc";
import { FaHandshakeAngle } from "react-icons/fa6";
import Sidebar from "../../components/Fields/Sidebar";
import Navbar from "../../components/Fields/Navbar";
import useTotalCount from "../../hooks/admin-hooks/useTotalCount";
import useGetAllBrokers from "../../hooks/admin-hooks/useGetAllBrokers";
import useFetchAllCustomers from "../../hooks/admin-hooks/useFetchAllCustomers";

const AdminDashboard = () => {
  const { counts, loading } = useTotalCount();
  const { allBrokers, fetchAllBrokers } = useGetAllBrokers();
  const [activeCount, setActiveCount] = useState(0);
  const activeBrokers = allBrokers.filter((broker) => broker.isActive);

  const { allCustomers, fetchAllCustomers } = useFetchAllCustomers();
  const [activeUserCount, setUserActiveCount] = useState(0);

  const fetchData = async () => {
    await fetchAllBrokers();
    await fetchAllCustomers();
  };
  const data = [
    { name: "Mon", customers: activeUserCount },
    { name: "Tue", customers: 20 },
    { name: "Wed", customers: 17 },
    { name: "Thu", customers: 22 },
    { name: "Fri", customers: 25 },
    { name: "Sat", customers: 16 },
    { name: "Sun", customers: 19 },
  ];

  useEffect(() => {
    fetchData(); // Only called once on component mount
  }, []);

  useEffect(() => {
    const activeBrokers = allBrokers.filter((broker) => broker.isActive);
    const activeUsers = allCustomers.filter((customer) => customer.isActive);
    setActiveCount(activeBrokers.length);
    setUserActiveCount(activeUsers.length);
  }, [allBrokers, allCustomers]);

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] poppins-regular no-scrollbar">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar pageName="Dashboard" />

        {/* Main Content */}
        <div data-aos="zoom-up" className="w-full flex justify-center p-3">
          <div className="w-full md:w-[90vw] lg:w-[75vw] flex flex-col md:flex-row justify-between bg-white rounded-2xl border border-[#D4D4D4] p-4 sm:p-6 gap-6">
            {/* Total Properties Suggested */}
            <div className="flex items-start gap-3 flex-1">
              {/* Icon */}
              <div className="p-3 h-14 w-14 rounded-full flex justify-center items-center bg-primary">
                <BsFillBuildingsFill size={24} className="text-white" />
              </div>

              {/* Text Block */}
              <div className="flex flex-col">
                <p className="text-lg sm:text-xl text-primary poppins-medium font-semibold">
                  Total Properties
                </p>

                {/* Number + Growth block */}
                <div className="flex items-end gap-3 mt-1">
                  {/* Number */}
                  <p className="poppins-medium text-2xl text-primary sm:text-3xl">
                    {counts.propertyCount}
                  </p>

                  {/* Percentage & Text */}
                  <div className="flex flex-col">
                    <div className="poppins-semibold text-xs bg-[#beffd3] text-primary flex flex-row justify-center items-center rounded-full px-2 w-fit">
                      <MdArrowOutward size={15} />
                      <p className="poppins-medium ml-1">15.35%</p>
                    </div>
                    <p className="poppins-medium text-primary text-xs sm:text-sm">
                      Growth in properties
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Brokers */}
            <div className="flex items-start gap-4 flex-1">
              <div className="p-3 h-14 w-14 rounded-full flex justify-center items-center bg-yellow-500">
                <FaUserTie size={24} className="text-white" />
              </div>
              <div>
                <p className="text-lg sm:text-xl text-primary poppins-medium font-semibold">
                  Total Brokers
                </p>
                <p className="poppins-medium text-2xl sm:text-3xl mt-1 text-primary">
                  {counts.brokerCount}
                </p>
              </div>
            </div>

            {/* Wishlist */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-px h-16 bg-gray-400 hidden sm:block"></div>
              <div className="p-3 h-14 w-14 rounded-full flex justify-center items-center bg-[#d24d2a]">
                <FiUser size={24} className="text-white" />
              </div>
              <div>
                <p className="text-lg sm:text-xl text-primary poppins-medium font-semibold">
                  Total Users
                </p>
                <p className="poppins-medium text-2xl sm:text-3xl mt-1 text-primary">
                  {counts.userCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col px-2 sm:px-3 lg:flex-row gap-6 items-start animate-fadeIn">
          {/* Analytics Box - Left */}
          <div className="w-full lg:flex-1 bg-white rounded-2xl border border-[#D4D4D4] p-2 sm:p-5 shadow-sm">
            <p className="text-lg sm:text-xl text-primary font-semibold poppins-medium mb-3">
              Analytics
            </p>

            {/* Number + Last Week Stats */}
            <p className="text-md text-primary font-semibold poppins-medium">
              Active Customers
            </p>
            <div className="flex justify-between items-end mb-4">
              <p className="text-2xl font-semibold poppins-medium text-primary">
                {activeUserCount}
              </p>

              <div className="flex flex-col items-end">
                <div className="bg-[#eaf7ee] text-primary text-xs flex items-center gap-1 rounded-full px-3 py-1 font-medium">
                  <MdArrowOutward size={14} />
                  <span>9.5%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Since last week</p>
              </div>
            </div>

            {/* Graph Placeholder */}
            <div className="w-full h-32 sm:h-40 mt-2">
              <div className="w-full h-full bg-gradient-to-r from-purple-100 to-white rounded-lg flex justify-center items-center text-sm text-primary">
                <div className="w-full h-32 sm:h-40 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <XAxis style={{color:'text-primary'}} dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis style={{color:'text-primary'}} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line
                        type="linear"
                        dataKey="customers"
                        stroke="darkgreen"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Boxes - Right */}
          <div className="flex flex-col gap-4 w-full lg:w-[300px]">
            {/* Active Users */}
            <div className="bg-white rounded-2xl border border-[#D4D4D4] p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-full text-white">
                  <VscVmActive size={18} />
                </div>
                <div>
                  <p className="text-sm text-primary font-semibold poppins-medium">
                    Active Users
                  </p>
                  <p className="text-xl font-semibold poppins-medium mt-1 text-primary">
                    {activeUserCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Active Brokers */}
            <div className="bg-white rounded-2xl border border-[#D4D4D4] p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-400 rounded-full text-white">
                  <FaHandshakeAngle size={18} />
                </div>
                <div>
                  <p className="text-sm text-primary font-semibold poppins-medium">
                    Active Brokers
                  </p>
                  <p className="text-xl font-semibold poppins-medium mt-1 text-primary">
                    {activeCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
