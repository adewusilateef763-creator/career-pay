import React, { useState, useEffect } from "react";
import { 
  PieChart as PieIcon, 
  TrendingUp, 
  Users, 
  Award, 
  Calendar, 
  Plus, 
  Search,
  ChevronRight,
  MoreVertical,
  Download,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import { getCompanyEmployees } from "../../services/company";
import { motion, AnimatePresence } from "framer-motion";

const StatCard = ({ label, value, change, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden">
    <div className="flex items-start justify-between relative z-10">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600 group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={24} />
      </div>
      {change && (
        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          <ArrowUpRight size={14} />
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

const ESOP = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getCompanyEmployees();
        if (res.success) {
          setEmployees(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch employees for ESOP:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="p-10 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Loading Equity Data...</p>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Equity & ESOP</h1>
          <p className="text-gray-500 font-medium">Manage stock options, vesting schedules, and participant grants.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white text-gray-700 px-6 py-4 rounded-2xl font-bold text-sm border border-gray-100 hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
            <Download size={20} />
            Cap Table
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
            <Plus size={20} />
            Issue New Grant
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="Total ESOP Pool" value="1,500,000" change="5.2%" trend="up" icon={PieIcon} color="bg-blue-500" />
        <StatCard label="Options Granted" value="850,400" change="12.5%" trend="up" icon={Award} color="bg-purple-500" />
        <StatCard label="Active Participants" value={employees.length.toString()} change="+2" trend="up" icon={Users} color="bg-green-500" />
        <StatCard label="Next Vesting" value="Apr 15" icon={Calendar} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Equity Distribution */}
        <div className="lg:col-span-2 bg-[#0a1628] rounded-[2.5rem] p-10 shadow-xl shadow-blue-900/10 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-black text-white">Equity Distribution</h3>
                <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Current Grant Allocation</p>
              </div>
              <select className="bg-white/5 border-0 rounded-xl px-4 py-2 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-blue-500/20 uppercase tracking-widest cursor-pointer hover:bg-white/10 transition-all">
                <option>Vested vs Unvested</option>
                <option>By Department</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative flex justify-center py-4">
                <svg viewBox="0 0 32 32" className="w-64 h-64 transform -rotate-90 drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#1D4EFF" strokeWidth="32" strokeDasharray="56.7 100" />
                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#A855F7" strokeWidth="32" strokeDasharray="43.3 100" strokeDashoffset="-56.7" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="bg-[#0a1628] w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-inner ring-4 ring-white/5">
                    <span className="text-white text-3xl font-black tracking-tight">56.7%</span>
                    <span className="text-blue-400 text-[9px] font-black uppercase tracking-widest mt-1">Vested</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Vested Options</span>
                    </div>
                    <span className="text-lg font-black text-white">850,400</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "56.7%" }} transition={{ duration: 1.5 }} className="bg-blue-600 h-full" />
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Unvested</span>
                    </div>
                    <span className="text-lg font-black text-white">649,600</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "43.3%" }} transition={{ duration: 1.5, delay: 0.2 }} className="bg-purple-500 h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/5 blur-3xl rounded-full group-hover:bg-blue-600/10 transition-all duration-700"></div>
        </div>

        {/* Recent Grants Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-gray-900">Recent Grants</h3>
            <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-6 flex-1">
            {employees.slice(0, 5).map((emp, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer p-2 rounded-2xl hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs overflow-hidden group-hover:scale-110 transition-transform">
                    <img src={`https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}&background=random`} alt="" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-900 leading-none mb-1">{emp.firstName} {emp.lastName}</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{emp.department || "N/A"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900">5,000</p>
                  <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Issued</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-50">
            <div className="bg-orange-50 rounded-2xl p-4 flex items-center gap-4 border border-orange-100">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-0.5">Upcoming Event</p>
                <p className="text-xs font-bold text-gray-900 leading-snug">Quarterly vesting run starts in 4 days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESOP;
