import { useState } from "react";
import toast from "react-hot-toast";

const useGetProfile = () => {
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Use null initially
  const API_URL = import.meta.env.VITE_API_URL;

  const getProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await fetch(`${API_URL}/api/users/profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      const user = result?.data?.user;

      if (user) {
        setUserProfile(user); // ✅ store object directly
        console.log(user);
        return user;
      } else {
        toast.error("User not found");
        return null;
      }
    } catch (error) {
      toast.error(error.message || "Error fetching Profile");
      console.error("Error fetching profile:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, getProfile, userProfile };
};

export default useGetProfile;
