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

const App = () => {
  const {authUser} = useAuthContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={authUser ? <Dashboard /> : <Navigate to='/Login'/>} />
        <Route path="/RoleSelect" element={<RoleSelect />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/VerifyOtp" element={<VerifyOtp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Requirements" element={authUser ? <Requirements /> : <Navigate to='/Login'/>} />
      </Routes>
      <div>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
