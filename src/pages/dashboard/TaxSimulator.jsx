import React, { useState } from "react";
import { 
  ChevronDown, 
  Info,
  Calculator,
  Download,
  TrendingUp,
  CreditCard,
  Loader2
} from "lucide-react";
import { getTaxBreakdown } from "../../services/payroll";

const TaxSimulator = () => {
  const [loading, setLoading] = useState(false);
  const [breakdown, setBreakdown] = useState(null);
  const [formData, setFormData] = useState({
    annualSalary: "150000",
    annualBonus: "0",
    state: "Lagos",
    filingStatus: "Single",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const totalGross = parseFloat(formData.annualSalary) + parseFloat(formData.annualBonus || 0);
      const res = await getTaxBreakdown(totalGross);
      if (res.success) {
        setBreakdown(res.data);
      }
    } catch (error) {
      console.error("Failed to calculate tax:", error);
      alert("Failed to calculate tax. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, value, type = "number", subLabel, onChange }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{label}</label>
        {subLabel && <span className="text-[10px] text-gray-400 normal-case">({subLabel})</span>}
      </div>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₦</div>
        <input 
          type={type} 
          name={name}
          value={value} 
          onChange={onChange}
          className="w-full pl-8 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#1D4EFF] focus:bg-white outline-none text-sm font-bold text-gray-900 dark:text-white transition-all"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 uppercase tracking-widest">Tax Simulator</h1>
          <p className="text-sm text-gray-500 font-medium">Estimate payroll taxes and take-home pay</p>
        </div>
        <button 
          onClick={handleCalculate}
          disabled={loading}
          className="flex items-center gap-2 bg-[#1D4EFF] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all transform active:scale-95 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Calculator size={18} />}
          {loading ? "Calculating..." : "Calculate Net Pay"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-8 bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-50 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField label="Annual Salary" name="annualSalary" value={formData.annualSalary} onChange={handleChange} />
            <InputField label="Annual Bonus" name="annualBonus" value={formData.annualBonus} onChange={handleChange} />
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">State</label>
              <div className="relative group">
                <select 
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#1D4EFF] focus:bg-white outline-none text-sm font-bold text-gray-900 dark:text-white transition-all appearance-none cursor-pointer"
                >
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Filling Status</label>
              <div className="relative group">
                <select 
                  name="filingStatus"
                  value={formData.filingStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[#1D4EFF] focus:bg-white outline-none text-sm font-bold text-gray-900 dark:text-white transition-all appearance-none cursor-pointer"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-50 dark:border-gray-700">
            <h3 className="text-xs font-bold text-[#1D4EFF] uppercase tracking-[0.2em] mb-8">TAX BREAKDOWN BY BANDS</h3>
            <div className="space-y-4">
              {breakdown ? (
                breakdown.breakdown.map((band, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{band.band}</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{band.rate} Rate</p>
                    </div>
                    <p className="text-lg font-black text-gray-900 dark:text-white">₦{band.taxAmount.toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-[32px]">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Calculate to see breakdown</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Sidebar */}
        <div className="space-y-8">
          <div className="bg-[#1A1A1A] p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Estimated Annual Net</p>
              <h2 className="text-4xl font-black mb-1 leading-none tracking-tighter">
                ₦{breakdown ? (breakdown.annualGross - breakdown.totalTax).toLocaleString() : "0"}
              </h2>
              <p className="text-xs font-medium text-blue-400 flex items-center gap-1 mb-10">
                Monthly: ₦{breakdown ? ((breakdown.annualGross - breakdown.totalTax) / 12).toLocaleString(undefined, { maximumFractionDigits: 0 }) : "0"}
              </p>

              <div className="space-y-4 pt-8 border-t border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gross Income</span>
                  <span className="text-sm font-bold tracking-tight">₦{breakdown ? breakdown.annualGross.toLocaleString() : "0"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Relief Amount</span>
                  <span className="text-sm font-bold text-green-400 tracking-tight">₦{breakdown ? breakdown.reliefAmount.toLocaleString() : "0"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Taxable Income</span>
                  <span className="text-sm font-bold tracking-tight">₦{breakdown ? breakdown.taxableIncome.toLocaleString() : "0"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Tax</span>
                  <span className="text-sm font-bold text-red-400 tracking-tight">-₦{breakdown ? breakdown.totalTax.toLocaleString() : "0"}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-xs font-bold text-[#1D4EFF] uppercase tracking-widest">Annual Net</span>
                  <span className="text-xl font-black text-white tracking-tighter">
                    ₦{breakdown ? (breakdown.annualGross - breakdown.totalTax).toLocaleString() : "0"}
                  </span>
                </div>
              </div>

              <button className="w-full mt-10 bg-[#1D4EFF] text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group">
                <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                Download Tax Report
              </button>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1D4EFF] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          <div className="bg-[#E5E7EB] dark:bg-gray-800 p-8 rounded-[40px] border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#1D4EFF] text-white rounded-lg">
                <Info size={18} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Tax Information</h4>
            </div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
              These calculations are estimates based on standard Nigerian tax laws (CITA/PIT) and may vary based on specific exemptions or regional differences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSimulator;
