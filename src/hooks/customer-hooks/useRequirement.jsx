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
        formData.propertyPurpose === "Residential" ? formData.priceRange / 5 : formData.priceRange / 2.5

      console.log("Initiating payment for amount:", paymentAmount)

      // Initiate payment
      await makePayment({
        amount: parseFloat(paymentAmount),
        prefill: {
          name: "Ayan Banglawala", // You can get this from user context
          email: "ayan@example.com",
          contact: "9876543210",
        },
        payloadToSend: {
          requirementId: result.data._id,
          type: "requirement",
          propertyPurpose: formData.propertyPurpose,
        },
        onSuccessRedirect: "/app",
        companyName: "Property Rental Service",
        description: `Payment for ${formData.propertyPurpose} property requirement`,
        onSuccess: async (paymentRecord) => {
          // Save payment record to your database
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
              }),
            })

            if (saveResponse.ok) {
              console.log("Payment record saved successfully")
            } else {
              console.error("Failed to save payment record")
            }
          } catch (error) {
            console.error("Failed to save payment record:", error)
          }
        },
        onFailure: (error) => {
          console.error("Payment failed:", error)
          toast.error("Payment failed. Please try again.")
        },
      },formData.amount, result?.data?._id)

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
