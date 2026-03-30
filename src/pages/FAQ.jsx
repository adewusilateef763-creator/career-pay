import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqs = [
    {
      question: "What is CareerPay?",
      answer: "CareerPay is a comprehensive compensation management platform that helps organizations manage payroll, ESOPs, and talent credit financing in one place."
    },
    {
      question: "How does Talent Credit Financing work?",
      answer: "Talent Credit Financing allows employees to access a portion of their earned but unpaid compensation early, helping them manage their financial needs more flexibly."
    },
    {
      question: "Is CareerPay secure?",
      answer: "Yes, security is our top priority. We use industry-standard encryption and security protocols to ensure that all financial data and personal information are protected."
    },
    {
      question: "Can CareerPay integrate with my existing HR software?",
      answer: "Yes, CareerPay is designed to integrate seamlessly with most popular HR and accounting software to ensure a smooth transition and data consistency."
    },
    {
      question: "How do I get started with CareerPay?",
      answer: "You can get started by clicking the 'Get Started' button on our homepage or by contacting our sales team for a personalized demo."
    },
    {
      question: "What is an ESOP and how does CareerPay manage it?",
      answer: "An Employee Stock Ownership Plan (ESOP) is a program that gives employees ownership interest in the company. CareerPay simplifies the management of these plans, from tracking vesting schedules to managing distributions."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-gray-900 pt-32 pb-16 px-6 lg:px-16 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Have questions? We've got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <span className={`text-2xl text-blue-600 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Still have more questions?</p>
          <Link
            to="/contact"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
