"use client"

const PaymentSummary = ({ formData, amount, purpose }) => {
  const percentage = purpose === "Residential" ? "20%" : "40%"
  const refundPercentage = purpose === "Residential" ? "15%" : "30%"
  const platformFee = purpose === "Residential" ? "5%" : "10%"

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
      <h3 className="font-semibold text-gray-900 mb-3">Payment Summary</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Property Purpose:</span>
          <span className="font-medium">{purpose}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Budget Range:</span>
          <span className="font-medium">₹{formData.priceRange?.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Service Charge ({percentage}):</span>
          <span className="font-medium">₹{amount?.toLocaleString()}</span>
        </div>

        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total Amount:</span>
            <span className="text-[#265953]">₹{amount?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <p className="text-xs text-blue-800">
          <strong>Refund Policy:</strong> If we cannot find a suitable property within 3 months, we will refund{" "}
          {refundPercentage} and retain {platformFee} as platform fee.
        </p>
      </div>
    </div>
  )
}

export default PaymentSummary
