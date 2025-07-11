"use client"
import { useState } from "react"

const PaymentDebugger = () => {
  const [debugInfo, setDebugInfo] = useState(null)

  const checkConfiguration = () => {
    const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID
    const API_URL = import.meta.env.VITE_API_URL

    const info = {
      keyId: RAZORPAY_KEY_ID,
      keyType: RAZORPAY_KEY_ID?.startsWith("rzp_live_")
        ? "LIVE"
        : RAZORPAY_KEY_ID?.startsWith("rzp_test_")
          ? "TEST"
          : "UNKNOWN",
      keyLength: RAZORPAY_KEY_ID?.length || 0,
      apiUrl: API_URL,
      environment: import.meta.env.MODE,
      timestamp: new Date().toISOString(),
    }

    setDebugInfo(info)
  }

  const testPaymentFlow = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/test`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      const result = await response.json()
      console.log("Payment test result:", result)
    } catch (error) {
      console.error("Payment test failed:", error)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Payment Configuration Debugger</h2>
        <p className="text-gray-600 mt-1">Debug your Razorpay configuration and identify issues</p>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex gap-2">
          <button
            onClick={checkConfiguration}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Check Configuration
          </button>
          <button
            onClick={testPaymentFlow}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Test Payment Flow
          </button>
        </div>

        {debugInfo && (
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="font-medium text-blue-900">Configuration Status:</div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <span>Key Type:</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      debugInfo.keyType === "LIVE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {debugInfo.keyType}
                  </span>
                </div>
                <div>Key ID: {debugInfo.keyId ? `${debugInfo.keyId.substring(0, 12)}...` : "NOT SET"}</div>
                <div>Key Length: {debugInfo.keyLength} (Expected: 25)</div>
                <div>API URL: {debugInfo.apiUrl || "NOT SET"}</div>
                <div>Environment: {debugInfo.environment}</div>
              </div>
            </div>

            {debugInfo.keyType === "LIVE" && debugInfo.keyLength !== 25 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="text-red-800">
                  ⚠️ Invalid live key length. Razorpay live keys should be exactly 25 characters.
                </div>
              </div>
            )}

            {debugInfo.keyType === "UNKNOWN" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="text-red-800">
                  ⚠️ Invalid key format. Keys should start with 'rzp_live_' or 'rzp_test_'.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentDebugger
