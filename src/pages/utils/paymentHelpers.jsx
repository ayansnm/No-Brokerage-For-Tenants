// Payment utility functions
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const calculatePaymentAmount = (priceRange, purpose) => {
  const percentage = purpose === "Residential" ? 0.2 : 0.4 // 20% for residential, 40% for commercial
  return Math.round(priceRange * percentage)
}

export const validatePaymentData = (data) => {
  const errors = []

  if (!data.amount || data.amount <= 0) {
    errors.push("Invalid payment amount")
  }

  if (data.amount < 1) {
    errors.push("Minimum payment amount is ₹1")
  }

  if (data.amount > 5000000) {
    errors.push("Maximum payment amount is ₹5,00,0000")
  }

  if (!data.prefill?.email || !/\S+@\S+\.\S+/.test(data.prefill.email)) {
    errors.push("Valid email is required")
  }

  if (!data.prefill?.contact || !/^\d{10}$/.test(data.prefill.contact)) {
    errors.push("Valid 10-digit phone number is required")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const generateReceiptId = () => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `receipt_${timestamp}_${random}`
}

export const logPaymentEvent = (event, data) => {
  console.log(`[Payment ${event}]`, {
    timestamp: new Date().toISOString(),
    event,
    data: {
      ...data,
      // Mask sensitive information
      razorpay_payment_id: data.razorpay_payment_id ? `${data.razorpay_payment_id.substring(0, 8)}...` : undefined,
      razorpay_signature: data.razorpay_signature ? "***MASKED***" : undefined,
    },
  })
}
