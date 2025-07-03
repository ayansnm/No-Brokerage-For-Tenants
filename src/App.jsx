import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
  HashRouter,
} from "react-router-dom";
import "./global.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

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
import AddProperty from "./pages/broker-dashboard/AddProperty";
import ShareProperty from "./pages/admin-dashboard-pages/ShareProperty";
import AreaManagement from "./pages/admin-dashboard-pages/AreaManagement";

const App = () => {
  const { authUser } = useAuthContext();
  // useEffect(()=>{
  //   const role = localStorage.getItem("role");
  // },[])
  useEffect(() => {
      AOS.init({
        duration: 1000,
        // once: true,
        delay: 100,
        offset: 200
      });
    }, []);
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/app"
          element={authUser && localStorage.getItem("role") == "user" ? <Dashboard /> : <Navigate to="/app/Login" />}
        />
        <Route path="/app/RoleSelect" element={<RoleSelect />} />
        <Route path="/app/Registration" element={<Registration />} />
        <Route path="/app/VerifyOtp" element={<VerifyOtp />} />
        <Route path="/app/Login" element={<Login />} />
        <Route path="/app/Profile" element={authUser ? <Profile /> : <Navigate to="/app/Login" />} />
        <Route path="/app/PropertyDetails/:id" element={authUser ? <PropertyDetails /> : <Navigate to="/app/Login" />} />
        <Route path="/app/MyTickets" element={authUser && localStorage.getItem("role") == "user" ? <MyTickets /> : <Navigate to="/app/Login" />} />
        <Route
          path="/app/Requirements"
          element={authUser && localStorage.getItem("role") == "user" ? <Requirements /> : <Navigate to="/app/Login" />}
        />

        {/* Admin Dashboard */}
        <Route path="/app/admin/dashboard" element={authUser && localStorage.getItem("role") == "admin" ? <AdminDashboard /> : <Navigate to="/app/Login" />} />
        <Route path="/app/admin/properties" element={authUser && localStorage.getItem("role") == "admin" ? <AllProperties /> : <Navigate to="/app/Login" />} />
        <Route path="/app/admin/brokers" element={authUser && localStorage.getItem("role") == "admin" ? <Brokers /> : <Navigate to="/app/Login" />} />
        <Route path="/app/admin/payments" element={authUser && localStorage.getItem("role") == "admin" ? <AllPayments /> : <Navigate to="/app/Login" />} />
        <Route path="/app/admin/customers" element={authUser && localStorage.getItem("role") == "admin" ? <AllCustomers /> : <Navigate to="/app/Login" />} />
        <Route path="/app/admin/tickets" element={authUser && localStorage.getItem("role") == "admin" ? <AllTickets /> : <Navigate to="/app/Login" />} />
        <Route path="/app/admin/shareproperty/:id" element={authUser && localStorage.getItem("role") == "admin" ? <ShareProperty /> : <Navigate to="/app/Login" />} />
        <Route path="/app/admin/areamanagement" element={authUser && localStorage.getItem("role") == "admin" ? <AreaManagement /> : <Navigate to="/app/Login" />} />

        {/* Broker Dashboard */}
        <Route path="/app/broker/dashboard" element={authUser && localStorage.getItem("role") == "broker" ? <BrokerDashboard /> : <Navigate to="/app/Login" />} />
        <Route path="/app/broker/suggestedcustomer/:id" element={authUser && localStorage.getItem("role") == "broker" || localStorage.getItem("role") == "admin" ? <SuggestedCustomer /> : <Navigate to="/app/Login" />} />
        <Route path="/app/broker/addproperty" element={authUser && localStorage.getItem("role") == "broker" ? <AddProperty /> : <Navigate to="/app/Login" />} />
        <Route path="/app/broker/editproperty/:id" element={authUser ? <AddProperty /> : <Navigate to="/app/Login" />} />
      </Routes>
      <div>
        <Toaster />
      </div>
    </HashRouter>
  );
};

export default App;
