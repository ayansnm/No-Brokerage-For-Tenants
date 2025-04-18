import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const verifyOtp = async (data) => {
    setLoading(true);
    console.log("DATA",data);
    
    // Define the login logic for toast.promise
    const performLogin = async () => {
      const response = await fetch(`${API_URL}/api/users/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      } else if (response.ok) {
        navigate("/Login");
      }
      return result;
    };

    try {
      const result = await toast.promise(performLogin(), {
        loading: "Logging in...",
        success: 'Verify Successfully!',
        error: (err) => {err.message || "Wrong otp!"},
      });

      return result;
    } catch (error) {
      console.error("Verify error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, verifyOtp };
};

export default useVerifyOtp;
