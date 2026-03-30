import React, { useState } from "react";
import { 
  User, 
  Briefcase, 
  FileText, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  Upload,
  Edit2,
  Loader2
} from "lucide-react";
import { addEmployee } from "../../services/company";

const AddEmployee = ({ setActivePage }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    homeAddress: "",
    // Step 2: Employment
    department: "",
    jobTitle: "",
    employmentType: "",
    startDate: "",
    reportingManager: "",
    // Step 3: Documents
    governmentId: null,
    taxForm: null,
    directDepositForm: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const steps = [
    { id: 1, name: "Personal Information", icon: <User size={20} /> },
    { id: 2, name: "Employment Details", icon: <Briefcase size={20} /> },
    { id: 3, name: "Documents", icon: <FileText size={20} /> },
    { id: 4, name: "Review", icon: <CheckCircle size={20} /> }
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const payload = {
        firstName: formData.fullName.split(" ")[0] || "",
        lastName: formData.fullName.split(" ").slice(1).join(" ") || "",
        email: formData.email,
        phone: formData.phone,
        position: formData.jobTitle,
        department: formData.department,
        salary: 0, // Placeholder, usually required by backend
        employmentType: formData.employmentType,
        startDate: formData.startDate,
      };
      
      const res = await addEmployee(payload);
      if (res.success) {
        alert("Employee added successfully!");
        if (setActivePage) {
          setActivePage("view-employees");
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Failed to add employee:", error);
      alert(error.response?.data?.message || "Failed to add employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepper = () => (
    <div className="flex items-center justify-center mb-12">
      {steps.map((s, i) => (
        <React.Fragment key={s.id}>
          <div className="flex flex-col items-center relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
              step >= s.id ? "bg-[#1D4EFF] border-[#1D4EFF] text-white shadow-lg shadow-blue-500/20" : "border-gray-200 text-gray-400"
            }`}>
              <span className="text-sm font-bold">{s.id}</span>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-24 h-0.5 mx-2 ${step > s.id ? "bg-[#1D4EFF]" : "bg-gray-200"}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-50 text-[#1D4EFF] rounded-xl">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                <p className="text-sm text-gray-500 font-medium">Let's start with your basic details</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Name*</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email Address*</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Phone Number*</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Emergency Contact*</label>
                <input 
                  type="tel" 
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Enter emergency contact" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none" 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Home Address*</label>
                <textarea 
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleChange}
                  placeholder="Enter home address" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none h-32 resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                <Briefcase size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Employment Details</h2>
                <p className="text-sm text-gray-500 font-medium">Tell us about your role</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Department*</label>
                <select 
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select department</option>
                  <option value="finance">Finance</option>
                  <option value="engineering">Engineering</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Job Title*</label>
                <input 
                  type="text" 
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Enter job title" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Employment Type*</label>
                <select 
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select type</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Start Date*</label>
                <input 
                  type="date" 
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none" 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Reporting Manager*</label>
                <input 
                  type="text" 
                  name="reportingManager"
                  value={formData.reportingManager}
                  onChange={handleChange}
                  placeholder="Enter reporting manager name" 
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1D4EFF] outline-none" 
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Documents</h2>
                <p className="text-sm text-gray-500 font-medium">Upload required documents</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: "Government ID", desc: "Passport, Driver's License, or State ID" },
                { title: "Tax Form", desc: "Employee's Withholding certificate" },
                { title: "Direct Deposit Form", desc: "Bank Account details for payroll" }
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-[#1D4EFF]/30 transition-all">
                  <div>
                    <h4 className="font-bold text-gray-900">{doc.title}</h4>
                    <p className="text-sm text-gray-500">{doc.desc}</p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-2 bg-white text-[#1D4EFF] font-bold text-sm rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <Upload size={18} />
                    Upload
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[#1A1A1A] p-8 rounded-3xl text-white">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold uppercase tracking-widest text-gray-400">Personal Details</h3>
                <button 
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-[#1D4EFF] font-bold text-sm hover:underline"
                >
                  <Edit2 size={16} /> Edits
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Full Name</p>
                  <p className="text-sm font-medium">{formData.fullName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Email</p>
                  <p className="text-sm font-medium">{formData.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Phone No</p>
                  <p className="text-sm font-medium">{formData.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Emergency Contact</p>
                  <p className="text-sm font-medium">{formData.emergencyContact || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Address</p>
                  <p className="text-sm font-medium">{formData.homeAddress || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold uppercase tracking-widest text-gray-400">Job Details</h3>
                <button 
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 text-[#1D4EFF] font-bold text-sm hover:underline"
                >
                  <Edit2 size={16} /> Edits
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Department</p>
                  <p className="text-sm font-bold text-gray-900">{formData.department || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Role</p>
                  <p className="text-sm font-bold text-gray-900">{formData.jobTitle || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Manager</p>
                  <p className="text-sm font-bold text-gray-900">{formData.reportingManager || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Employment Type</p>
                  <p className="text-sm font-bold text-gray-900">{formData.employmentType || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Start Date</p>
                  <p className="text-sm font-bold text-gray-900">{formData.startDate || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
        <span>Employees</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-white font-bold">Add Employees</span>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[40px] shadow-2xl shadow-[#1D4EFF]/5 border border-gray-50 dark:border-gray-700 relative overflow-hidden">
        {renderStepper()}
        {renderStep()}

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all ${step === 1 ? "opacity-0 pointer-events-none" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
          >
            <ChevronLeft size={20} />
            Back
          </button>
          
          <button 
            onClick={step === 4 ? handleConfirm : handleNext}
            disabled={loading}
            className="flex items-center gap-2 bg-[#1D4EFF] text-white font-bold px-10 py-3 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (step === 4 ? "Confirm" : "Next Step")}
            {!loading && <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
