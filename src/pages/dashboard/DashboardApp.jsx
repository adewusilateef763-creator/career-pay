import React, { useState, useEffect } from "react"; 
import NewSidebar from "../../components/dashboard/NewSidebar"; 
import NewHeader from "../../components/dashboard/NewHeader"; 
import NewDashboard from "./NewDashboard"; 
import CompanyDashboard from "./CompanyDashboard";
import NewViewEmployees from "./NewViewEmployees"; 
import AddEmployee from "./AddEmployee";
import Payroll from "./Payroll";
import TaxSimulator from "./TaxSimulator";
import CompanySettings from "./CompanySettings";
import ESOP from "./ESOP";
import Financing from "./Financing";
import EmployeeDashboard from "./EmployeeDashboard";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";
 
const ComingSoon = ({ title }) => ( 
  <div className="p-6"> 
    <h1 className="text-xl font-semibold text-gray-900 mb-4">{title}</h1> 
    <div className="bg-white rounded-xl border border-gray-100 p-12 flex items-center justify-center text-gray-400 text-sm"> 
      This section is coming soon 
    </div> 
  </div> 
); 
 
export default function DashboardApp() { 
  const [activePage, setActivePage] = useState("dashboard"); 
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);
 
  const renderPage = () => { 
    console.log("Current activePage:", activePage);
    
    // If user is employee, show employee-specific views
    const isEmployee = user?.role === "employee";

    switch (activePage) { 
      case "dashboard":      
        return isEmployee ? <EmployeeDashboard user={user} /> : <CompanyDashboard user={user} />; 
      case "view-employees": 
        return isEmployee ? <ComingSoon title="My Profile" /> : <NewViewEmployees setActivePage={setActivePage} />; 
      case "add-employees":  
        return isEmployee ? <ComingSoon title="Attendance" /> : <AddEmployee setActivePage={setActivePage} />; 
      case "payroll":        
        return isEmployee ? <ComingSoon title="My Payslips" /> : <Payroll user={user} />; 
      case "esop":           
        return <ESOP user={user} />; 
      case "financing":      
        return <Financing user={user} />; 
      case "payslip":        
        return <ComingSoon title="Payslip" />; 
      case "notification":   
        return <ComingSoon title="Notifications" />; 
      case "settings":       
        return <CompanySettings user={user} />; 
      default:               
        return isEmployee ? <ComingSoon title="Employee Dashboard" /> : <CompanyDashboard user={user} />; 
    } 
  }; 

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login", { replace: true });
};
 
  return ( 
    <div className="flex h-screen bg-gray-50 overflow-hidden"> 
      <NewSidebar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        user={user}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden"> 
        <NewHeader toggleSidebar={() => setSidebarOpen((o) => !o)} user={user} />
        <main className="flex-1 overflow-y-auto bg-gray-50"> 
          {renderPage()} 
        </main> 
      </div> 
    </div> 
  ); 
}