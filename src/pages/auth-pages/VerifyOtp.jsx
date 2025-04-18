import React, { useState } from "react";
import AnimatedButton from "../../components/Fields/AnimatedButton";
import useVerifyOtp from "../../hooks/auth-hooks/useVerifyOtp";
import IMG from "../../assets/image.png";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [enteredOtp, setEnteredOtp] = useState("");

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setEnteredOtp(newOtp.join(""));

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const { loading, verifyOtp } = useVerifyOtp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await verifyOtp({
      mobileNo: localStorage.getItem("mobileNo"),
      otp: enteredOtp,
    });
  };

  return (
    <div className="flex h-screen animate-fadeIn">
      {/* Right Image Section for desktop */}
      <div className="hidden sm:block sm:w-1/2 h-full bg-primary">
        <img
          src={IMG}
          alt="Verification"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left Section with mobile background */}
      <div className="w-full sm:w-1/2 h-full overflow-y-auto no-scrollbar px-5 sm:px-20 flex justify-center items-center pb-5 bg-[url('/src/assets/image.png')] bg-cover bg-center sm:bg-none">
        <div className="w-[90%] max-w-md py-10 bg-black/80 p-5 sm:p-0 text-white sm:text-black rounded-xl sm:bg-transparent">
          <h1 className="text-3xl font-bold mb-2 poppins-bold">Welcome!</h1>
          <h2 className="text-lg sm:text-2xl mb-6 text-center poppins-medium">
            Enter OTP sent to your WhatsApp
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-center">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  maxLength="1"
                  placeholder="-"
                  className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-primary rounded-xl text-center text-2xl poppins-medium focus:outline-none bg-transparent text-white sm:text-black"
                />
              ))}
            </div>
            <p className="w-full flex mt-2 justify-center text-sm text-white sm:text-gray-600">
              OTP sent to WhatsApp on: {localStorage.getItem("mobileNo")}
            </p>

            <AnimatedButton type="submit" text="Verify OTP" />
          </form>

          <p className="w-full flex mt-5 text-sm justify-center text-white sm:text-gray-600">
            Didn’t receive the code?
          </p>
          <div className="text-center mt-2">
            <button className="text-primary font-semibold hover:underline">
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
