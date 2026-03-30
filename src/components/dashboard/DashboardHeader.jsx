import React from "react";
import { Search, Bell, Menu, User, ChevronDown } from "lucide-react";

const DashboardHeader = ({ toggleSidebar }) => {
  return (
    <header className="h-20 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40 transition-all">
      {/* Left: Mobile Toggle & Search */}
      <div className="flex items-center gap-4 flex-grow max-w-xl">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl font-bold text-[#1D4EFF] lg:hidden">Dashboard</h1>

        <div className="relative flex-grow group hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1D4EFF] transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-[#1D4EFF]/30 focus:bg-white focus:ring-4 focus:ring-[#1D4EFF]/5 outline-none transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-3 lg:gap-6">
        <button className="p-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all relative">
          <Bell size={22} />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </button>

        <div className="h-10 w-[1px] bg-gray-100 dark:bg-gray-700 mx-2 hidden sm:block"></div>

        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Olaolu</p>
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-widest">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 overflow-hidden ring-2 ring-transparent group-hover:ring-[#1D4EFF]/20 transition-all">
            <img src="https://ui-avatars.com/api/?name=Olaolu&background=1D4EFF&color=fff" alt="User" />
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
