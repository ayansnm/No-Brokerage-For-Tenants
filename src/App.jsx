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

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={authUser ? <Dashboard /> : <Navigate to='/Login' />} />
        <Route path="/RoleSelect" element={<RoleSelect />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/VerifyOtp" element={<VerifyOtp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/PropertyDetails" element={<PropertyDetails />} />
        <Route path="/Requirements" element={authUser ? <Requirements /> : <Navigate to='/Login' />} />

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/properties" element={<AllProperties />} />
        <Route path="/admin/brokers" element={<Brokers />} />
        <Route path="/admin/payments" element={<AllPayments />} />
      </Routes>
      <div>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
