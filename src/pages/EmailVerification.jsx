import React, { useEffect, useState } from "react";
import { Mail, Check } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await API.get(`/auth/verify-email/${token}`);
        setSuccess(true);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  const handleContinue = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center px-6">
      
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          {success ? (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check size={32} className="text-green-600" />
            </div>
          ) : (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail size={32} className="text-blue-600" />
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">
          {loading
            ? "Verifying your email..."
            : success
            ? "Email Verified Successfully 🎉"
            : "Verification Failed"}
        </h1>

        {/* Message */}
        <p className="text-gray-500 mb-6">
          {loading && "Please wait while we verify your email address."}
          {!loading && success && "Your account has been successfully activated. You can now log in."}
          {!loading && !success && "The verification link is invalid or expired."}
        </p>

        {/* Button */}
        {!loading && (
          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;