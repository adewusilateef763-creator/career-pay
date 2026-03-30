import React, { useState, useRef } from "react";
import {useNavigate } from "react-router-dom";
import API from "../services/api";

const VerifyEmail = () => {
  
  const navigate = useNavigate();

  

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const verifyCode = async () => {
    const token = otp.join("");

    if (token.length < 6) {
      alert("Please enter the full 6-digit code");
      return;
    }

    try {
      const res = await API.get(`/auth/verify-email/${token}`);

      console.log("Verification success:", res.data);

      const authToken = res.data?.token || res.data?.data?.token;
      if (authToken) {
        localStorage.setItem("token", authToken);
      }

      alert("Email verified successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Verification error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
        "Invalid verification code"
      );
    }
  };
  

 return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-10">
    <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-[#1D4EFF] text-white text-center py-8 sm:py-10 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4">
          <div className="h-[2px] w-12 sm:w-24 bg-white"></div>
          <div className="text-3xl sm:text-4xl">✉️</div>
          <div className="h-[2px] w-12 sm:w-24 bg-white"></div>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide">
          Thanks For Signing Up
        </h1>

        <p className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl font-medium">
          Verify Your Email Address
        </p>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6 md:p-10">
        <p className="text-base sm:text-lg font-semibold mb-2">
          Hello User,
        </p>

        <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
          Please use the following One Time Password (OTP)
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 flex-wrap">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(index, e.target.value)
              }
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border rounded-lg text-center text-lg sm:text-xl md:text-2xl font-bold shadow-sm focus:ring-2 focus:ring-[#1D4EFF] outline-none"
            />
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed">
          This passcode will only be valid for the next{" "}
          <span className="font-bold">15 minutes</span>.
          If the passcode does not work, you can resend the code.
        </p>

        {/* Button */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <button
            onClick={verifyCode}
            className="w-full sm:w-auto bg-[#1D4EFF] hover:bg-blue-700 text-white px-8 sm:px-10 py-3 rounded-lg font-semibold shadow-md"
          >
            Verify Email
          </button>
        </div>

        <div className="text-gray-700 leading-7 sm:leading-8 text-sm sm:text-base">
          <p>Thank you,</p>
          <p className="font-semibold">CareerPay Team</p>
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 bg-gray-100 rounded-xl p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1D4EFF]">
            Get in touch
          </h2>
        </div>

        <div className="mt-4 sm:mt-6 bg-gray-900 text-white text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center gap-3 px-4 sm:px-6 py-4 rounded-lg">
          <p className="text-center">
            2025 CareerPay. All rights reserved.
          </p>

          <div className="flex gap-4 sm:gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default VerifyEmail;