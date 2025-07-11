"use client"
import { useState } from "react"
import toast from "react-hot-toast"
import useRazorpayPayment from "../useRazorpayPayment"

const useRequirement = () => {
  const [loading, setLoading] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL
  const { loading: paymentLoading, makePayment } = useRazorpayPayment()

  const submitRequirement = async (formData) => {
    setLoading(true)
    const token = localStorage.getItem("token")

    try {
      // First, save the requirement
      const response = await fetch(`${API_URL}/api/property/requirementForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit requirement")
      }

      toast.success("Requirement saved successfully!")

      // Calculate payment amount based on purpose
      const paymentAmount =
        formData.propertyPurpose === "Residential"
          ? Math.round(formData.priceRange / 5)
          : Math.round(formData.priceRange / 2.5)

      console.log("Initiating payment for amount:", paymentAmount)

      // Get user details for prefill (you should get this from your user context/state)
      const userDetails = {
        name: "Ayan Banglawala", // Get from user context
        email: "ayan@example.com", // Get from user context
        contact: "9876543210", // Get from user context
      }

      // Initiate payment
      await makePayment({
        amount: paymentAmount,
        prefill: userDetails,
        payloadToSend: {
          requirementId: result.data._id,
          type: "requirement",
          propertyPurpose: formData.propertyPurpose,
          originalAmount: formData.priceRange,
          paymentAmount: paymentAmount,
        },
        onSuccessRedirect: "/app",
        companyName: "Property Rental Service",
        description: `Payment for ${formData.propertyPurpose} property requirement`,
        onSuccess: async (paymentRecord) => {
          console.log("Payment successful, saving record:", paymentRecord)
          try {
            const saveResponse = await fetch(`${API_URL}/api/property/savePayment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                ...paymentRecord,
                requirementId: result.data._id,
                paymentType: "requirement",
              }),
            })

            if (saveResponse.ok) {
              console.log("Payment record saved successfully")
              toast.success("Payment completed and recorded successfully!")
            } else {
              console.error("Failed to save payment record")
              toast.warning("Payment successful but failed to save record. Please contact support.")
            }
          } catch (error) {
            console.error("Failed to save payment record:", error)
            toast.warning("Payment successful but failed to save record. Please contact support.")
          }
        },
        onFailure: (error) => {
          console.error("Payment failed:", error)
          toast.error("Payment failed. Please try again.")
        },
      })

      return result
    } catch (error) {
      console.error("Requirement Submission Error:", error)
      toast.error(error.message || "Submission failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading: loading || paymentLoading,
    submitRequirement,
  }
}

export default useRequirement
