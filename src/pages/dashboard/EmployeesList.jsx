import React, { useState } from "react";
import { 
  Search, 
  ChevronDown, 
  Plus, 
  Eye, 
  Edit2, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

const EmployeesList = () => {
  const [employees] = useState([
    { id: "EMP001", name: "David Adewale", role: "Finance", department: "Finance", status: "Active" },
    { id: "EMP002", name: "David Adewale", role: "Finance", department: "Finance", status: "Active" },
    { id: "EMP003", name: "David Adewale", role: "Finance", department: "Finance", status: "Active" },
    { id: "EMP003", name: "David Adewale", role: "Finance", department: "Finance", status: "Active" },
    { id: "EMP004", name: "David Adewale", role: "Finance", department: "Finance", status: "On Leave" },
    { id: "EMP005", name: "David Adewale", role: "Finance", department: "Finance", status: "Active" },
    { id: "EMP006", name: "David Adewale", role: "Finance", department: "Finance", status: "Active" },
    { id: "EMP006", name: "David Adewale", role: "Finance", department: "Finance", status: "Inactive" },
  ]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#0F172A] dark:text-white">Employees</h1>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#22C55E] text-white rounded-lg overflow-hidden shadow-lg shadow-green-500/20">
            <button className="px-4 py-2.5 font-bold text-sm hover:bg-green-600 transition-all">
              Add Employee
            </button>
            <div className="w-[1px] h-6 bg-white/20"></div>
            <button className="px-2 py-2.5 hover:bg-green-600 transition-all">
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Filters */}
        <div className="p-4 flex flex-wrap items-center gap-6 border-b border-gray-50 dark:border-gray-700">
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">All Departments</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
          
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">All Roles</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
          
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="text-sm font-medium text-gray-400 group-hover:text-gray-600 transition-colors">All Status</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">Name</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700 text-center">Employee ID</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700 text-center">Role</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700 text-center">Department</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700 text-center">Status</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {employees.map((emp, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{emp.name}</span>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500 text-center font-bold uppercase tracking-tighter">{emp.id}</td>
                  <td className="px-8 py-5 text-sm text-gray-500 text-center">{emp.role}</td>
                  <td className="px-8 py-5 text-sm text-gray-500 text-center">{emp.department}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      emp.status === 'Active' ? 'bg-green-50 text-green-500' : 
                      emp.status === 'On Leave' ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        emp.status === 'Active' ? 'bg-green-500' : 
                        emp.status === 'On Leave' ? 'bg-orange-500' : 'bg-red-500'
                      }`}></div>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-4 text-gray-400">
                      <button className="hover:text-gray-900 dark:hover:text-white transition-colors p-1"><Eye size={18} /></button>
                      <button className="hover:text-gray-900 dark:hover:text-white transition-colors p-1"><Edit2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 flex items-center justify-between border-t border-gray-50 dark:border-gray-700 bg-white dark:bg-gray-800">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing 1 to 6 of 10 results</p>
          <div className="flex items-center gap-3">
            <button className="p-1 text-gray-300 hover:text-gray-500 transition-colors"><ChevronLeft size={20} /></button>
            <button className="w-8 h-8 flex items-center justify-center bg-[#22C55E] text-white rounded-lg text-xs font-bold shadow-lg shadow-green-500/20">1</button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-xs font-bold transition-all">2</button>
            <button className="p-1 text-gray-300 hover:text-gray-500 transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesList;
