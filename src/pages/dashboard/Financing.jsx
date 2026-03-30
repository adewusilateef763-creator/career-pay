import React, { useState, useEffect } from "react";
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Search,
  MoreVertical,
  Download,
  PieChart as PieIcon,
  Landmark,
  Zap,
  CheckCircle2,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import { getCurrentPayroll } from "../../services/payroll";
import { motion, AnimatePresence } from "framer-motion";

const StatCard = ({ label, value, change, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden">
    <div className="flex items-start justify-between relative z-10">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600 group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={24} />
      </div>
      {change && (
        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
          {change}
        </div>
      )}
    </div>
    <div className="mt-6 relative z-10">
      <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
    </div>
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${color} opacity-[0.03] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
  </div>
);

const Financing = () => {
  const [payrollData, setPayrollData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCurrentPayroll();
        setPayrollData(res.data);
      } catch (error) {
        console.error("Failed to fetch data for Financing:", error);
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
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Accessing Credit Markets...</p>
      </div>
    );
  }

  const totalGross = payrollData?.summary?.totalGross || 0;

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Financing & Credit</h1>
          <p className="text-gray-500 font-medium">Access talent credit, manage facilities, and scale operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
            <Plus size={20} />
            New Loan Application
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="Available Credit" value="₦5.0M" change="Based on Revenue" icon={Wallet} color="bg-blue-500" trend="up" />
        <StatCard label="Active Loans" value="₦1.2M" change="-₦200k Paid" icon={Landmark} color="bg-orange-500" trend="up" />
        <StatCard label="Repayment Score" value="94/100" change="Excellent" icon={ShieldCheck} color="bg-green-500" trend="up" />
        <StatCard label="Next Payout" value="Apr 01" change="₦150,000" icon={Clock} color="bg-purple-500" trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Financing Overview */}
        <div className="lg:col-span-2 bg-[#0a1628] rounded-[2.5rem] p-10 shadow-xl shadow-blue-900/10 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-black text-white">Utilization Insights</h3>
                <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Credit limit vs Repayment capacity</p>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
                <button className="px-4 py-2 rounded-xl text-[10px] font-black bg-blue-600 text-white uppercase tracking-widest transition-all">Utilization</button>
                <button className="px-4 py-2 rounded-xl text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest transition-all">Capacity</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative flex justify-center py-4">
                <svg viewBox="0 0 32 32" className="w-64 h-64 transform -rotate-90 drop-shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#22C55E" strokeWidth="32" strokeDasharray="70 100" />
                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#F59E0B" strokeWidth="32" strokeDasharray="30 100" strokeDashoffset="-70" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="bg-[#0a1628] w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-inner ring-4 ring-white/5">
                    <span className="text-white text-3xl font-black tracking-tight">70%</span>
                    <span className="text-green-400 text-[9px] font-black uppercase tracking-widest mt-1">Repaid</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payroll Capacity</span>
                    <span className="text-lg font-black text-white">₦{(totalGross * 3 / 1000).toFixed(1)}k / mo</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 1.5 }} className="bg-blue-600 h-full" />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-3 font-bold uppercase tracking-wider italic">Estimated 3x monthly payroll</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-[2rem] bg-green-500/5 border border-green-500/10">
                    <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-2">Total Repaid</p>
                    <p className="text-2xl font-black text-white">₦2.8M</p>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-orange-500/5 border border-orange-500/10">
                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2">Outstanding</p>
                    <p className="text-2xl font-black text-white">₦1.2M</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-green-600/5 blur-3xl rounded-full"></div>
        </div>

        {/* Schedule Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-gray-900">Payment Schedule</h3>
            <button className="text-blue-600 font-bold text-sm hover:underline">View Calendar</button>
          </div>
          <div className="space-y-6 flex-1">
            {[
              { date: "Apr 01", amount: "₦150,000", status: "Upcoming", color: "bg-blue-50 text-blue-600" },
              { date: "May 01", amount: "₦150,000", status: "Pending", color: "bg-gray-50 text-gray-400" },
              { date: "Jun 01", amount: "₦150,000", status: "Pending", color: "bg-gray-50 text-gray-400" },
              { date: "Mar 01", amount: "₦150,000", status: "Successful", color: "bg-green-50 text-green-600" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer p-2 rounded-2xl hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-black text-[10px] uppercase leading-none ${item.color}`}>
                    <span>{item.date.split(" ")[0]}</span>
                    <span className="mt-1">{item.date.split(" ")[1]}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900 leading-none mb-1">{item.amount}</h4>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${item.status === 'Successful' ? 'text-green-500' : 'text-gray-400'}`}>{item.status}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-50">
            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100/50">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="text-blue-600" size={20} />
                <h4 className="text-sm font-black text-blue-900">Credit Boost</h4>
              </div>
              <p className="text-xs text-blue-800 font-medium leading-relaxed">
                Your repayment score increased by 4 points. You are now eligible for a higher credit limit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financing;
