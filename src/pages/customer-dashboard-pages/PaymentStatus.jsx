"use client"

import { motion } from "framer-motion"

const PaymentStatus = ({ loading, scriptLoaded }) => {
  if (!loading) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 my-10"
    >
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#265953] mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {!scriptLoaded ? "Loading Payment System..." : "Processing Payment..."}
          </h3>
          <p className="text-gray-600 text-sm">
            {!scriptLoaded
              ? "Please wait while we initialize the payment system"
              : "Please complete the payment in the popup window"}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default PaymentStatus
