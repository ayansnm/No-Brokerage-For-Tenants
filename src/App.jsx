import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./global.css";

// Import your components/pages here
import Registration from "./pages/auth-pages/Registration";
import VerifyOtp from "./pages/auth-pages/VerifyOtp";
import Login from "./pages/auth-pages/Login";
import Requirements from "./pages/customer-dashboard-pages/Requirements";
import Dashboard from "./pages/customer-dashboard-pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authcontext";
import RoleSelect from "./pages/auth-pages/RoleSelect";
import AdminDashboard from "./pages/admin-dashboard-pages/AdminDashboard";
import AllProperties from "./pages/admin-dashboard-pages/AllProperties";
import Profile from "./pages/customer-dashboard-pages/Profile";
import PropertyDetails from "./pages/PropertyDetails";
import Brokers from "./pages/admin-dashboard-pages/Brokers";
import AllPayments from "./pages/admin-dashboard-pages/AllPayments";
import MyTickets from "./pages/customer-dashboard-pages/MyTickets";
import AllCustomers from "./pages/admin-dashboard-pages/AllCustomers";
import AllTickets from "./pages/admin-dashboard-pages/AllTickets";
import BrokerDashboard from "./pages/broker-dashboard/Dashboard";
import SuggestedCustomer from "./pages/broker-dashboard/SuggestedCustomer";

const App = () => {
  const { authUser } = useAuthContext();
  // useEffect(()=>{
  //   const role = localStorage.getItem("role");
  // },[])
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Dashboard /> : <Navigate to="/Login" />}
        />
        <Route path="/RoleSelect" element={<RoleSelect />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/VerifyOtp" element={<VerifyOtp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={authUser ? <Profile/> : <Navigate to="/Login" />} />
        <Route path="/PropertyDetails" element={authUser ? <PropertyDetails /> : <Navigate to="/Login" />} />
        <Route path="/MyTickets" element={authUser ? <MyTickets /> : <Navigate to="/Login" />} />
        <Route
          path="/Requirements"
          element={authUser ? <Requirements /> : <Navigate to="/Login" />}
        />

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={authUser && localStorage.getItem("role") == "admin" ? <AdminDashboard /> : <Navigate to="/Login" />} />
        <Route path="/admin/properties" element={authUser ? <AllProperties /> : <Navigate to="/Login" />} />
        <Route path="/admin/brokers" element={authUser ? <Brokers /> : <Navigate to="/Login" />} />
        <Route path="/admin/payments" element={authUser ? <AllPayments /> : <Navigate to="/Login" />} />
        <Route path="/admin/customers" element={authUser ? <AllCustomers /> : <Navigate to="/Login" />} />
        <Route path="/admin/tickets" element={authUser ? <AllTickets /> : <Navigate to="/Login" />} />


        {/* Broker Dashboard */}
        <Route path="/broker/dashboard" element={authUser ? <BrokerDashboard /> : <Navigate to="/Login" />} />
        <Route path="/broker/suggestedcustomer" element={authUser ? <SuggestedCustomer /> : <Navigate to="/Login" />} />
      </Routes>
      <div>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
