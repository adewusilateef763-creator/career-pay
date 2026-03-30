import React from "react";
import { Check } from "lucide-react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                index + 1 < currentStep
                  ? "bg-green-500 text-white"
                  : index + 1 === currentStep
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {index + 1 < currentStep ? (
                <Check size={24} strokeWidth={3} />
              ) : (
                index + 1
              )}
            </div>
            <p
              className={`mt-2 text-sm font-medium ${
                index + 1 <= currentStep ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {step}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-4 transition-colors duration-300 rounded-full ${
                index + 1 < currentStep ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
