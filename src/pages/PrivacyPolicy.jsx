import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-white dark:bg-gray-900 pt-32 pb-16 px-6 lg:px-16 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Learn more about how we collect, use, and protect your data.
          </p>
        </div>

        <div className="space-y-12">
          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At CareerPay, we take your privacy seriously. This Privacy Policy outlines the types of personal information we collect and how we use it to provide our services.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Collection</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We collect information that you provide to us when you create an account, such as your name, email address, and financial information necessary for payroll processing.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Usage</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We use your personal information to provide our services, including processing payroll and managing ESOPs. We do not sell your personal information to third parties.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Security Measures</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We use industry-standard encryption and security protocols to protect your personal information and financial data from unauthorized access.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              You have the right to access and update your personal information. If you have any questions about your data, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
