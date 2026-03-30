import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertCircle, Mail, Lock, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Request Email, 2: Verify Code, 3: New Password, 4: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const otpRefs = useRef([]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value !== "" && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (otp.join("").length < 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Link to="/">
            <img src="/careerpay-logo.png" alt="CareerPay" className="h-10 w-auto invert brightness-0" />
          </Link>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 lg:p-12 shadow-xl shadow-blue-500/5 relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100">
            <motion.div 
              initial={{ width: "25%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              className="h-full bg-blue-600"
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                  <Mail size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Forgot Password?</h1>
                <p className="text-gray-500 mb-10 leading-relaxed">
                  No worries, it happens. Enter your email and we'll send you reset instructions.
                </p>
                <form onSubmit={handleRequestReset} className="space-y-8">
                  <div className="relative">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 block">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium"
                      placeholder="name@company.com"
                    />
                    {error && <p className="mt-3 text-sm text-red-500 flex items-center gap-2"><AlertCircle size={14}/> {error}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-70"
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                  <Link to="/login" className="flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-colors">
                    <ArrowLeft size={18} />
                    Back to login
                  </Link>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                  <ShieldCheck size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Check your email</h1>
                <p className="text-gray-500 mb-10 leading-relaxed">
                  We've sent a 6-digit code to <span className="text-gray-900 font-bold">{email}</span>. Please enter it below.
                </p>
                <form onSubmit={handleVerifyCode} className="space-y-10">
                  <div className="flex justify-between gap-2">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        ref={(el) => (otpRefs.current[index] = el)}
                        value={data}
                        onChange={(e) => handleOtpChange(e.target, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className="w-12 h-16 text-center text-2xl font-bold bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    ))}
                  </div>
                  {error && <p className="text-center text-sm text-red-500">{error}</p>}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-70"
                  >
                    {isLoading ? "Verifying..." : "Verify Code"}
                  </button>
                  <div className="text-center">
                    <p className="text-gray-500 font-medium mb-2">Didn't receive the email?</p>
                    <button type="button" onClick={handleRequestReset} className="text-blue-600 font-bold hover:underline">Resend code</button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                  <Lock size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Set new password</h1>
                <p className="text-gray-500 mb-10 leading-relaxed">
                  Your identity is verified. Please choose a strong new password for your account.
                </p>
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">New Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium"
                      placeholder="At least 8 characters"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium"
                      placeholder="Re-type your password"
                    />
                    {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-70"
                  >
                    {isLoading ? "Updating..." : "Reset Password"}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center"
              >
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-lg shadow-green-500/10">
                  <CheckCircle2 size={56} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Password Reset</h1>
                <p className="text-gray-500 mb-10 leading-relaxed max-w-sm mx-auto">
                  Your password has been successfully reset. You can now log in with your new credentials.
                </p>
                <Link
                  to="/login"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-600/20 transition-all inline-block active:scale-95"
                >
                  Continue to Login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <p className="text-center mt-12 text-gray-400 text-sm font-medium">
          © 2026 CareerPay. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
