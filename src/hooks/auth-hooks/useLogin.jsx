import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authcontext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const { setAuthUser } = useAuthContext();

  const login = async (credentials) => {
    setLoading(true);

    // Define the login logic for toast.promise
    const performLogin = async () => {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json();
      console.log("Login result:", result);

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      // Save token in localStorage
      const token = result?.data?.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", result?.data?.user?._id);

      // Set token in context
      setAuthUser(token);

      // Navigate based on subscription
      const user = result?.data?.user;
      if (
        !user?.isSubscribedForCommercial &&
        !user?.isSubscribedForResidential
      ) {
        navigate("/Requirements");
      } else {
        navigate("/");
      }

      return result;
    };

    try {
      const result = await toast.promise(performLogin(), {
        loading: "Logging in...",
        success: "Login successful!",
        error: (err) => err.message || "Login failed",
      });

      return result;
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
