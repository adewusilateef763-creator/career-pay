import React, { useState, useEffect } from "react";
import { 
  Users, 
  UserCheck, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Download,
  Search,
  ChevronRight,
  MoreVertical,
  ShieldCheck,
  Zap,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  CreditCard,
  PieChart as PieChartIcon,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { getCurrentPayroll } from "../../services/payroll";
import { getCompanyStats, getDepartments } from "../../services/company";
import { motion } from "framer-motion";

const MetricCard = ({ title, value, subValue, change, icon: Icon, trend, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden">
    <div className="flex items-start justify-between relative z-10">
      <div className={`p-3.5 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600 group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={20} />
      </div>
      {change && (
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}%
        </div>
      )}
    </div>
    <div className="mt-5 relative z-10">
      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-2xl font-black text-gray-900 tracking-tight">{value}</h3>
      <p className="text-gray-400 text-[9px] mt-1.5 font-bold uppercase tracking-wider opacity-60">{subValue}</p>
    </div>
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${color} opacity-[0.03] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
  </div>
);

const CompanyDashboard = ({ user }) => {
  const [payrollData, setPayrollData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [payroll, stats, depts] = await Promise.all([
          getCurrentPayroll(),
          getCompanyStats(),
          getDepartments()
        ]);
        setPayrollData(payroll.data);
        setStatsData(stats.data || stats);
        setDepartments(depts.data || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-10 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Assembling Your Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto animate-fadeIn">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Dashboard Overview</h1>
          <p className="text-gray-500 font-medium">Welcome back, {user?.firstName || "Adewale"}. Here's your company's performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white text-gray-700 px-6 py-4 rounded-2xl font-bold text-sm border border-gray-100 hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
            <Download size={18} />
            Export Report
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
            <Plus size={18} />
            Run New Payroll
          </button>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard 
          title="Total Employees" 
          value={statsData?.totalEmployees || "11"} 
          subValue="Active Workforce"
          change="8.2" 
          trend="up"
          icon={Users} 
          color="bg-blue-500"
        />
        <MetricCard 
          title="Total Payroll" 
          value={`₦${(payrollData?.summary?.totalGross / 1000000 || 5.8).toFixed(1)}M`} 
          subValue="Gross liability"
          change="12.4" 
          trend="up"
          icon={CreditCard} 
          color="bg-purple-500"
        />
        <MetricCard 
          title="Total Deductions" 
          value={`₦${(payrollData?.summary?.totalDeductions / 1000 || 500).toFixed(0)}k`} 
          subValue="Tax & Pension"
          change="2.1" 
          trend="down"
          icon={Zap} 
          color="bg-orange-500"
        />
        <MetricCard 
          title="Net Payroll" 
          value={`₦${(payrollData?.summary?.totalNet / 1000000 || 1.8).toFixed(1)}M`} 
          subValue="Net Payable"
          change="4.5" 
          trend="up"
          icon={ShieldCheck} 
          color="bg-green-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Monthly Comparison */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-xl font-black text-gray-900">Monthly Payroll Comparison</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">Spending trends over the last 6 months</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl">
                <button className="px-4 py-2 rounded-xl text-[10px] font-black bg-white text-gray-900 shadow-sm uppercase tracking-widest transition-all">6 Months</button>
                <button className="px-4 py-2 rounded-xl text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest transition-all">Yearly</button>
              </div>
            </div>
            {/* Chart Area */}
            <div className="h-72 flex items-end justify-between gap-6 px-4">
              {[45, 60, 55, 85, 70, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-6 group">
                  <div className="w-full bg-blue-50/50 rounded-2xl relative overflow-hidden h-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "circOut" }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-400 group-hover:from-blue-500 group-hover:to-blue-300 transition-all rounded-t-xl shadow-[0_-4px_20px_rgba(37,99,235,0.2)]"
                    />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Payroll Breakdown */}
        <div className="bg-[#0a1628] p-10 rounded-[2.5rem] text-white shadow-xl shadow-blue-900/10 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-10">Payroll Breakdown</h3>
            <div className="relative flex justify-center py-6">
              <svg viewBox="0 0 32 32" className="w-48 h-48 transform -rotate-90 drop-shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <circle r="16" cx="16" cy="16" fill="transparent" stroke="#2563EB" strokeWidth="32" strokeDasharray="65 100" />
                <circle r="16" cx="16" cy="16" fill="transparent" stroke="#A855F7" strokeWidth="32" strokeDasharray="20 100" strokeDashoffset="-65" />
                <circle r="16" cx="16" cy="16" fill="transparent" stroke="#F97316" strokeWidth="32" strokeDasharray="15 100" strokeDashoffset="-85" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#0a1628] w-24 h-24 rounded-full flex flex-col items-center justify-center ring-4 ring-white/5 shadow-inner">
                  <span className="text-2xl font-black tracking-tight">₦5.8M</span>
                  <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest mt-1">Total Gross</span>
                </div>
              </div>
            </div>
            <div className="mt-10 space-y-4">
              {[
                { label: "Net Salary", value: "65%", color: "bg-blue-600" },
                { label: "Taxes (PAYE)", value: "20%", color: "bg-purple-500" },
                { label: "Pension", value: "15%", color: "bg-orange-500" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs font-bold text-gray-400">{item.label}</span>
                  </div>
                  <span className="text-xs font-black text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/5 blur-3xl rounded-full"></div>
        </div>
      </div>

      {/* Bottom Row - Department Distribution */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="text-xl font-black text-gray-900">Department-wise Distribution</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">Staff allocation by department</p>
          </div>
          <button className="flex items-center gap-2 text-blue-600 text-xs font-black uppercase tracking-widest hover:underline">
            Manage Teams <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10">
          {[
            { name: "Engineering", count: 42, color: "bg-blue-600", percentage: 75 },
            { name: "Product Design", count: 18, color: "bg-purple-500", percentage: 45 },
            { name: "Marketing", count: 24, color: "bg-orange-500", percentage: 60 },
            { name: "Sales", count: 15, color: "bg-green-500", percentage: 35 },
            { name: "Operations", count: 12, color: "bg-red-500", percentage: 25 },
            { name: "Finance", count: 8, color: "bg-yellow-500", percentage: 15 }
          ].map((dept, i) => (
            <div key={i} className="space-y-4 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-6 rounded-full ${dept.color}`} />
                  <span className="text-sm font-black text-gray-900">{dept.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{dept.count} Staff</span>
              </div>
              <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${dept.percentage}%` }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                  className={`h-full ${dept.color} rounded-full shadow-[0_0_15px_rgba(0,0,0,0.05)]`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
