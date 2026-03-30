import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Stepper from "../components/Stepper";
import PersonalInfo from "../components/PersonalInfo";
import EmploymentInfo from "../components/EmploymentInfo";
import DocumentsInfo from "../components/DocumentsInfo";
import ReviewInfo from "../components/ReviewInfo";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [onboardingData, setOnboardingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    engagementType: "",
    jobTitle: "",
    startDate: "",
    governmentId: null,
  });

  const steps = ["Personal Info", "Employment", "Documentation", "Review"];

  const updateOnboardingData = (newData) => {
    setOnboardingData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep === steps.length) {
      handleComplete();
      return;
    }
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleComplete = () => {
    console.log("Onboarding Complete:", onboardingData);
    setShowSuccessModal(true);
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard"); // Redirect to dashboard after completion
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo data={onboardingData} updateData={updateOnboardingData} />;
      case 2:
        return <EmploymentInfo data={onboardingData} updateData={updateOnboardingData} />;
      case 3:
        return <DocumentsInfo data={onboardingData} updateData={updateOnboardingData} />;
      case 4:
        return <ReviewInfo data={onboardingData} />;
      default:
        return null;
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return onboardingData.fullName && onboardingData.email && onboardingData.phone && onboardingData.emergencyContact;
      case 2:
        return onboardingData.engagementType && onboardingData.jobTitle && onboardingData.startDate;
      case 3:
        return onboardingData.governmentId;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-32 pb-16 px-6 lg:px-16 flex flex-col items-center relative">
      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-[32px] w-full max-w-sm p-8 text-center shadow-2xl animate-scaleUp border border-white/20">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center relative">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800/40 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 bg-[#22C55E] rounded-full flex items-center justify-center text-white shadow-lg">
                    <Check size={24} strokeWidth={4} />
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Onboarding Complete!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Your profile has been set up successfully. Welcome to the team!
            </p>

            <button
              onClick={handleGoToDashboard}
              className="w-full bg-[#1D4EFF] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="flex items-center justify-center mb-6">
            <img src="/careerpay-logo.png" alt="CareerPay" className="h-12 lg:h-16" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-tight">
            WELCOME TO CAREERPAY
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {currentStep === 4 ? "You Are Almost There" : "Complete your onboarding in just few steps"}
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-12">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-blue-500/5">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between pt-8 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all ${
                currentStep === 1
                  ? "opacity-0 pointer-events-none"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
              }`}
            >
              <ChevronLeft size={20} />
              Back
            </button>

            <button
              onClick={nextStep}
              disabled={!isStepComplete()}
              className={`flex items-center gap-2 font-bold px-8 py-3 rounded-xl shadow-lg transition-all transform active:scale-95 ${
                isStepComplete()
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {currentStep === steps.length ? (
                <>
                  Complete Onboarding
                  <CheckCircle2 size={20} />
                </>
              ) : (
                <>
                  Next Step
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <p className="mt-8 text-center text-sm text-gray-400 dark:text-gray-500">
          Employee Directory • Compensation Management • ESOP
        </p>
      </div>
    </section>
  );
};

export default Onboarding;
