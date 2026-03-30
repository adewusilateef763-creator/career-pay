import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  CalendarCheck, 
  Bell, 
  Settings, 
  ChevronDown, 
  LogOut,
  X,
  Plus,
  Eye,
  FileText,
  User,
  PieChart as PieIcon,
  Calculator
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    company: true,
    employee: true,
    payroll: true,
    attendance: false
  });

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-64 z-50 transition-transform duration-300 transform border-r border-gray-100 dark:border-gray-800 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-between border-b border-gray-50 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <img src="/careerpay-logo.png" alt="CareerPay" className="h-8" />
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-400 p-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <div className="px-4 py-6 overflow-y-auto h-[calc(100vh-180px)] space-y-4">
          {/* Main Menu */}
          <Link 
            to="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/dashboard") ? "bg-[#1D4EFF] text-white shadow-lg shadow-blue-500/20" : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          {/* Company Section */}
          <div className="space-y-1">
            <button 
              onClick={() => toggleMenu("company")}
              className="w-full flex items-center justify-between px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
            >
              Company
              <ChevronDown size={14} className={`transition-transform ${expandedMenus.company ? "rotate-180" : ""}`} />
            </button>
            
            {expandedMenus.company && (
              <div className="space-y-1">
                {/* Employee Dropdown */}
                <div className="space-y-1">
                  <button 
                    onClick={() => toggleMenu("employee")}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <User size={20} />
                      <span className="font-medium">Employee</span>
                    </div>
                    <ChevronDown size={14} className={`transition-transform ${expandedMenus.employee ? "rotate-180" : ""}`} />
                  </button>
                  {expandedMenus.employee && (
                    <div className="ml-4 space-y-1">
                      <Link to="/dashboard/add-employee" className={`block px-8 py-2 text-sm transition-colors ${isActive("/dashboard/add-employee") ? "text-[#1D4EFF] font-bold" : "text-gray-400 hover:text-gray-900"}`}>Add Employess</Link>
                      <Link to="/dashboard/view-employees" className={`block px-4 py-2.5 rounded-xl text-sm transition-all ${isActive("/dashboard/view-employees") ? "bg-[#1D4EFF] text-white shadow-md shadow-blue-500/20" : "text-gray-400 hover:text-gray-900 ml-4"}`}>View Employees</Link>
                    </div>
                  )}
                </div>

                {/* Payroll Dropdown */}
                <div className="space-y-1">
                  <button 
                    onClick={() => toggleMenu("payroll")}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard size={20} />
                      <span className="font-medium">Payroll</span>
                    </div>
                    <ChevronDown size={14} className={`transition-transform ${expandedMenus.payroll ? "rotate-180" : ""}`} />
                  </button>
                  {expandedMenus.payroll && (
                    <div className="ml-4 space-y-1">
                      <Link to="/dashboard/payroll" className={`block px-8 py-2 text-sm transition-colors ${isActive("/dashboard/payroll") ? "text-[#1D4EFF] font-bold" : "text-gray-400 hover:text-gray-900"}`}>Payroll</Link>
                      <Link to="/dashboard/payslip" className={`block px-8 py-2 text-sm transition-colors ${isActive("/dashboard/payslip") ? "text-[#1D4EFF] font-bold" : "text-gray-400 hover:text-gray-900"}`}>Payslip</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Support Menu */}
          <nav className="space-y-1">
            <Link 
              to="/dashboard/notifications"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/dashboard/notifications") ? "bg-[#1D4EFF] text-white shadow-lg shadow-blue-500/20" : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"}`}
            >
              <Bell size={20} />
              <span className="font-medium">Notification</span>
            </Link>

            <Link 
              to="/dashboard/settings"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive("/dashboard/settings") ? "bg-[#1D4EFF] text-white shadow-lg shadow-blue-500/20" : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"}`}
            >
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </Link>
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-50 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white overflow-hidden ring-2 ring-gray-100 dark:ring-gray-800">
              <img src="https://ui-avatars.com/api/?name=Olaolu&background=1D4EFF&color=fff" alt="User" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-[11px] font-bold text-[#1D4EFF] truncate">Olaolu@Careerpay.com</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
