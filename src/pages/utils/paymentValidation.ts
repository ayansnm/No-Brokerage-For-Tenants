// Payment validation utilities
export const validateRazorpayKey = (keyId: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (!keyId) {
    errors.push("Razorpay Key ID is required")
    return { isValid: false, errors }
  }

  // Check key format
  if (!keyId.startsWith("rzp_live_") && !keyId.startsWith("rzp_test_")) {
    errors.push("Key must start with 'rzp_live_' or 'rzp_test_'")
  }

  // Check key length
  if (keyId.length !== 25) {
    errors.push(`Key length should be 25 characters, got ${keyId.length}`)
  }

  // Check for live key specific validations
  if (keyId.startsWith("rzp_live_")) {
    // Live keys have additional character restrictions
    const keyPart = keyId.substring(9) // Remove 'rzp_live_' prefix
    if (!/^[A-Za-z0-9]{16}$/.test(keyPart)) {
      errors.push("Live key format is invalid")
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validatePaymentAmount = (amount: number): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (!amount || amount <= 0) {
    errors.push("Amount must be greater than 0")
  }

  if (amount < 1) {
    errors.push("Minimum amount is ₹1")
  }

  if (amount > 500000) {
    errors.push("Maximum amount is ₹5,00,000")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const formatAmountForRazorpay = (amount: number): number => {
  // Convert to paise (multiply by 100) and ensure it's an integer
  return Math.round(amount * 100)
}

export const formatAmountFromRazorpay = (amountInPaise: number): number => {
  // Convert from paise to rupees
  return amountInPaise / 100
}
