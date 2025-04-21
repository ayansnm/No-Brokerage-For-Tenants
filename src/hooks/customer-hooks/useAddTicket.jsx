import { useState } from "react";
import toast from "react-hot-toast";

const useAddTicket = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const addTicket = async (formData) => {
    const formPayload = new FormData();
    formPayload.append("document", formData.image);
    formPayload.append("message", formData.question);
    formPayload.append("description", formData.description);
    formPayload.append("userId", localStorage.getItem("userId"));

    const performRequest = async () => {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/support/tenant`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formPayload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Ticket added:", data);
      return data;
    };

    // Using toast.promise
    return toast.promise(performRequest(), {
      loading: "Creating ticket...",
      success: "Ticket created successfully!",
      error: (err) => err.message || "Failed to create ticket",
    }).finally(() => setLoading(false));
  };

  return { loading, addTicket };
};

export default useAddTicket;
