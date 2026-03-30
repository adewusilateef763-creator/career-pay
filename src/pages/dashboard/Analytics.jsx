import React, { useState, useEffect } from "react";
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  Briefcase, 
  PieChart as PieIcon,
  ChevronDown,
  Info,
  Maximize2,
  Loader2
} from "lucide-react";
import { getCurrentPayroll } from "../../services/payroll";
import { getCompanyStats } from "../../services/company";

const AnalyticsCard = ({ title, value, change, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-2xl hover:shadow-[#1D4EFF]/5 transition-all duration-500">
    <div className="flex items-center justify-between mb-8 relative z-10">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 dark:bg-opacity-20 transition-transform group-hover:scale-110 duration-500`}>
        {icon}
      </div>
      <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
        <TrendingUp size={14} />
        {change}
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight group-hover:translate-x-1 transition-transform duration-500">{value}</h3>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">{title}</p>
    </div>
    <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full ${color} opacity-5 group-hover:scale-150 transition-transform duration-700`}></div>
  </div>
);

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ payroll: null, stats: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [payrollRes, statsRes] = await Promise.all([
          getCurrentPayroll(),
          getCompanyStats()
        ]);
        setData({ payroll: payrollRes.data, stats: statsRes.data || statsRes });
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="animate-spin text-[#1D4EFF]" size={40} />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Generating Workforce Insights...</p>
      </div>
    );
  }

  const summary = data.payroll?.summary || { totalGross: 0, totalEmployees: 0 };
  const stats = data.stats || { activeStaff: 0, growth: "+0%" };

  const departments = [
    { name: "Engineering", color: "bg-[#1D4EFF]", value: "45%" },
    { name: "Design", color: "bg-[#22C55E]", value: "20%" },
    { name: "Finance", color: "bg-[#FFB800]", value: "25%" },
    { name: "Marketing", color: "bg-red-500", value: "10%" }
  ];

  return (
    <div className="space-y-10">
      {/* Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Compensation and Workforce Insights</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-5 py-3 rounded-2xl font-bold text-sm text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95">
            <Calendar size={18} className="text-[#1D4EFF]" />
            Last 6 Months
            <ChevronDown size={16} />
          </button>
          
          <button className="flex items-center gap-3 bg-[#1D4EFF] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all transform active:scale-95">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Analytics Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnalyticsCard 
          title="Current Monthly Payroll" 
          value={`₦${(summary.totalGross / 1000000).toFixed(2)}m`} 
          change={stats.growth} 
          icon={<Briefcase size={24} className="text-[#1D4EFF]" />} 
          color="bg-[#1D4EFF]"
        />
        <AnalyticsCard 
          title="Avg. Compensation" 
          value={`₦${summary.totalEmployees > 0 ? (summary.totalGross / summary.totalEmployees / 1000).toFixed(0) : 0}k`} 
          change="+0%" 
          icon={<TrendingUp size={24} className="text-[#22C55E]" />} 
          color="bg-[#22C55E]"
        />
        <AnalyticsCard 
          title="Active Workforce" 
          value={stats.activeStaff?.toString() || "0"} 
          change="+0" 
          icon={<Users size={24} className="text-[#FFB800]" />} 
          color="bg-[#FFB800]"
        />
      </div>

      {/* Main Content: Cost by Department */}
      <div className="bg-[#0F172A] dark:bg-gray-800/80 p-10 md:p-16 rounded-[48px] shadow-2xl relative overflow-hidden group border border-white/5">
        <div className="absolute top-10 right-10 flex gap-3">
          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all">
            <Info size={20} />
          </button>
          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all">
            <Maximize2 size={20} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          {/* Pie Chart Mockup */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-10 mr-auto">
              <div className="w-2 h-2 bg-[#1D4EFF] rounded-full animate-pulse"></div>
              <h3 className="text-xl font-bold text-white tracking-tight uppercase tracking-widest text-[#1D4EFF]">Cost by Department</h3>
            </div>
            
            <div className="relative w-72 h-72 md:w-96 md:h-96 group-hover:scale-105 transition-transform duration-700">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-[0_0_50px_rgba(29,78,255,0.15)]">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1D4EFF" strokeWidth="6" strokeDasharray="45, 100" strokeLinecap="round"></circle>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#22C55E" strokeWidth="6" strokeDasharray="20, 100" strokeDashoffset="-45" strokeLinecap="round"></circle>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#FFB800" strokeWidth="6" strokeDasharray="25, 100" strokeDashoffset="-65" strokeLinecap="round"></circle>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EF4444" strokeWidth="6" strokeDasharray="10, 100" strokeDashoffset="-90" strokeLinecap="round"></circle>
              </svg>
            </div>
          </div>

          {/* Legend and Stats */}
          <div className="w-full lg:w-1/2 lg:pl-10">
            <div className="space-y-8">
              <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-10">List of Departments</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {departments.map((dept, i) => (
                  <div key={i} className="flex flex-col gap-3 group/item">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 ${dept.color} rounded-full ring-4 ring-white/5`}></div>
                      <span className="text-sm font-bold text-white group-hover/item:text-[#1D4EFF] transition-colors duration-300">{dept.name}</span>
                    </div>
                    <div className="flex items-end gap-3 ml-7">
                      <span className="text-3xl font-black text-white leading-none tracking-tighter">{dept.value}</span>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full mb-1">
                        <TrendingUp size={10} />
                        2.4%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Operating Cost</p>
                  <p className="text-2xl font-black text-white">N25,400,000</p>
                </div>
                <button className="px-8 py-4 bg-white/5 hover:bg-white text-white hover:text-black font-black text-xs uppercase tracking-widest rounded-2xl transition-all duration-500 active:scale-95">
                  Detailed Breakdown
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1D4EFF] opacity-[0.02] rounded-full blur-[120px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Analytics;
