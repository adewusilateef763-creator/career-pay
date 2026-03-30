import { useState, useEffect } from "react";
import { Users, CreditCard, TrendingUp, UserCheck } from "lucide-react"; 
import { getCompanyStats } from "../../services/company";

export default function NewDashboard() { 
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getCompanyStats();
        setStatsData(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [ 
    { label: "Total Employees", value: statsData?.data?.totalEmployees || statsData?.totalEmployees || "0", icon: <Users size={20} />, color: "bg-blue-50 text-blue-600" }, 
    { label: "Total Payroll", value: `₦${statsData?.data?.totalPayroll || statsData?.totalPayroll || "0"}`, icon: <CreditCard size={20} />, color: "bg-green-50 text-green-600" }, 
    { label: "Active Staff", value: statsData?.data?.activeStaff || statsData?.activeStaff || "0", icon: <UserCheck size={20} />, color: "bg-purple-50 text-purple-600" }, 
    { label: "Growth", value: statsData?.data?.growth || statsData?.growth || "+0%", icon: <TrendingUp size={20} />, color: "bg-orange-50 text-orange-600" }, 
  ]; 

  if (loading) {
    return <div className="p-6">Loading stats...</div>;
  }

  return ( 
    <div className="p-6"> 
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Dashboard</h1> 
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"> 
        {stats.map(({ label, value, icon, color }) => ( 
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-5"> 
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}> 
              {icon} 
            </div> 
            <p className="text-2xl font-semibold text-gray-900">{value}</p> 
            <p className="text-xs text-gray-500 mt-0.5">{label}</p> 
          </div> 
        ))} 
      </div> 
      <div className="bg-white rounded-xl border border-gray-100 p-6"> 
        <h2 className="text-sm font-medium text-gray-700 mb-4">Payroll Overview</h2> 
        <div className="h-48 flex items-center justify-center text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg"> 
          Chart coming soon — connect your payroll data 
        </div> 
      </div> 
    </div> 
  ); 
}