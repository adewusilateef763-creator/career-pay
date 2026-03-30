import React, { useState, useEffect } from "react";
import { 
  Search, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  RefreshCw,
  AlertCircle,
  FileSpreadsheet,
  History,
  Download,
  Filter,
  ArrowUpRight,
  CreditCard,
  Zap,
  ShieldCheck,
  MoreHorizontal
} from "lucide-react";
import { getCurrentPayroll, calculatePayroll } from "../../services/payroll";
import { motion, AnimatePresence } from "framer-motion";

const StatCard = ({ label, value, subValue, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden">
    <div className="flex items-start justify-between relative z-10">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600 group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={24} />
      </div>
      {trend && (
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600">
          <ArrowUpRight size={14} />
          {trend}
        </div>
      )}
    </div>
    <div className="mt-6 relative z-10">
      <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">{subValue}</p>
    </div>
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${color} opacity-[0.03] rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
  </div>
);

const Payroll = () => {
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPayroll = async () => {
    try {
      setLoading(true);
      const res = await getCurrentPayroll();
      setPayroll(res.data);
    } catch (error) {
      console.error("Failed to fetch payroll:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  const handleCalculate = async () => {
    if (!payroll?._id) return;
    setCalculating(true);
    try {
      await calculatePayroll(payroll._id);
      await fetchPayroll();
    } catch (error) {
      console.error("Calculation failed:", error);
    } finally {
      setCalculating(false);
    }
  };

  const filteredItems = payroll?.payrollItems?.filter(item => 
    item.employee?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.employee?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.employee?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="p-10 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Processing Ledger...</p>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Payroll Current Review</h1>
          <p className="text-gray-500 font-medium">Review and confirm payroll for the current period.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white text-gray-700 px-6 py-4 rounded-2xl font-bold text-sm border border-gray-100 hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
            <History size={20} />
            Audit Logs
          </button>
          {payroll?.status === "draft" ? (
            <button 
              onClick={handleCalculate}
              disabled={calculating}
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {calculating ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} />}
              {calculating ? "Processing..." : "Run Payroll Run"}
            </button>
          ) : (
            <button className="flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-600/20">
              <Download size={20} />
              Export Payslips
            </button>
          )}
        </div>
      </div>

      {/* Main Overview Card (Dark Blue) */}
      <div className="bg-[#0a1628] rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-blue-900/20">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-black mb-2">Payroll Current Overview</h3>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400 border border-white/5">
                  {payroll?.payrollPeriod?.month} {payroll?.payrollPeriod?.year}
                </span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${payroll?.status === 'calculated' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                  {payroll?.status || 'Draft'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Employees</p>
                <p className="text-2xl font-black">{filteredItems.length}</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Status</p>
                <p className="text-lg font-bold text-green-400">Ready to Pay</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Gross</p>
              <h4 className="text-3xl font-black tracking-tight text-white">₦{(payroll?.summary?.totalGross || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</h4>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Deductions</p>
              <h4 className="text-3xl font-black tracking-tight text-red-400">₦{(payroll?.summary?.totalDeductions || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</h4>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Net Pay</p>
              <h4 className="text-3xl font-black tracking-tight text-green-400">₦{(payroll?.summary?.totalNet || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</h4>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-gray-900">Spending Comparison</h3>
            <select className="bg-gray-50 border-0 rounded-xl px-4 py-2 text-[10px] font-black text-gray-500 uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-48 flex items-end justify-between gap-4 px-2">
            {[45, 60, 55, 80, 70, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full bg-blue-50/50 rounded-xl relative overflow-hidden h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="absolute bottom-0 left-0 right-0 bg-blue-600/80 group-hover:bg-blue-600 transition-all rounded-t-lg"
                  />
                </div>
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                  {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
          <h3 className="text-xl font-black text-gray-900 mb-8">Breakdown</h3>
          <div className="flex-1 flex items-center justify-center py-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 32 32" className="w-full h-full transform -rotate-90">
                <circle r="16" cx="16" cy="16" fill="transparent" stroke="#2563EB" strokeWidth="32" strokeDasharray="70 100" />
                <circle r="16" cx="16" cy="16" fill="transparent" stroke="#F97316" strokeWidth="32" strokeDasharray="30 100" strokeDashoffset="-70" />
              </svg>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-gray-500">Net Pay</span>
              </div>
              <span className="text-gray-900">70%</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-gray-500">Deductions</span>
              </div>
              <span className="text-gray-900">30%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="text-xl font-black text-gray-900">Recent Payrolls</h3>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search employees..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium outline-none"
              />
            </div>
            <button className="p-3.5 rounded-2xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all border border-transparent">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-left px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Employee Name</th>
                <th className="text-center px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Gross Salary</th>
                <th className="text-center px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Tax (PAYE)</th>
                <th className="text-center px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Pension</th>
                <th className="text-center px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Net Payable</th>
                <th className="text-center px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, i) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={item.employee?._id || i} 
                      className="group hover:bg-gray-50/50 transition-all cursor-pointer"
                    >
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold group-hover:scale-110 transition-transform overflow-hidden shadow-sm">
                            <img src={`https://ui-avatars.com/api/?name=${item.employee?.firstName}+${item.employee?.lastName}&background=random`} alt="" />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-gray-900 leading-none mb-1">{item.employee?.firstName} {item.employee?.lastName}</h4>
                            <p className="text-xs text-gray-400 font-medium">{item.employee?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <span className="text-sm font-bold text-gray-900">₦{(item.grossSalary || 0).toLocaleString()}</span>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <span className="text-sm font-bold text-red-500/80">₦{(item.deductions?.tax || 0).toLocaleString()}</span>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <span className="text-sm font-bold text-orange-500/80">₦{(item.deductions?.pension || 0).toLocaleString()}</span>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <span className="text-sm font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">₦{(item.netSalary || 0).toLocaleString()}</span>
                      </td>
                      <td className="px-10 py-6 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${payroll?.status === 'calculated' ? 'bg-green-50 text-green-600 ring-1 ring-green-500/20' : 'bg-orange-50 text-orange-600 ring-1 ring-orange-500/20'}`}>
                          {payroll?.status === 'calculated' ? 'Successful' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-10 py-24 text-center">
                      <div className="flex flex-col items-center gap-6 text-gray-400">
                        <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center border border-gray-100 shadow-inner">
                          <AlertCircle size={40} />
                        </div>
                        <p className="text-sm font-black uppercase tracking-[0.2em]">No matching records found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
