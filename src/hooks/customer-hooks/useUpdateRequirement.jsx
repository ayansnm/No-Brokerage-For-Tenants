"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import useRazorpayPayment from "../useRazorpayPayment"

const useUpdateRequirement = () => {
  const [loading, setLoading] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL
  const { loading: paymentLoading, makePayment } = useRazorpayPayment()

  const submitRequirement = async (formData, id) => {
    setLoading(true)
    const token = localStorage.getItem("token")

    try {
      // Update the requirement
      const response = await fetch(`${API_URL}/api/property/updateRequirement/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to update requirement")
      }

      toast.success("Requirement updated successfully!")

      // Calculate payment amount
      const paymentAmount =
        formData.propertyPurpose === "Residential" ? formData.priceRange / 5 : formData.priceRange / 2.5

      console.log("Initiating payment for updated requirement, amount:", paymentAmount)

      // Initiate payment
      await makePayment({
        amount: parseFloat(paymentAmount),
        prefill: {
          name: "Ayan Banglawala",
          email: "ayan@example.com",
          contact: "9876543210",
        },
        payloadToSend: {
          requirementId: result.data._id,
          type: "requirement_update",
          propertyPurpose: formData.propertyPurpose,
        },
        onSuccessRedirect: "/app",
        companyName: "Property Rental Service",
        description: `Payment for updated ${formData.propertyPurpose} property requirement`,
        onSuccess: async (paymentRecord) => {
          // Save payment record to your database
          console.log("Payment successful for update, saving record:", paymentRecord)
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
                isUpdate: true,
              }),
            })

            if (saveResponse.ok) {
              console.log("Payment record saved successfully for update")
            } else {
              console.error("Failed to save payment record for update")
            }
          } catch (error) {
            console.error("Failed to save payment record:", error)
          }
        },
        onFailure: (error) => {
          console.error("Payment failed for update:", error)
          toast.error("Payment failed. Please try again.")
        },
      },formData.amount, result?.data?._id)

      return result
    } catch (error) {
      console.error("Requirement Update Error:", error)
      toast.error(error.message || "Update failed")
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

export default useUpdateRequirement
