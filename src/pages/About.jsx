import React from "react";

const About = () => {
  return (
    <section className="bg-white dark:bg-gray-900 pt-32 pb-16 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About CareerPay
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We are revolutionizing how organizations manage compensation and empower their workforce through innovative financial solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              At CareerPay, our mission is to simplify complex compensation structures and provide accessible financing options for both employers and employees. We believe that financial empowerment is the key to a motivated and productive workforce.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Through our platform, we offer Talent Credit Financing, Employee Stock Ownership Plans (ESOP), and a robust Payroll Management System, all designed to streamline operations and enhance employee value.
            </p>
          </div>
          <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-3 text-blue-200">✓</span>
                <span>Innovative Talent Credit Financing solutions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-200">✓</span>
                <span>Simplified ESOP management for all company sizes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-200">✓</span>
                <span>End-to-end Payroll Management System</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-blue-200">✓</span>
                <span>Focus on transparency and financial growth</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Empowering the Future of Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
              <h4 className="text-xl font-bold text-blue-600 mb-3">Integrity</h4>
              <p className="text-gray-600 dark:text-gray-300">We maintain the highest standards of transparency in every financial transaction.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
              <h4 className="text-xl font-bold text-blue-600 mb-3">Innovation</h4>
              <p className="text-gray-600 dark:text-gray-300">Constantly evolving our platform to meet the dynamic needs of modern organizations.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm">
              <h4 className="text-xl font-bold text-blue-600 mb-3">Growth</h4>
              <p className="text-gray-600 dark:text-gray-300">Helping companies and their employees build long-term financial security.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
