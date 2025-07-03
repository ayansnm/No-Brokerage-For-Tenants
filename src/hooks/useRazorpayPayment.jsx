"use client"

import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import useSubscription from "../hooks/customer-hooks/useSubscription"

const useRazorpayPayment = () => {
  const [loading, setLoading] = useState(false)
//   const [scriptLoaded, setScriptLoaded] = useState(false)
  const navigate = useNavigate()

  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID
  const API_URL = import.meta.env.VITE_API_URL

  // Load Razorpay script
//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       return new Promise((resolve) => {
//         // Check if script is already loaded
//         if (window.Razorpay) {
//           setScriptLoaded(true)
//           resolve(true)
//           return
//         }

//         const script = document.createElement("script")
//         script.src = "https://checkout.razorpay.com/v1/checkout.js"
//         script.async = true

//         script.onload = () => {
//           setScriptLoaded(true)
//           resolve(true)
//         }

//         script.onerror = () => {
//           console.error("Failed to load Razorpay script")
//           setScriptLoaded(false)
//           resolve(false)
//         }

//         document.body.appendChild(script)
//       })
//     }

//     loadRazorpayScript()

//     return () => {
//       // Cleanup script on unmount
//       const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
//       if (script && document.body.contains(script)) {
//         document.body.removeChild(script)
//       }
//     }
//   }, [])

  const createRazorpayOrder = useCallback(
    async (amount) => {
      try {
        const data = {
          amount: 1 * 100, // Convert to paise
          currency: "INR",
          receipt: `receipt_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
        }

        const config = {
          method: "post",
          url: `${API_URL}/api/payments/initiate`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: data,
        }
        console.log(config);
        console.log(window.Razorpay.toString())

        const response = await axios.request(config)
        return {
          amount: response.data.amount,
          order_id: response.data.order_id,
          currency: response.data.currency,
        }
      } catch (error) {
        console.error("Order creation error:", error)
        throw error
      }
    },
    [API_URL],
  )

  const {loading:subscribeLoad, subscribe} = useSubscription()

  const handleRazorpayScreen = useCallback(
    async (orderData, paymentOptions, amountGive, id) => {
      const { amount, order_id, currency } = orderData
      const {
        companyName = "Property Rental Service",
        description = "Payment for service",
        prefill = {},
        onSuccess,
        onFailure,
        payloadToSend = {},
      } = paymentOptions

      // Load script if not already loaded
      if (!window.Razorpay) {
        const res = await new Promise((resolve) => {
          const script = document.createElement("script")
          script.src = "https://checkout.razorpay.com/v1/checkout.js"
          script.onload = () => resolve(true)
          script.onerror = () => resolve(false)
          document.body.appendChild(script)
        })

        if (!res) {
          toast.error("Razorpay SDK failed to load.")
          return
        }
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency || "INR",
        name: companyName,
        description: description,
        order_id: order_id,
        handler: async (response) => {
          try {
            toast.loading("Processing payment...")

            // Get payment details from backend
            let paymentDetails = null
            try {
              const paymentDetailsResponse = await axios.get(
                `${API_URL}/api/payments/${response.razorpay_payment_id}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                },
              )
              paymentDetails = paymentDetailsResponse.data
              console.log("Payment details from backend:", paymentDetails)
            } catch (error) {
              console.warn("Could not fetch payment details from backend:", error)
            }

            // Create payment record
            const paymentRecord = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount / 100, // Convert back from paise
              currency: currency || "INR",
              status: "completed",
              payment_details: paymentDetails,
              timestamp: new Date().toISOString(),
              ...payloadToSend,
            }

            console.log("Payment completed successfully:", paymentRecord)

            toast.dismiss()
            toast.success("Payment successful!")

            // Call success handler
            if (onSuccess) {
                await subscribe(amountGive, id)
              await onSuccess(paymentRecord)
            }

            setLoading(false)
          } catch (error) {
            console.error("Payment processing error:", error)
            toast.dismiss()
            toast.error("Payment completed but processing failed. Please contact support.")

            if (onFailure) {
              onFailure(error)
            }

            setLoading(false)
          }
        },
        prefill: {
          name: prefill.name || "Guest User",
          email: prefill.email || "guest@example.com",
          contact: prefill.contact || "9999999999",
        },
        theme: {
          color: "#265953",
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled")
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)

      razorpay.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error)
        toast.error(`Payment failed: ${response.error.description}`)
        setLoading(false)

        if (onFailure) {
          onFailure(response.error)
        }
      })

      razorpay.open()
    },
    [RAZORPAY_KEY_ID, API_URL],
  )

  const makePayment = useCallback(
    async (paymentData, amountGive, passId) => {
    //   if (!scriptLoaded) {
    //     toast.error("Payment system is loading. Please try again.")
    //     return
    //   }

      if (!RAZORPAY_KEY_ID) {
        toast.error("Payment configuration error. Please contact support.")
        return
      }

      const {
        amount,
        prefill = {},
        payloadToSend = {},
        onSuccessRedirect = "/success",
        companyName = "Property Rental Service",
        description = "Payment for service",
        onSuccess,
        onFailure,
      } = paymentData

      setLoading(true)

      try {
        // Create order
        const orderData = await toast.promise(createRazorpayOrder(amount), {
          loading: "Initializing payment...",
          success: "Payment ready!",
          error: "Failed to initialize payment",
        })

        // Handle Razorpay screen
        await handleRazorpayScreen(orderData, {
          companyName,
          description,
          prefill,
          payloadToSend,
          onSuccess: async (paymentRecord) => {
            // Call custom success handler if provided
            if (onSuccess) {
              await onSuccess(paymentRecord)
            }

            // Navigate to success page
            // if (onSuccessRedirect) {
            //   navigate(onSuccessRedirect)
            // }
          },
          onFailure: (error) => {
            if (onFailure) {
              onFailure(error)
            }
          },
        }, amountGive, passId)
      } catch (error) {
        console.error("Payment Error:", error)
        toast.error("Payment initialization failed. Please try again.")
        setLoading(false)

        if (onFailure) {
          onFailure(error)
        }
      }
    },
    [RAZORPAY_KEY_ID, createRazorpayOrder, handleRazorpayScreen, navigate],
  )

  return {
    loading,
    makePayment,
  }
}

export default useRazorpayPayment
