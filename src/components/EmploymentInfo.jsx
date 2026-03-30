import React from "react";
import { Briefcase, Calendar } from "lucide-react";

const EmploymentInfo = ({ data, updateData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const engagementTypes = ["Full-Time", "Part-Time", "Contract", "Intern"];

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center mb-8">
        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-xl text-yellow-600 mr-6 shadow-sm">
          <Briefcase size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employment Details</h2>
          <p className="text-gray-600 dark:text-gray-400">Tell us about your role</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Engagement Type*</label>
            <select
              name="engagementType"
              value={data.engagementType || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center]"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundSize: '1.5em' }}
            >
              <option value="" disabled>Select engagement type</option>
              {engagementTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Title*</label>
            <input
              type="text"
              name="jobTitle"
              value={data.jobTitle || ""}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date*</label>
            <div className="relative">
              <input
                type="date"
                name="startDate"
                value={data.startDate || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploymentInfo;
