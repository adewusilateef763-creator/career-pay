import React from "react";
import { User } from "lucide-react";

const PersonalInfo = ({ data, updateData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-8">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl text-blue-600 mr-6 shadow-sm">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
          <p className="text-gray-600 dark:text-gray-400">Let's start with your basic details</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={data.fullName || ""}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address*</label>
            <input
              type="email"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number*</label>
            <input
              type="tel"
              name="phone"
              value={data.phone || ""}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emergency Contact*</label>
            <input
              type="tel"
              name="emergencyContact"
              value={data.emergencyContact || ""}
              onChange={handleChange}
              placeholder="Enter emergency contact number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
