"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const useUpdateProperty = () => {
  const [loading, setLoading] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()

  const updateProperty = async (formData, id) => {
    setLoading(true)

    try {
      // Log all form data entries for debugging
      console.log("Updating property with ID:", id)
      console.log("FormData entries:")
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${typeof pair[1] === "object" ? "File: " + pair[1].name : pair[1]}`)
      }

      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authentication token not found")
      }

      const response = await fetch(`${API_URL}/api/property/updateproperty/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type when sending FormData
        },
        body: formData,
      })

      const result = await response.json()
      console.log("Update response:", result)

      if (response.ok) {
        toast.success("Property updated successfully!");
        if (localStorage.getItem("role") == "admin") {
          navigate("/app/admin/properties");
        }
        else if (localStorage.getItem("role") == "broker") {
          navigate("/app/broker/dashboard");
        }
        return result.data
      } else {
        throw new Error(result?.message || "Failed to update property")
      }
    } catch (error) {
      console.error("Update property error:", error)
      toast.error(error.message || "Something went wrong while updating the property")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { loading, updateProperty }
}

export default useUpdateProperty
